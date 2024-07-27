import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "../components/BottomNav";

type Params = {
  id: string;
};

type Project = {
  id: number;
  title: string;
  tax_category: number;
  deductible: number;
  receiptList: Receipt[];
};

type Receipt = {
  id: number;
  company: string;
  amount: number;
  currency: string;
  purchaseDate: string;
  textContent: string;
  project: string;
  category: string;
};

type TaxCategory = {
  id: number;
  title: string;
  description: string;
  form: string;
  section: string;
  paragraph: string;
};

const ViewProject = () => {
  const { id } = useParams<Params>();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [taxCategory, setTaxCategory] = useState<TaxCategory | null>(null);

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/projects";
  const baseUrl = "http://localhost:8080/api/projects";

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/projects";
  const baseUrl2 = "http://localhost:8080/api/taxes";

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        console.log("projectID: " + id);
        const response = await fetch(
          `${baseUrl}/${id}?email=jane.smith@example.com`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        toast.error("Error fetching project data");
      }
    };
    fetchProjectData();
  }, [id, projectData?.tax_category]);

  useEffect(() => {
    const fetchTaxCategories = async () => {
      try {
        console.log("taxCategoryID: " + projectData?.tax_category);
        const response = await fetch(
          `${baseUrl2}/${projectData?.tax_category}/category`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setTaxCategory(data);
      } catch (error) {
        toast.error("Error fetching project data");
      }
    };
    fetchTaxCategories();
  }, [projectData?.tax_category]);

  if (!projectData || !projectData.receiptList) {
    return <div>Loading...</div>;
  }

  let totalAmount = 0;
  for (let i = 0; i < projectData.receiptList.length; i++) {
    totalAmount += projectData.receiptList[i].amount;
  }

  return (
    <div className="container mx-auto p-4 pt-2">
      <h1 className="pt-3 pr-6 pl-6 pb-2">
        <a href="/receipts/tax">← Go back</a>
      </h1>
      <h1 className="text-3xl font-bold mb-4 text-blue-900 text-center">
        {projectData.title}
      </h1>
      <h2 className="text-lg font-semibold text-center">
        {taxCategory?.title} category
      </h2>
      <div className="bg-blue-100 p-4 rounded-lg mt-4 flex justify-between items-center">
        <p className="text-blue-800 font-bold">💙 Total Deductible:</p>
        <p className="text-blue-800 font-bold">{totalAmount.toFixed(2)} SEK</p>
      </div>
      <br />
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h3 className="text-xl font-semibold mb-4">Receipts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectData.receiptList.map((receipt) => (
                <tr key={receipt.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {receipt.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {receipt.purchaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {receipt.currency} {receipt.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50  shadow-2xl rounded-lg p-6 mx-auto w-full  md:w-[50%] mb-24">
        <h2 className="text-2xl font-semibold mb-2 text-center">
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          File your taxes{" "}
        </h2>
        <h4 className="font-semibold">{taxCategory?.title}</h4>
        <p>{taxCategory?.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Form:</span>
            <span>{taxCategory?.form}</span>
          </div>
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Section:</span>
            <span>{taxCategory?.section}</span>
          </div>
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Paragraph:</span>
            <span>{taxCategory?.paragraph}</span>
          </div>
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Value:</span>
            <span className="font-semibold">{totalAmount.toFixed(2)} SEK</span>
          </div>
        </div>
      </div>
      <BottomNav />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ViewProject;
