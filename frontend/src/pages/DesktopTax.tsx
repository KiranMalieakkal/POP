import { useState } from "react";
import useScreenType from "../components/useSceenType";
import BottomNav from "../components/BottomNav";
import Top_Nav from "../components/Top_Nav";
import Tax from "./Tax";
import SelectTaxCategory from "./SelectTaxCategory";
import ViewProject from "./ViewProject";
import TaxGuide from "../components/TaxGuide";

function DesktopTax() {
  const { isMobile } = useScreenType();
  const [showTax, setShowTax] = useState<boolean>(true);
  const [showViewProject, setShowViewProject] = useState<boolean>(false);
  const [showSelectTaxCategory, setShowSelectTaxCategory] =
    useState<boolean>(false);

  // todo: implement switch case to handle showing of correct window
  // -------------------------------------------------------------------------------------
  // This function is decides which component to render.
  function windowToDisplay({ window, id }: { window: string; id?: number }) {
    switch (window) {
      case "SelectTaxCategory":
        console.log("you want to open the STC");
        setShowSelectTaxCategory(true);
        setShowViewProject(false);
        if (!isMobile) {
          setShowTax(true);
        } else {
          setShowTax(false);
        }
        break;
      case "ViewProject":
        console.log("you want to view a Tax project");
        setShowSelectTaxCategory(false);
        setShowViewProject(true);
        if (!isMobile) {
          setShowTax(true);
        } else {
          setShowTax(false);
        }
        break;
      case "hideSelectTaxCategory":
        console.log("you wanted to close the STC");
        setShowSelectTaxCategory(false);
        setShowTax(true);
        break;
      default:
        setShowTax(true);
    }
  }

  // -------------------------------------------------------------------------------------

  return (
    <>
      {!isMobile && <Top_Nav />}

      <div className={`main_container ${isMobile ? "" : "grid grid-cols-2"}`}>
        {showTax && (
          <div className="left_side">
            <Tax windowToDisplay={windowToDisplay} />
          </div>
        )}
        {(showSelectTaxCategory || showViewProject) && (
          <div className="right_side px-20 py-10">
            <div
              className={`  ${
                isMobile ? "" : "border border-black rounded-2xl "
              }`}
            >
              {showSelectTaxCategory && (
                <SelectTaxCategory windowToDisplay={windowToDisplay} />
              )}
              {showViewProject && <ViewProject />}
            </div>
          </div>
        )}
        {!showSelectTaxCategory && !showViewProject && (
          <div className="right_side  text-center mt-20">
            <TaxGuide />
          </div>
        )}
      </div>
      {isMobile && <BottomNav />}
    </>
  );
}
export default DesktopTax;
