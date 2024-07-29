import tax_3 from "../assets/tax_3.svg";
import BottomNav from "../components/BottomNav";
/* import { useEffect, useState } from "react"; */

const mockData = [
  {
    id: 1,
    title: "Approved expenses",
    description:
      "Here are some examples of approved expenses to give you an idea of the type of expenses that are approved. ",
    example: "examples coming soon...",
    rules: "coming soon...",
    approvedExamples: [
      "Replacing appliances like a dishwasher",
      "Painting",
      "Wallpapering",
      "Replacing trim",
      "Replacing deck boards",
      "Renovating the bathroom, such as replacing the sink, toilet, and bathtub",
      "Renovating the kitchen, such as replacing appliances, cabinets, countertops, and doors without increasing the number of cabinets and countertops",
      "Repainting",
      "Re-wallpapering",
      "Lacquering or repainting doors and cabinet doors",
      "Re-tiling",
      "Replacing floors with the same or similar material",
    ],
  },
  {
    id: 2,
    title: "Approved expenses",
    example: "examples coming soon...",
    rules: "coming soon...",
    approvedExamples: [
      "Replacing appliances like a dishwasher",
      "Painting",
      "Wallpapering",
      "Replacing trim",
      "Replacing deck boards",
      "Renovating the bathroom, such as replacing the sink, toilet, and bathtub",
      "Renovating the kitchen, such as replacing appliances, cabinets, countertops, and doors without increasing the number of cabinets and countertops",
      "Repainting",
      "Re-wallpapering",
      "Lacquering or repainting doors and cabinet doors",
      "Re-tiling",
      "Replacing floors with the same or similar material",
    ],
  },
  {
    id: 3,
    title: "Home sale expenses",
    example: "examples coming soon...",
    rules: "coming soon...",
    approvedExamples: [
      "Real estate agent fees",
      "Closing costs",
      "Staging costs",
      "Repairing major defects",
      "Advertising costs",
      "Legal fees",
      "Home inspection fees",
      "Title insurance",
      "Mortgage payoff penalties",
      "Transfer taxes",
      "Utilities until the sale date",
      "Cleaning services",
    ],
  },
];

type Props = {
  taxCategory: number;
};

const SelectTaxCategory2 = ({ taxCategory }: Props) => {
  /*  const [receiptData, setReceiptData] = useState<Receipt>();
// const baseUrl = "https://pop-app-backend.azurewebsites.net/api/receipts";
  const baseUrl2 = "http://localhost:8080/api/receipts";

  useEffect(() => {
    const fetchReceiptData = async () => {
      const response = await fetch(`${baseUrl2}/${id}`);
      const data = await response.json();
      //console.log(data);
      setReceiptData(data);
    };
    fetchReceiptData();
  }, [id]);

  if (!receiptData) {
    return <div>Loading...</div>;
  } */

  return (
    <>
      <h1>Hi Emi 👋 here is the taxcategory: {taxCategory}</h1>
      <div className="flex flex-col items-center justify-center p-6  ">
        <img className="w-76 h-76 mb-0" src={tax_3} alt="" />
        <h1 className="text-4xl text-center font-bold m-2">
          Home repair & maintenance
        </h1>
        <p className="text-center font-semibold ">Explore this topic</p>
      </div>

      <div className="shadow-2xl items-center justify-center p-4 border border-gray-300 rounded-lg mb-24 bg-blue-900">
        <div className="flex flex-wrap max-h-[550px] lg:max-h-none xl:max-h-none mb-2 overflow-y-auto">
          {/* <div className="flex flex-col items-center justify-center p-1 border bg-gray-100 rounded-lg m-2 w-74  w-full lg:w-[488.3%] md:w-[477.7%]">
           <img src="{save}" alt="" className="w-16 h-16 mb-4" />
           </div> */}
          {/* h-84 */}

          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                Description
              </div>
              <div className="collapse-content">
                <p>
                  When you sell your property and make a profit, a 30% capital
                  gains tax applies. You can deduct expenses for repair &
                  maintenance for actions that have improved the condition of
                  the property at the time of sale compared to when it was
                  purchased.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                Approved expenses
              </div>
              <div className="collapse-content">
                <p>
                  <h6>
                    Here are some examples of approved expenses to give you an
                    idea of the type of expenses that are approved.
                    <ul>
                      {mockData.map((example, index) => (
                        <li key={index}>{example.approvedExamples}</li>
                      ))}
                    </ul>
                  </h6>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <h2 className="text-4xl text-blue-300 font-bold mb-2">5000+</h2>
            <p className="text-center">
              To qualify for deductions, the total improvement expenses in the
              calendar year must be at least 5,000 SEK.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full  lg:w-[48.3%] md:w-[47.7%]">
            <img src="{bill}" alt="" className="w-16 h-16 mb-4" />
            <p className="text-center">
              The basic principle for eligibility is that expenses must be
              verified with invoices and receipts.
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default SelectTaxCategory2;
