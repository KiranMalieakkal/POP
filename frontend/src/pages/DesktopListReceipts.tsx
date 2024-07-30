import { useState } from "react";
import useScreenType from "../components/useSceenType";
import ListReceipts from "./ListReceipts";
import AddReceipt from "./AddReceipt";
import ReceiptDetail from "./ViewReceipt";
import Top_Nav from "../components/Top_Nav";
import BottomNav from "../components/BottomNav";

function DesktopListReceipts() {
  const { isMobile } = useScreenType();
  const [showAddReceipt, setShowAddReceipt] = useState<boolean>(false);
  const [showListReceipts, setShowListReceipts] = useState<boolean>(true);
  const [showViewReceipt, setShowViewReceipt] = useState<boolean>(false);
  const [viewReceiptId, setViewReceiptId] = useState<number | null>(null);

  // -------------------------------------------------------------------------------------
  // This function is decides which component to render.
  function windowToDisplay({ window, id }: { window: string; id?: number }) {
    switch (window) {
      case "AddReceipt":
        setShowAddReceipt(true);
        setShowViewReceipt(false);
        if (!isMobile) {
          setShowListReceipts(true);
        } else {
          setShowListReceipts(false);
        }
        break;
      case "ViewReceipt":
        setShowAddReceipt(false);
        setShowViewReceipt(true);
        setViewReceiptId(id ?? null);
        if (!isMobile) {
          setShowListReceipts(true);
        } else {
          setShowListReceipts(false);
        }
        break;
      case "hideAddReceipt":
        setShowAddReceipt(false);
        setShowViewReceipt(false);
        setShowListReceipts(true);
        break;
      case "hideViewReceipt":
        setShowViewReceipt(false);
        setShowAddReceipt(false);
        setShowListReceipts(true);
        break;
      default:
        setShowListReceipts(true);
    }
  }

  // -------------------------------------------------------------------------------------
  return (
    <>
      {!isMobile && <Top_Nav />}
      <button
        onClick={() => windowToDisplay({ window: "AddReceipt" })}
        className="bg-green-200 btn m-5"
      >
        show the add receipt window
      </button>
      <button
        onClick={() => windowToDisplay({ window: "ViewReceipt" })}
        className="bg-pink-200  btn m-"
      >
        show the view receipt window
      </button>

      <div className={`main_container ${isMobile ? "" : "grid grid-cols-2"}`}>
        {showListReceipts && (
          <div className="left_side">
            <ListReceipts windowToDisplay={windowToDisplay} />
          </div>
        )}
        {(showAddReceipt || showViewReceipt) && (
          <div className="right_side px-20">
            <div className="border border-black rounded-2xl">
              {showAddReceipt && (
                <AddReceipt windowToDisplay={windowToDisplay} />
              )}
              {showViewReceipt && (
                <ReceiptDetail
                  receiptId={viewReceiptId!}
                  windowToDisplay={windowToDisplay}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {isMobile && <BottomNav />}
    </>
  );
}
export default DesktopListReceipts;
