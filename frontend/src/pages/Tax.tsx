import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export type receiptsType = receiptType[];

function Tax() {
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [taxCategories, setTaxCategories] = useState([]);
  const navigate = useNavigate();

  const baseUrl = "https://pop-app-backend.azurewebsites.net/api/taxes/user";
  // const baseUrl2 = "http://localhost:8080/api/taxes/user";

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

  useEffect(() => {
    console.log("use effect 1");
    setTaxCategories(data);
  }, [data]);

  const getTotalSum = (receipts): number => {
    return receipts.reduce((total, receipt) => total + receipt.amount, 0);
  };

  function addTaxProject() {
    console.log("You clicked on add Tax Project button");
    navigate("/receipts/selectTax");
  }

  return (
    <>
      <div className="mb-20">
        <h1 className="text-center mt-4">
          Here are your current tax projects. Select a project or create a new
          project.
        </h1>

        <div className="w-full p-4">
          <div className="max-h-[400px] lg:max-h-[350px] hover:h-full overflow-y-auto">
            <table className="receipt-table w-full border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="p-2 border-b border-gray-300 text-left">
                    Project
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left">
                    Tax Category
                  </th>
                  <th className="p-2 border-b border-gray-300 text-left">
                    Deductible
                  </th>
                </tr>
              </thead>
              <tbody>
                {taxCategories?.map((taxCategory) =>
                  taxCategory?.projectDtoList?.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-100">
                      <td className="p-2 border-b border-gray-300 text-left">
                        {project?.title}
                      </td>
                      <td className="p-2 border-b border-gray-300 text-left">
                        {taxCategory?.title}
                      </td>
                      <td className="p-2 border-b border-gray-300 text-left">
                        {getTotalSum(project?.receiptList).toFixed(2)}
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
            className="btn btn-primary md:w-1/3 lg:w-1/3 w-1/2 mb-6"
            onClick={addTaxProject}
          >
            Add Tax Project
          </button>
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry, we are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
      </div>
    </>
  );
}

export default Tax;
