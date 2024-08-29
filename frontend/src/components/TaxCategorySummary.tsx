// This component should display a couple of collapsible menues
// The menues themselves show information about taxes.

import vacuum from "../assets/vacuum_1059226.png";
import bill from "../assets/bill_9564931.png";
import tool from "../assets/tool-utensils_5790423.png";
import mockData from "../assets/mockDataCategory";

type Props = {
  taxCategory: number;
};

function TaxCategorySummary({ taxCategory }: Props) {
  const categoryData = mockData.find((data) => data.id === taxCategory);
  console.log(taxCategory);

  if (!categoryData) {
    return <div>Data not found</div>;
  }

  return (
    <>
      <div className="items-center justify-center p-4 xl:mb-0 lg:mb-0">
        <div className="flex flex-wrap mb-2">
          <div className="flex flex-col items-center justify-center w-74 w-full  lg:w-[488.3%] md:w-[477.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                Description
              </div>
              <div className="collapse-content">
                <p>{categoryData.mainDescription}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center my-5 w-74 w-full lg:w-[488.3%] md:w-[477.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 border bg-gray-100"
            >
              <div className="collapse-title text-xl font-medium">
                Approved expenses
              </div>
              <div className="collapse-content">
                <h6 className="">{categoryData.approvedDescription}</h6>
                <ul className="mt-2">
                  {categoryData.approvedExamples.map((example, index) => (
                    <li className="p-2 rounded-lg m-1" key={index}>
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {categoryData.example && (
            <div className="flex flex-col items-center justify-center mb-5 w-74 w-full lg:w-[488.3%] md:w-[477.7%]">
              <div
                tabIndex={0}
                className="collapse collapse-plus border-base-300 bg-base-200 border"
              >
                <div className="collapse-title text-xl font-medium">
                  Examples
                </div>
                <div className="collapse-content">
                  <p>{categoryData.example}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center w-74 w-full  lg:w-[488.3%] md:w-[477.7%]">
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">Rules</div>
              <div className="collapse-content">
                <div className="flex items-center justify-center flex-wrap">
                  <div className="flex flex-col items-center justify-center m-2 h-44 w-full">
                    <h2 className="text-4xl text-blue-300 font-bold mb-2">
                      5 Years
                    </h2>
                    <p className="text-center">
                      Repairs and maintenance must have been done within the
                      last 5 years. It is custom to write off 20% of the value
                      for each consequtive year since.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center m-2 w-74 h-64 w-full ">
                    <img src={tool} alt="" className="w-16 h-16 mb-4" />
                    <p className="text-center">
                      The actions should have improved the condition of the
                      property at the time of sale compared to when it was
                      purchased.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center m-2 w-74 h-64 w-full  ">
                    <img src={vacuum} alt="" className="w-16 h-16 mb-4" />
                    <p className="text-center">
                      Expenses covered by ROT deductions cannot be included.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center m-2 w-74 h-64 w-full ">
                    <h2 className="text-4xl text-blue-300 font-bold mb-2">
                      5000+
                    </h2>
                    <p className="text-center">
                      To qualify for deductions, the total improvement expenses
                      in the calendar year must be at least 5,000 SEK.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center m-2 7-64 h-64 w-full ">
                    <img src={bill} alt="" className="w-16 h-16 mb-4" />
                    <p className="text-center">
                      The basic principle for eligibility is that expenses must
                      be verified with invoices and receipts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TaxCategorySummary;
