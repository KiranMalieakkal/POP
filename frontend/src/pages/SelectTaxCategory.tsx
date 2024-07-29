// Description: This component is the wizard for users to connect a tax category to a project.
// It takes in all the steps (components) needed for the user to select a
//

import { useState } from "react";
import AddReceipt from "./AddReceipt";
import SelectTax from "./SelectTax";
import SelectTaxCategory1 from "./SelectTaxCategory1";

// Om vi skippar routing så kommer vi kunna använda den här komponenten i desktop-versionen också.
// Det är mer modulärt.
// Då slipper vi också ladda in samma underlag (t.ex. bilder) för varje komponent.
// Vi behöver heller inte använda prop-drilling eller liknande utan kan bara spara tax id i en enda useState.

// Ladda in min komponent.
// Sen har vi useStates för att dölja och visa olika komponenter.

function SelectTaxCategory() {
  const [taxCategory, setTaxCategory] = useState<number>();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // This function decides which component to render.
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectTaxCategory1 />;
      case 2:
        return <AddReceipt />;
      case 3:
        return <SelectTax />;
      default:
        return <SelectTaxCategory1 />;
    }
  };

  // Todo: nummer1 behöver en prop i form av en funktion så att dess knapp kan sätta useState för currentStep
  // Den behöver även sätta useState för tax category
  function handleButtonClickToNextPage(taxCategory: number) {
    // renders next page
    setCurrentStep(+1);
    // sets the tax category useState
    setTaxCategory(taxCategory);
  }

  return (
    <div className="wizard">
      <div className="navigation-buttons flex flex-row justify-between m-3">
        {currentStep > 1 && (
          <button onClick={prevStep} className="badge p-4 bg-blue-100">
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button onClick={nextStep} className="badge p-4 bg-blue-100">
            Next
          </button>
        )}
      </div>
      {renderStep()}
    </div>
  );
}

export default SelectTaxCategory;
