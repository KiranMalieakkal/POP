import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import useScreenType from "../components/useSceenType";
/* import loginImg from "../assets/loginImg.jpg";
import mainImg from "../assets/mainBlue1.jpg";
import short from "../assets/short.jpeg";
import largeMain from "../assets/mainShort.jpg";

import popLogo from "../assets/pop-logo-white.svg"; */
// images and icon imports
import handHoldingPhone from "../assets/receipt-and-phone.png";
import perfectReceiptCopy from "../assets/perfect-copy.png";
import iconRecycle from "../assets/icon-recycle.svg";
import iconJustice from "../assets/icon-justice.svg";
import iconHelp from "../assets/icon-help.svg";
import iconSearch from "../assets/icon-search.svg";
import decisionTree from "../assets/decision-tree.png";

const Home = () => {
  const { isMobile } = useScreenType();
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div
        className={`first_container ${
          isMobile
            ? "flex flex-col border-b-2 border-gray-400"
            : "grid grid-cols-2 justify-center items-center border-b-2 border-gray-400"
        }`}
      >
        <div className="flex justify-center lg:justify-end">
          <div>
            <p className="text-indigo-900 font-mono font-extrabold text-5xl text-center pt-10 lg:text-8xl lg:text-left lg:pt-0">
              Digitized
            </p>
            <p className="text-indigo-900 font-mono font-extrabold text-5xl text-center lg:text-8xl lg:text-left">
              Receipts
            </p>
            <p className="py-5 text-indigo-900 text-lg px-10 md:w-96 lg:w-96 lg:px-0">
              Time to throw away your physical receipts. Save them digitally.
              Make them fully searchable, always accessible, and retain 100%
              validity!
            </p>
          </div>
        </div>
        <div className=" flex  justify-center lg:justify-start">
          <img src={handHoldingPhone} alt="Logo" className="w-3/5" />
        </div>
      </div>

      <div
        className={`second_container mt-10 ${
          isMobile
            ? "flex flex-col mb-20 border-b-2 border-gray-400"
            : "grid grid-cols-2 justify-center items-center border-b-2 border-gray-400"
        }`}
      >
        <div className="flex justify-center lg:justify-end">
          <div>
            <p className="text-indigo-900 font-mono font-extrabold text-5xl text-center pt-10 lg:text-8xl lg:text-left lg:pt-0">
              Perfect
            </p>
            <p className="text-indigo-900 font-mono font-extrabold text-5xl text-center lg:text-8xl lg:text-left lg:pt-0">
              copies
            </p>
            <p className="py-5 text-indigo-900 text-lg px-10 md:w-96 lg:w-96 lg:px-0">
              Text recognition identifies all text from your image.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <img src={perfectReceiptCopy} alt="Logo" className="w-3/5" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center pb-20 border-b-2 border-gray-400">
        <div className="p-16">
          <img
            src={iconRecycle}
            alt="Recycle icon"
            className="w-32 mx-auto pb-5"
          />
          <p className="w-44">
            Throw away your physical receipts. On POP they live forever.
          </p>
        </div>
        <div className="p-16">
          <img
            src={iconJustice}
            alt="Justice icon"
            className="w-32 mx-auto pb-5"
          />
          <p className="w-44">
            Warranty ready. Digital receipts retain 100% validity.
          </p>
        </div>
        <div className="p-16">
          <img
            src={iconHelp}
            alt="Two hands coupled"
            className="w-32 mx-auto pb-5"
          />
          <p className="w-44">
            Get help with warranty law. Straightforward and easy to follow.
          </p>
        </div>
        <div className="p-16">
          <img
            src={iconSearch}
            alt="Magnifying glass"
            className="w-32 mx-auto pb-5"
          />
          <p className="w-44">
            Fully searchable. All text is saved, works for every word and number
            on the receipt.{" "}
          </p>
        </div>
      </div>

      <div
        className={`second_container py-10 bg-indigo-900 ${
          isMobile
            ? "flex flex-col pb-20 mb-20"
            : "grid grid-cols-2 justify-center items-center py-40"
        }`}
      >
        <div className="flex justify-center lg:justify-end">
          <div>
            <p className="text-indigo-300 font-mono font-extrabold text-3xl text-center pt-10 lg:text-5xl lg:text-left lg:pt-0">
              Tax deductions
            </p>
            <p className="text-indigo-300 font-mono font-extrabold text-3xl text-center lg:text-5xl lg:text-left lg:pt-0">
              made easy
            </p>
            <p className="text-indigo-400 py-5 px-10 md:w-96 lg:w-96 lg:px-0">
              Receipts and tax rules can be overwhelming, but they don’t have to
              be. With POP, anyone can easily navigate tax regulations and
              uncover deductions without the stress. Our intuitive click-through
              wizard guides you step-by-step, breaking down complex tax rules
              into straightforward, digestible information — so you can maximize
              your deductions with confidence.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <img src={decisionTree} alt="Logo" className="w-3/5" />
        </div>
      </div>

      {!isAuthenticated && (
        <div className="btm-nav border-transparent text-current btm-nav-lg bg-blue-100 shadow-sky-600 w-auto">
          {isAuthenticated ? "" : <LoginButton />}
        </div>
      )}
    </>
  );
};

export default Home;
