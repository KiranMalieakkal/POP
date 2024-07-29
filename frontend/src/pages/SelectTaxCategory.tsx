import { useState } from "react";
import SelectTaxCategory1 from "./SelectTaxCategory1";
import SelectTaxCategory2 from "./SelectTaxCategory2";
import SelectTaxCategory3 from "./SelectTaxCategory3";

// Description: This component is the wizard for users to connect a tax category to a project.

function SelectTaxCategory() {
  const [taxCategory, setTaxCategory] = useState<number>();
  const [currentStep, setCurrentStep] = useState(1);

  // -------------------------------------------------------------------------------------
  // nextStep and prevStep help us render the different components.
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // -------------------------------------------------------------------------------------
  // This function decides which component to render.
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectTaxCategory1 openTaxCategory={handleButtonClickToNextPage} />
        );
      case 2:
        return <SelectTaxCategory2 taxCategory={taxCategory!} />;
      case 3:
        return <SelectTaxCategory3 />;
      default:
        return (
          <SelectTaxCategory1 openTaxCategory={handleButtonClickToNextPage} />
        );
    }
  };

  // -------------------------------------------------------------------------------------
  // This function is sent as a prop to a component to enable it to render a new page
  function handleButtonClickToNextPage(selectedTaxCategory: number) {
    // renders next page
    setCurrentStep(2);
    // sets the tax category useState
    setTaxCategory(selectedTaxCategory);
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }

  return (
    <div className="wizard">
      <div className="navigation-buttons flex flex-row justify-between m-3">
        {currentStep > 1 && (
          <button onClick={prevStep} className="badge p-4 bg-blue-100">
            Back
          </button>
        )}
        {currentStep < 3 && currentStep > 1 && (
          <button onClick={nextStep} className="badge p-4 bg-blue-100">
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button className="badge p-4 bg-gray-300 text-gray-400">
            Finito
          </button>
        )}
      </div>
      {renderStep()}
    </div>
  );
}

export default SelectTaxCategory;
