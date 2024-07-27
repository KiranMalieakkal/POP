import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function SelectTax() {
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
                {projects?.map((project: project) => (
                  <option key={project.title} value={project.title}>
                    {project.title}
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
                {taxCategories?.map((taxCategory: taxCategory) => (
                  <option key={taxCategory.title} value={taxCategory.title}>
                    {taxCategory.title}
                  </option>
                ))}
              </select>
            </div>

            {fetchError ||
              (fetchError2 && (
                <p className="text-red-500 break-words whitespace-normal">{`Sorry, Please try again later. ${fetchErrorLog}`}</p>
              ))}
            {isPending && (
              <p className="text-red-500 break-words whitespace-normal">{`Loading...`}</p>
            )}
            {invalidInputError && (
              <p className="text-red-500 break-words whitespace-normal text-center">
                {invalidInputError}
              </p>
            )}
            {postErrorDisplay && (
              <p className="text-red-500 break-words whitespace-normal">{`Sorry, Changes could not be saved. Please try again later. ${postError}`}</p>
            )}
            <button type="submit" className="w-full btn btn-primary">
              Add Tax Category
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 overflow-y-scroll">
          {taxCategoriesData?.map((taxCategory: taxCategory) => (
            <TaxCard key={taxCategory.id} taxCategory={taxCategory} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectTax;
