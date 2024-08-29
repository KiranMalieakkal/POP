import lineArtImage from "../assets/receipt-and-hand-line-art.png";

function ReceiptGuide() {
  return (
    <>
      <div className="text-gray-400 px-5 max-w-md">
        <img src={lineArtImage} alt="Logo" className="" />
        <p className="text-left  pt-10">
          This is where all your receipts live. Get started by adding new
          receipts. Add an image of a receipt and we will identify the text
          automatically.
        </p>
      </div>
    </>
  );
}
export default ReceiptGuide;
