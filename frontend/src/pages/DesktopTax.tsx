import { useState } from "react";
import useScreenType from "../components/useSceenType";
import Tax from "./Tax";
import SelectTaxCategory from "./SelectTaxCategory";
import ViewProject from "./ViewProject";
import TaxGuide from "../components/TaxGuide";

function DesktopTax() {
  const { isMobile } = useScreenType();
  const [showTax, setShowTax] = useState<boolean>(true);
  const [showViewProject, setShowViewProject] = useState<boolean>(false);
  const [viewProjectId, setViewProjectId] = useState<number | null>(null);
  const [showSelectTaxCategory, setShowSelectTaxCategory] =
    useState<boolean>(false);

  // todo: implement switch case to handle showing of correct window
  // -------------------------------------------------------------------------------------
  // This function is decides which component to render.
  function windowToDisplay({ window, id }: { window: string; id?: number }) {
    switch (window) {
      case "SelectTaxCategory":
        setShowSelectTaxCategory(true);
        setShowViewProject(false);
        if (!isMobile) {
          setShowTax(true);
        } else {
          setShowTax(false);
        }
        break;
      case "ViewProject":
        setShowSelectTaxCategory(false);
        setShowViewProject(true);
        setViewProjectId(id ?? null);
        if (!isMobile) {
          setShowTax(true);
        } else {
          setShowTax(false);
        }
        break;
      case "hideSelectTaxCategory":
        setShowSelectTaxCategory(false);
        setShowViewProject(false);
        setShowTax(true);
        break;
      case "hideViewProject":
        setShowSelectTaxCategory(false);
        setShowViewProject(false);
        setShowTax(true);
        break;
      default:
        setShowTax(true);
    }
  }

  // -------------------------------------------------------------------------------------

  return (
    <>
      <div className={`main_container ${isMobile ? "" : "grid grid-cols-2"}`}>
        {showTax && (
          <div className="left_side">
            <Tax windowToDisplay={windowToDisplay} />
          </div>
        )}
        {(showSelectTaxCategory || showViewProject) && (
          <div className="right_side px-2 py-10 flex justify-center">
            <div
              className={`  ${
                isMobile ? "" : "border border-black rounded-2xl "
              }`}
            >
              {showSelectTaxCategory && (
                <SelectTaxCategory windowToDisplay={windowToDisplay} />
              )}
              {showViewProject && (
                <ViewProject
                  windowToDisplay={windowToDisplay}
                  projectId={viewProjectId!}
                />
              )}
            </div>
          </div>
        )}
        {!showSelectTaxCategory && !showViewProject && !isMobile && (
          <div className="right_side text-center mt-20 flex justify-center">
            <TaxGuide />
          </div>
        )}
      </div>
    </>
  );
}
export default DesktopTax;
