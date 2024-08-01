import { useEffect, useState } from "react";
// Harald 240730: removing routing because desktop rebuild.
/* import { useParams } from "react-router-dom"; */
import toast, { Toaster } from "react-hot-toast";
import save from "../assets/save.png";
import vacuum from "../assets/vacuum_1059226.png";
import bill from "../assets/bill_9564931.png";
import tool from "../assets/tool-utensils_5790423.png";
import { useAuth0 } from "@auth0/auth0-react";

// Harald 240730: removing routing because desktop rebuild.
/* type Params = {
  id: string;
}; */

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

type Props = {
  windowToDisplay: ({ window, id }: { window: string; id?: number }) => void;
  projectId: number;
};

const ViewProject = ({ windowToDisplay, projectId }: Props) => {
  // todo: replace id from params (url) with id from parent component
  /*   const { id } = useParams<Params>(); */
  const id = projectId;
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [taxCategory, setTaxCategory] = useState<TaxCategory | null>(null);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/projects";
  const baseUrl = "http://localhost:8080/api/projects";

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/projects";
  const baseUrl2 = "http://localhost:8080/api/taxes";

  useEffect(() => {
    console.log("isauthenticated effect§");
    if (isAuthenticated) {
      console.log("yues");
      getAccessTokenSilently()
        .then((token) => {
          console.log("token=", token);
          setTheToken(token);
        })
        .catch((err) => {
          console.log("err=", err);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!theToken) return;
      if (!user?.email) return;
      try {
        console.log(
          "From the useEffect inside ViewProject.tsx. The id is: " + id
        );
        const response = await fetch(`${baseUrl}/${id}?email=${user?.email}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        });
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
  }, [id, theToken, user?.email]);

  useEffect(() => {
    const fetchTaxCategories = async () => {
      if (!projectData?.tax_category) return;
      try {
        console.log("taxCategoryID: " + projectData?.tax_category);
        const response = await fetch(
          `${baseUrl2}/${projectData?.tax_category}/category`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${theToken}`,
            },
          }
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
  }, [projectData?.tax_category, theToken]);

  if (!projectData || !projectData.receiptList) {
    return <div>Loading...</div>;
  }

  let totalAmount = 0;
  for (let i = 0; i < projectData.receiptList.length; i++) {
    totalAmount += projectData.receiptList[i].amount;
  }

  return (
    <div className="container mx-auto p-4 pt-2 md:p-1 md:mb-20 lg:mb-0">
      <div className="bg-blue-900 pb-4 rounded-xl">
        {/* <h1 className="pt-3 pr-6 pl-3 pb-2 text-white">
          <a href="/receipts/tax">← Go back</a>
        </h1> */}
        <button
          onClick={() => windowToDisplay({ window: "hideViewProject" })}
          className="badge p-4 md: bg-blue-100 mt-5 ml-2 md:ml-2  lg:mt-2 xl:ml-5"
        >
          Close
        </button>
        <h1 className="font-bold mb-4 text-white text-center text-xl md:text-xl md:mt-2 xl:text-3xl ">
          {projectData.title}
        </h1>
        <h2 className="text-md font-semibold text-center text-white lg:text-lg">
          {taxCategory?.title} category
        </h2>
        <div className="bg-blue-100 p-9 rounded-lg  m-3 mt-4 flex justify-between items-center flex-col xl:flex-row">
          <p className="text-blue-800 md:text-2xl font-bold pb-1 lg:text-lg xl:text-xl">
            💙 Total Deductible:
          </p>
          <p className="text-blue-800 text-3xl font-bold lg:text-xl ">
            {totalAmount.toFixed(2)} SEK
          </p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg lg:p-0 lg:pt-2  pt-3 xl:p-5 p-1  mb-4  overflow-y-auto max-h-[500px] lg:max-h-[450px]">
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
                  <td className="px-1 py-4 whitespace-nowrap font-semibold text-blue-900 text-sm xl:px-5 xl:py-4">
                    {receipt.company}
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-sm">
                    {receipt.purchaseDate}
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-sm">
                    {receipt.amount.toFixed(2)} {receipt.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50  shadow-2xl rounded-lg p-6 mx-auto w-full  md:w-full lg:w-full lg:p-4 mb-10 border border-gray-800">
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
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
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

      <div className="shadow-2xl items-center justify-center p-4 border border-gray-300 rounded-lg bg-blue-900 mb-16 md:mb-0">
        <h1 className="text-3xl text-white font-bold mb-1 text-center">
          Rules
        </h1>
        <div className="flex flex-wrap max-h-[550px] lg:max-h-none xl:max-h-none mb-2 overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full lg:w-[488.3%] md:w-[477.7%]">
            <img src={save} alt="" className="w-16 h-16 mb-4" />
            <h2 className="text-4xl text-blue-300 font-bold mb-2">5 Years</h2>
            <p className="text-center">
              Must have been done within the last 5 years.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full lg:w-[44.8%] xl:w-[46.8%] md:w-[45.7%]">
            <img src={tool} alt="" className="w-16 h-16 mb-4 lg:h-10 lg:w-10" />
            <p className="text-center lg:text-sm">
              The actions should have improved the condition of the property at
              the time of sale compared to when it was purchased.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full lg:w-[44.8%] xl:w-[46.8%] md:w-[45.7%]">
            <img src={vacuum} alt="" className="w-16 h-16 mb-4 lg:h-10 lg:w-10" />
            <p className="text-center lg:text-sm">
              Expenses covered by ROT deductions cannot be included.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full lg:w-[44.8%] xl:w-[46.8%] md:w-[45.7%]">
            <h2 className="text-4xl text-blue-300 font-bold mb-2 lg:text-md lg:text-xl">5000+</h2>
            <p className="text-center lg:text-sm">
              To qualify for deductions, the total improvement expenses in the
              calendar year must be at least 5,000 SEK.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full lg:w-[44.8%] xl:w-[46.8%] md:w-[45.7%]">
            <img src={bill} alt="" className="w-16 h-16 mb-4 lg:h-10 lg:w-10" />
            <p className="text-cente lg:text-sm">
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

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ViewProject;
