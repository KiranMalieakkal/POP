// This component is the first of 3 components which guide the user to connect a tax category to a project.
// This component shows a summary of every deduction available and routes to step 2

// This component fetches a list of tax categories from the backend. (well maybe it's just hardcoded for now)
// The backend will give us an id, title and description

import tax1 from "../assets/tax_1.svg";
import tax2 from "../assets/tax_2.svg";
import tax3 from "../assets/tax_3.svg";

type Props = {
  openTaxCategory: (taxCategory: number) => void;
};

function SelectTaxCategory1({ openTaxCategory }: Props) {
  return (
    <>
      <div className="flex flex-col text-center max-w-screen-sm mx-auto">
        <div className="flex flex-col m-5">
          <h1 className="text-4xl">Select a topic</h1>
          <p>Let's find the right deduction for you</p>
        </div>

        <div className=" bg-blue-700 rounded-3xl mx-10 mb-10 flex flex-col p-5 shadow-md shadow-slate-500">
          <img src={tax1} alt="Person selling home" className="w-full" />
          <h1 className="text-2xl text-white py-5">I'm selling my home</h1>
          <p className="text-white p-2 pb-5 text-sm text-left">
            When you sell your property, you can deduct related expenses such as
            realtor fees, inspection costs, home staging, and advertising fees.
          </p>
          <button
            onClick={() => openTaxCategory(1)}
            className="border p-2 w-full text-blue-700 bg-white rounded-lg"
          >
            Explore
          </button>
        </div>

        <div className=" bg-blue-700 rounded-3xl mx-10 mb-10 flex flex-col p-5 shadow-md shadow-slate-500">
          <img src={tax2} alt="Person selling home" className="w-full" />
          <h1 className="text-2xl text-white py-5">I’m upgrading my home</h1>
          <p className="text-white p-2 pb-5 text-sm text-left">
            If you sell your home with profit this deduction is great if you’ve
            made upgrades. This includes expenses for new construction,
            expansions, and alterations to your home. Also basic improvements
            that add new features or upgrade existing ones to a higher standard.
          </p>
          <button
            onClick={() => openTaxCategory(2)}
            className="border p-2 w-full text-blue-700 bg-white rounded-lg"
          >
            Explore
          </button>
        </div>

        <div className=" bg-blue-700 rounded-3xl mx-10 mb-10 flex flex-col p-5 shadow-md shadow-slate-500">
          <img src={tax3} alt="Person selling home" className="w-full" />
          <h1 className="text-2xl text-white py-5">
            Home repair & maintenance
          </h1>
          <p className="text-white  p-2 pb-5 text-sm text-left">
            When you sell your property and make a profit, a 30% capital gains
            tax applies. You can deduct expenses for repair & maintenance for
            actions that have improved the condition of the property at the time
            of sale compared to when it was purchased.
          </p>
          <button
            onClick={() => openTaxCategory(3)}
            className="border p-2 w-full text-blue-700 bg-white rounded-lg"
          >
            Explore
          </button>
        </div>

        <div className="m-7">hello</div>
      </div>
    </>
  );
}
export default SelectTaxCategory1;
