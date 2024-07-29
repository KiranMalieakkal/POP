import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  id: string;
  description: string;
};

function SelectTaxCategory3() {
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [projects, setProjects] = useState<project[]>([]);
  const [taxCategories, setTaxCategories] = useState<taxCategory[]>([]);
  const queryClient = useQueryClient();
  const [taxId, setTaxId] = useState<string>();
  const [projectId, setProjectId] = useState<string>();
  const [invalidInputError, setError] = useState("");
  const [postErrorDisplay, setPostErrorDisplay] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    taxCategory: "",
  });
  const [projectName, setprojectName] = useState("");
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

  const { mutate: postTaxCategory, error: postError } = useMutation<
    unknown,
    Error,
    NewPost
  >({
    mutationFn: (newPost) =>
      fetch(
        `http://localhost:8080/api/taxes/${taxId}?email=jane.smith@example.com&projectId=${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      }),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["fetch3"] });
      setFormData({
        projectName: "",
        taxCategory: "",
      });
      navigate(-1);
    },
  });

  useEffect(() => {
    setProjects(projectsData);
    setTaxCategories(taxCategoriesData);
  }, [projectsData, taxCategoriesData]);

  useEffect(() => {
    if (postError) {
      setPostErrorDisplay(true);
      setTimeout(() => {
        setPostErrorDisplay(false);
      }, 2000);
    }
  }, [postError]);

  useEffect(() => {
    const taxId2 = taxCategories?.find(
      (entry: taxCategory) => entry.title === formData.taxCategory
    )?.id;
    const projectId2 = projects?.find(
      (entry: project) => entry.title === formData.projectName
    )?.id;
    setTaxId(taxId2);
    setProjectId(projectId2);
  }, [formData, taxCategories, projects]);

  const handleClick = (projectName: string) => {
    console.log("you clicked " + projectName);
    setprojectName(projectName);
    setActiveProjectName(projectName);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (formData.projectName == "") {
      setError("Please select a project");
    } else if (formData.taxCategory == "") {
      setError("Please select a tax category ");
    } else {
      setError("");
      console.log(formData);
      console.log(taxId);
      console.log(projectId);

      postTaxCategory({
        projectId: projectId!,
        taxId: taxId!,
      });
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between p-4">
        {/* <button onClick={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          backa?
        </button> */}
        <button
          className={`btn btn-primary min-h-8 h-8 ${
            projectName === "" ? "btn-disabled" : ""
          }`}
        >
          Finish
        </button>
      </div>
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
        {invalidInputError && (
          <p className="text-red-500 break-words whitespace-normal text-center mt-4">
            {invalidInputError}
          </p>
        )}
        {postErrorDisplay && (
          <p className="text-red-500 break-words whitespace-normal text-center mt-4">
            {`Sorry, Changes could not be saved. Please try again later. ${postError}`}
          </p>
        )}
      </div>
    </>
  );
}

export default SelectTaxCategory3;
