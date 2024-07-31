import { useRef, useState } from "react";
import SelectTaxCategory1 from "./SelectTaxCategory1";
import SelectTaxCategory2 from "./SelectTaxCategory2";
import SelectTaxCategory3 from "./SelectTaxCategory3";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type NewPost = {
  projectId: string;
  taxId: number;
};

// Description: This component is the wizard for users to connect a tax category to a project.

type Props = {
  windowToDisplay: ({ window, id }: { window: string; id?: number }) => void;
};

function SelectTaxCategory({ windowToDisplay }: Props) {
  const [taxCategory, setTaxCategory] = useState<number>();
  const [projectName, setProjectName] = useState<string>();
  const [currentStep, setCurrentStep] = useState(1);
  const [taxId, setTaxId] = useState<number>();
  const [projectId, setProjectId] = useState<string>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // This is used to scroll to the top of the parent div when moving between components.
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const { mutate: postTaxCategory } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch(
        `http://localhost:8080/api/taxes/${taxId}?email=jane.smith@example.com&projectId=${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      }),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["fetch3"] });
      navigate("/receipts/tax");
    },
  });

  // -------------------------------------------------------------------------------------
  // nextStep and prevStep help us render the different components.
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    setProjectName("");
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
        return (
          <SelectTaxCategory3
            setProjectName={setProjectName}
            setTaxId={setTaxId}
            setProjectId={setProjectId}
            taxCategory={taxCategory}
          />
        );
      default:
        return (
          <SelectTaxCategory1 openTaxCategory={handleButtonClickToNextPage} />
        );
    }
  };
  // -------------------------------------------------------------------------------------
  // This function triggers when the user selects a project (last step of the wizard)
  // This will activate the "finish" button which will then do a POST to the server.
  // function handleSelectProjectName(selectedProjectName: string) {
  //   setProjectName(selectedProjectName);
  // }

  // -------------------------------------------------------------------------------------
  // POST to the server (also check if projectName is truthy and navigate back to Tax.tsx)
  // todo: do the function.
  // function postTaxCategory() {
  //   if (!projectName) {
  //     // todo: when projectName is not set we should show a toast with some error message
  //     // maybe: "select a project from the list"
  //     return;
  //   }
  //   // todo: do the post here and also navigate back to Tax.tsx
  //   console.log("Tax category selected: " + taxCategory);
  //   console.log("Tax category selected: " + projectName);
  // }

  function handleClick() {
    console.log(taxId);
    console.log(projectId);
    postTaxCategory({
      projectId: projectId!,
      taxId: taxId!,
    });
  }

  // -------------------------------------------------------------------------------------
  // This function is sent as a prop to a component to enable it to render a new page
  function handleButtonClickToNextPage(selectedTaxCategory: number) {
    // renders next page
    setCurrentStep(2);
    // sets the tax category useState
    setTaxCategory(selectedTaxCategory);
    // Scroll to the top of the page
    //window.scrollTo(0, 0); // deprecated and replaced, see below
    // Scroll the div to the top
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo(0, 0);
    }
  }

  return (
    <div
      className="wizard max-h-[calc(100vh-150px)] overflow-y-auto max-w-md"
      ref={scrollableDivRef}
    >
      <div className="navigation-buttons flex flex-row justify-between m-3">
        {currentStep == 1 && (
          <button
            onClick={() => windowToDisplay({ window: "hideSelectTaxCategory" })}
            className="badge p-4 bg-blue-100"
          >
            Close
          </button>
        )}
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
          <button
            onClick={handleClick}
            className={`badge p-4 ${
              projectName
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-gray-400"
            }`}
          >
            Save
          </button>
        )}
      </div>
      {renderStep()}
    </div>
  );
}

export default SelectTaxCategory;
