import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import img from "../assets/financial-analysts-doing-income-statement-with-calculator-laptop-income-statement-company-financial-statement-balance-sheet-concept.png";
import ClickableDiv from "../components/ClickableDiv";

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

export type NewPost = {
  projectId: string;
  taxId: string;
};

export type project = {
  title: string;
  id: string;
};

export type projects = {
  project: project[];
};

export type taxCategory = {
  title: string;
  id: number;
  description: string;
};

type Props = {
  setProjectName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTaxId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setProjectId: React.Dispatch<React.SetStateAction<string | undefined>>;
  // postSuccess: boolean;
  taxCategory: number | undefined;
};

function SelectTaxCategory3({
  setProjectName,
  setTaxId,
  setProjectId,
  taxCategory,
}: Props) {
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [projects, setProjects] = useState<project[]>([]);
  const [taxCategories, setTaxCategories] = useState<taxCategory[]>([]);
  // const queryClient = useQueryClient();
  // const [taxId, setTaxId] = useState<string>();
  // const [projectId, setProjectId] = useState<string>();
  // const [projectName, setprojectName] = useState("");
  const [activeProjectName, setActiveProjectName] = useState("");
  const baseUrl =
    "https://pop-app-backend.azurewebsites.net/api/projects/withoutTax";
  // const baseUrl2 = "http://localhost:8080/api/projects/withoutTax";

  const {
    data: projectsData,
    isError: fetchError,
    isPending,
  } = useQuery({
    queryKey: ["fetch4"],
    queryFn: () =>
      fetch(`${baseUrl}?email=jane.smith@example.com`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  const { data: taxCategoriesData, isError: fetchError2 } = useQuery({
    queryKey: ["fetch5"],
    queryFn: () =>
      fetch(`https://pop-app-backend.azurewebsites.net/api/taxes`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  useEffect(() => {
    setProjects(projectsData);
    setTaxCategories(taxCategoriesData);
  }, [projectsData, taxCategoriesData]);

  useEffect(() => {
    const taxId2 = taxCategories?.find(
      (entry: taxCategory) => entry?.id === taxCategory
    )?.id;
    const projectId2 = projects?.find(
      (entry: project) => entry?.title === activeProjectName
    )?.id;
    setTaxId(taxId2);
    setProjectId(projectId2);
  }, [
    taxCategories,
    projects,
    setTaxId,
    setProjectId,
    taxCategory,
    activeProjectName,
  ]);

  const handleClick = (projectName: string) => {
    console.log("you clicked " + projectName);
    setProjectName(projectName);
    setActiveProjectName(projectName);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-4"></div>
      <div className="flex justify-center items-center">
        <img src={img} alt="Card Image" className="object-scale-down h-40 " />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800  text-center">
        Link this tax deduction to a project
      </h1>
      <div className="flex flex-col justify-center items-center ">
        <p>Select a project from the list</p>
        <div className="p-6 w-full max-w-4xl mx-auto max-h-[500px] overflow-y-auto mb-12">
          {projectsData?.map((project: project) => {
            return (
              <ClickableDiv
                key={project.id}
                title={project.title}
                isActive={activeProjectName === project.title}
                onClick={() => handleClick(project.title)}
              />
            );
          })}
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center mt-4">
            Sorry, Please try again later. {fetchErrorLog}
          </p>
        )}
        {fetchError2 && (
          <p className="text-red-500 break-words whitespace-normal text-center mt-4">
            Sorry, Please try again later. {fetchErrorLog}
          </p>
        )}
        {isPending && (
          <p className="text-blue-500 break-words whitespace-normal text-center mt-4">
            Loading...
          </p>
        )}
      </div>
    </>
  );
}

export default SelectTaxCategory3;
