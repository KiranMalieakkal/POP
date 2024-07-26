import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "../components/BottomNav";

const projectDataMock = {
  id: 1,
  name: "Baker street", // to title
  taxCategory: "Home maintenance",
  deductible: 15500,
  receipts: [
    {
      id: 1,
      company: "Bauhaus",
      purchaseDate: "2023-12-25",
      amount: 1420.0,
      currency: "SEK",
    },
    {
      id: 2,
      company: "K-Rauta",
      purchaseDate: "2023-12-27",
      amount: 4300.0,
      currency: "SEK",
    },
    {
      id: 3,
      company: "Byggmax",
      purchaseDate: "2023-12-28",
      amount: 780.0,
      currency: "SEK",
    },
    {
      id: 4,
      company: "Clas Ohlson",
      purchaseDate: "2023-12-29",
      amount: 1587.55,
      currency: "SEK",
    },
    {
      id: 5,
      company: "Rusta",
      purchaseDate: "2023-12-30",
      amount: 9000.0,
      currency: "SEK",
    },
  ],
};

type Params = {
  projectId: string;
};

type Receipt = {
  id: number;
  company: string;
  purchaseDate: string;
  amount: number;
  currency: string;
};

type Project = {
  id: number;
  name: string;
  taxCategory: string;
  deductible: number;
  receipts: Receipt[];
};

const ViewProject = () => {
  const { projectId } = useParams<Params>();
  // const [projectData, setProjectData] = useState<Project | null>(null);

  const [projectData, setProjectData] = useState<Project | null>(projectDataMock);

  // const baseUrl = "https://pop-app-backend.azurewebsites.net/api/projects";
  const baseUrl2 = "http://localhost:8080/api/projects";

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`${baseUrl2}/${1}`);
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
  }, [projectId]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  let totalAmount = 0;
  for (let i = 0; i < projectData.receipts.length; i++) {
    totalAmount += projectData.receipts[i].amount;
  }

  return (
    <div className="container mx-auto p-4 pt-2">
      <h1 className="pt-3 pr-6 pl-6 pb-2">
        <a href="/tax">← Go back</a>
      </h1>
      <h1 className="text-3xl font-bold mb-4 text-blue-900 text-center">
        {projectData.name}
      </h1>
      <h2 className="text-lg font-semibold text-center">
        {projectData.taxCategory} project
      </h2>
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
              {projectData.receipts.map((receipt) => (
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
        <div className="bg-blue-100 p-4 rounded-lg mt-4 flex justify-between items-center">
          <p className="text-blue-800 font-bold">💙 Total Deductible:</p>
          <p className="text-blue-800 font-bold">
            {totalAmount.toFixed(2)} SEK
          </p>
        </div>
      </div>

      <div className="bg-blue-50  shadow-xl rounded-lg p-6 mx-auto w-[50%] mb-24">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          File your taxes
        </h2>
        <h4 className="font-semibold">New additions & upgrades:</h4>
        <p>
          This includes expenses for new construction, expansions, and
          alterations to your home. Also basic improvements that add new
          features or upgrade existing ones to a higher standard..
        </p>
        <div className="space-y-2">
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Form:</span>
            <span>K6</span>
          </div>
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Section:</span>
            <span>B</span>
          </div>
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Paragraph:</span>
            <span>4</span>
          </div>
          <div className="flex justify-between mr-5">
            <span className="font-semibold">Value:</span>
            <span className="font-semibold">15 500 SEK</span>
          </div>
        </div>
      </div>

      <BottomNav />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ViewProject;

