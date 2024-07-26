import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectData from "../assets/projectData";
import projects from "../assets/projectDataSelect";
import taxCategoryData from "../assets/taxCategory";
import projectsData from "../assets/projectDataSelect";
import TaxCard from "../components/TaxCard";

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

function SelectTax() {
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    taxCategory: "",
  });
  const baseUrl = "https://pop-app-backend.azurewebsites.net/api/receipts";
  // const baseUrl2 = "http://localhost:8080/api/receipts";

  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch1"],
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
    setProjects(data);
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center mt-4">Link Project to a TaxCategory</h1>
        <div>
          <form
            id="taxCategoryForm"
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-6"
          >
            <div>
              <label
                htmlFor="project"
                className="block text-gray-700 font-medium mb-1"
              >
                ProjectName
              </label>
              <select
                id="project"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.projectName}
                onChange={handleChange}
                name="projectName"
              >
                <option value="">--Choose--</option>
                {projectsData.projects.map((project) => (
                  <option key={project.projectName} value={project.projectName}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="taxCategory"
                className="block text-gray-700 font-medium mb-1"
              >
                TaxCategory
              </label>
              <select
                id="taxCategory"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.taxCategory}
                onChange={handleChange}
                name="taxCategory"
              >
                <option value="">--Choose--</option>
                {taxCategoryData.map((taxCategory) => (
                  <option
                    key={taxCategory.taxCategoryName}
                    value={taxCategory.taxCategoryName}
                  >
                    {taxCategory.taxCategoryName}
                  </option>
                ))}
              </select>
            </div>
            {/* {invalidInputError && (
              <p className="text-red-500 break-words whitespace-normal text-center">
                {invalidInputError}
              </p>
            )}
            {postErrorDisplay && (
              <p className="text-red-500 break-words whitespace-normal">{`Sorry, Please try again later. ${postError}`}</p>
            )}
            {isPending && (
              <p className="text-red-500 break-words whitespace-normal">{`Loading...`}</p>
            )} */}
            <button type="submit" className="w-full btn btn-primary">
              Add Tax Category
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 overflow-y-scroll">
          {taxCategoryData.map((taxCategory) => (
            <TaxCard key={taxCategory.id} taxCategory={taxCategory} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectTax;
