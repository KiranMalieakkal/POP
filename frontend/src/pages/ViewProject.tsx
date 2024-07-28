import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "../components/BottomNav";
import save from "../assets/save.png";
import vacuum from "../assets/vacuum_1059226.png";
import bill from "../assets/bill_9564931.png";
import tool from "../assets/tool-utensils_5790423.png";

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
  }, [id]);

  useEffect(() => {
    const fetchTaxCategories = async () => {
      if (!projectData?.tax_category) return;

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
      <div className="bg-blue-900 pb-4">
        <h1 className="pt-3 pr-6 pl-3 pb-2 text-white">
          <a href="/receipts/tax">← Go back</a>
        </h1>
        <h1 className="text-3xl font-bold mb-4 text-white text-center">
          {projectData.title}
        </h1>
        <h2 className="text-lg font-semibold text-center text-white">
          {taxCategory?.title} category
        </h2>
        <div className="bg-blue-100 p-9 rounded-lg  m-3 mt-4 flex justify-between items-center flex-col md:flex-row">
          <p className="text-blue-800 md:text-2xl font-bold pb-1">
            💙 Total Deductible:
          </p>
          <p className="text-blue-800 text-3xl font-bold">
            {totalAmount.toFixed(2)} SEK
          </p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg lg:p-6 p-1  mb-4  overflow-y-auto max-h-[500px] lg:max-h-[450px]">
        <h3 className="text-xl font-semibold mb-4 ml-3  text-blue-900 font-serif">
          Receipts
        </h3>
        <div className="overflow-x-auto ">
          <table className="min-w-full divide-y divide-gray-300 ">
            <thead className="bg-blue-50  border border-gray-300 rounded-lg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectData.receiptList.map((receipt) => (
                <tr key={receipt.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">
                    {receipt.company}
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap ">
                    {receipt.purchaseDate}
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap ">
                    {receipt.currency} {receipt.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50  shadow-2xl rounded-lg p-6 mx-auto w-full  md:w-[50%] mb-10 border border-gray-800">
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
        <p className="pb-2">{taxCategory?.description}</p>
        <div className="space-y-2 bg-blue-900 rounded-lg p-4 text-white">
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

      <div className="shadow-2xl items-center justify-center p-4 border border-gray-300 rounded-lg mb-24 bg-blue-900">
        <h1 className="text-3xl text-white font-bold mb-1 text-center">
          Rules
        </h1>
        <div className="flex flex-wrap max-h-[550px] lg:max-h-none xl:max-h-none mb-2 overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full lg:w-[488.3%] md:w-[477.7%]">
            <img src={save} alt="" className="w-16 h-16 mb-4" />
            <h2 className="text-4xl text-blue-900 font-bold mb-2">5 Years</h2>
            <p className="text-center">
              Must have been done within the last 5 years.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <img src={tool} alt="" className="w-16 h-16 mb-4" />
            <p className="text-center">
              The actions should have improved the condition of the property at
              the time of sale compared to when it was purchased.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <img src={vacuum} alt="" className="w-16 h-16 mb-4" />
            <p className="text-center">
              Expenses covered by ROT deductions cannot be included.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <h2 className="text-4xl text-blue-900 font-bold mb-2">5000+</h2>
            <p className="text-center">
              To qualify for deductions, the total improvement expenses in the
              calendar year must be at least 5,000 SEK.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <img src={bill} alt="" className="w-16 h-16 mb-4" />
            <p className="text-center">
              The basic principle for eligibility is that expenses must be
              verified with invoices and receipts.
            </p>
          </div>
        </div>
        <p className="cursor-pointer text-white text-center mt-4">
          Read more at{" "}
          <a
            className="text-blue-300 font-semibold font-serif hover:underline"
            href="https://www.skatteverket.se/privat/fastigheterochbostad/forsaljningavbostad/avdragforrenoveringarochnybyggnad/reparationerochunderhall.4.12815e4f14a62bc048f627.html"
          >
            Skatteverket
          </a>
        </p>
      </div>
      <BottomNav />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ViewProject;

