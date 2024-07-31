import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// Harald 240730: removing routing because desktop rebuild.
/* import { useNavigate } from "react-router-dom"; */
import toast, { Toaster } from "react-hot-toast";
import useScreenType from "../components/useSceenType";
// import projectData from "../assets/projectData";

export type requestType = {
  company: string | null;
  amountFrom: number | null;
  amountTo: number | null;
  currency: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  project: string | null;
  category: string | null;
};

export type receiptType = {
  id: number;
  company: string;
  amount: number;
  currency: string;
  startDate: string;
  purchaseDate: string;
  project: string;
  category: string;
};

type Project = {
  id: number;
  title: string;
  receiptList: receiptsType;
};

export type receiptsType = receiptType[];

export type TaxCategory = {
  id: number;
  title: string;
  projectDtoList: Project[];
};

export type deleteType = {
  projectId: number;
  taxId: number;
};

type Props = {
  windowToDisplay: ({ window, id }: { window: string; id?: number }) => void;
};

function Tax({ windowToDisplay }: Props) {
  const { isMobile } = useScreenType();
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [taxCategories, setTaxCategories] = useState([]);
  // Harald 240730: removing routing because desktop rebuild.
  /*   const navigate = useNavigate(); */
  const [deleteErrorDisplay, setDeleteErrorDisplay] = useState(false);
  const queryClient = useQueryClient();

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/taxes/user";
  const baseUrl = "http://localhost:8080/api/taxes/user";

  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch3"],
    queryFn: () =>
      fetch(`${baseUrl}?email=jane.smith@example.com`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });
  const {
    mutate: deleteTaxCategory,
    error: deleteError,
    isPending: deleteStatus,
  } = useMutation<unknown, Error, deleteType>({
    mutationFn: ({ projectId, taxId }) =>
      fetch(
        `http://localhost:8080/api/taxes/${taxId}?email=jane.smith@example.com&projectId=${projectId}`,
        {
          method: "DELETE",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch3"] });
    },
  });

  useEffect(() => {
    if (deleteError) {
      setDeleteErrorDisplay(true);
      setTimeout(() => {
        setDeleteErrorDisplay(false);
      }, 2000);
    }
  }, [deleteError]);

  useEffect(() => {
    setTaxCategories(data);
    console.log(data);
  }, [data]);

  const getTotalSum = (receipts: receiptsType): number => {
    return receipts.reduce((total, receipt) => total + receipt.amount, 0);
  };

  // Harald 240730: removing routing because desktop rebuild.
  /* function addTaxProject() {
    console.log("You clicked on add Tax Project button");
    navigate("/receipts/selectTax");
    return taxCategories;
  } */

  function handleClick(project: Project) {
    console.log(`Clicked project with id ${project.id}`);
    // Harald 240730: removing routing because desktop rebuild.
    /* navigate(`${project.id}`); */
    windowToDisplay({ window: "ViewProject", id: project.id });
  }

  function handleDelete(projectId: number, taxId: number) {
    toast((t) => (
      <span>
        Are you sure you want to delete this tax category?
        <div className="flex justify-center mt-2">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm mr-2"
            onClick={() => {
              deleteTaxCategory({ projectId, taxId });
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black py-1 px-3 rounded-lg text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  }

  return (
    <>
      <div className="">
        <h1 className="text-center mt-4">
          Here are your current tax projects. Select a project or create a new
          project.
        </h1>

        <div className="w-full p-4">
          <div className="max-h-[400px] lg:max-h-[350px] hover:h-full overflow-y-auto">
            <table className="receipt-table w-full border-collapse ">
              <thead>
                <tr className=" text-black grid grid-cols-[1fr,1fr,1fr,0.2fr]">
                  <th className="p-2 border-b-2 border-black text-left text-lg">
                    Project
                  </th>
                  <th className="p-2 border-b-2 border-black text-left text-lg">
                    Tax Category
                  </th>
                  <th className="p-2 border-b-2 border-black text-left text-lg">
                    Deductible
                  </th>
                  <th className="p-2 border-b-2 border-black text-center text-lg"></th>
                </tr>
              </thead>
              <tbody>
                {taxCategories?.map((taxCategory: TaxCategory) =>
                  taxCategory?.projectDtoList?.map((project) => (
                    <tr
                      onClick={() => {
                        handleClick(project);
                      }}
                      key={project.id}
                      className="hover:bg-gray-100 hover:cursor-pointer transition-transform transform hover:scale-[1.01] grid grid-cols-[1fr,1fr,1fr,0.2fr]"
                    >
                      <td className="p-2 border-b border-gray-300 text-left">
                        {project?.title}
                      </td>
                      <td className="p-2 border-b border-gray-300 text-left">
                        {taxCategory?.title}
                      </td>
                      <td className="p-2 border-b border-gray-300 text-left">
                        {getTotalSum(project?.receiptList).toFixed(2)}
                      </td>
                      <td className="p-2 border-b border-gray-300 text-left">
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(project.id, taxCategory.id);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-black hover:text-red-500 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className={`fixed m-5 btn bg-blue-800 btn-primary text-white md:w-1/3 lg:w-1/3 w-1/2 ${
              isMobile ? "bottom-20" : "bottom-0"
            }`}
            onClick={() => windowToDisplay({ window: "SelectTaxCategory" })}
          >
            Add Tax Project
          </button>
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry, we are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
        {deleteStatus && (
          <p className="text-red-500 break-words whitespace-normal">{`Loading...`}</p>
        )}
        {deleteErrorDisplay && (
          <p className="text-red-500 break-words whitespace-normal">{`Sorry, Delete did not work. Please try again later. ${deleteError}`}</p>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default Tax;
