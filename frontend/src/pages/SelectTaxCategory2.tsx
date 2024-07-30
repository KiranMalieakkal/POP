// import { useParams } from "react-router-dom";
import tax_1 from "../assets/tax_1.svg"
import tax_2 from "../assets/tax_2.svg"
import tax_3 from "../assets/tax_3.svg";
import BottomNav from "../components/BottomNav";
import vacuum from "../assets/vacuum_1059226.png";
import bill from "../assets/bill_9564931.png";
import tool from "../assets/tool-utensils_5790423.png";
import mockData from "../assets/mockDataCategory";


type Props = {
  taxCategory: number;
};

const SelectTaxCategory2 = ({ taxCategory }: Props) => {
  const categoryData = mockData.find((data) => data.id === taxCategory);
  console.log(taxCategory);

  if (!categoryData) {
    return <div>Data not found</div>;
  }

  const imageMap:{ [key: number]: string } = {
    1: tax_1,
    2: tax_2,
    3: tax_3,
  };
  const selectedImage = imageMap[categoryData.id];

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6  ">
        <img className="w-50 h-50 mb-0 p-5" src={selectedImage} alt="" />
        <h1 className="text-4xl text-center font-bold m-2">
          {categoryData.title}
        </h1>
        <p className="text-center font-semibold ">Explore this topic</p>
      </div>

      <div className="shadow-2xl items-center justify-center p-4 border border-gray-300 rounded-lg mb-24 bg-blue-900">
        <div className="flex flex-wrap max-h-[550px] lg:max-h-none xl:max-h-none mb-2 overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 w-full  lg:w-[488.3%] md:w-[477.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                Description
              </div>
              <div className="collapse-content">
                <p>
                  {categoryData.mainDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 w-full  lg:w-[488.3%] md:w-[477.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">Examples</div>
              <div className="collapse-content">
                <p>{categoryData.example}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 w-full lg:w-[488.3%] md:w-[477.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 border"
            >
              <div className="collapse-title text-xl font-medium">
                Approved expenses
              </div>
              <div className="collapse-content">
                
                  <h6 className=" text-lg font-serif">
                    {categoryData.approvedDescription}
                  </h6>
                  <ul className="mt-2">
                    {categoryData.approvedExamples.map((example, index) => (
                      <li
                        className="bg-blue-50 border p-2 rounded-lg m-1"
                        key={index}
                      >
                        • {example}
                      </li>
                    ))}
                  </ul>
                
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-2 border bg-gray-200 rounded-lg m-2 h-full w-full  lg:w-[488.3%] md:w-[477.7%] flex-wrap max-h-[550px] lg:max-h-none xl:max-h-none mb-2 overflow-y-auto">
            <div className="flex flex-col items-center justify-center mt-50 p-5 border bg-gray-100 rounded-lg m-2  h-64 w-full  lg:w-[45.3%] md:w-[45.7%]">
              <h2 className="text-4xl text-blue-300 font-bold mb-2">5 Years</h2>
              <p className="text-center">
                Must have been done within the last 5 years.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full  lg:w-[45.3%] md:w-[45.7%]">
              <img src={tool} alt="" className="w-16 h-16 mb-4" />
              <p className="text-center">
                The actions should have improved the condition of the property
                at the time of sale compared to when it was purchased.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full  lg:w-[45.3%] md:w-[45.7%]">
              <img src={vacuum} alt="" className="w-16 h-16 mb-4" />
              <p className="text-center">
                Expenses covered by ROT deductions cannot be included.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 w-74 h-64 w-full  lg:w-[45.3%] md:w-[45.7%]">
              <h2 className="text-4xl text-blue-300 font-bold mb-2">5000+</h2>
              <p className="text-center">
                To qualify for deductions, the total improvement expenses in the
                calendar year must be at least 5,000 SEK.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 border bg-gray-100 rounded-lg m-2 7-64 h-64 w-full  lg:w-[45.3%] md:w-[45.7%]">
              <img src={bill} alt="" className="w-16 h-16 mb-4" />
              <p className="text-center">
                The basic principle for eligibility is that expenses must be
                verified with invoices and receipts.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default SelectTaxCategory2;
