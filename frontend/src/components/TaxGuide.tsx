import lineArtImage from "../assets/receipt-taxes-calculation-line-art.png";

function TaxGuide() {
  return (
    <>
      <div className="text-gray-400 px-5 max-w-md">
        <img src={lineArtImage} alt="Logo" className="" />
        <p className="text-left  pt-10">
          POP makes taxes simple. Collect your receipts and follow the
          step-by-step guide to get your deductions. Click the blue button and
          find the right tax for you.
        </p>
      </div>
    </>
  );
}
export default TaxGuide;
