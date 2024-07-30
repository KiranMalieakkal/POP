import { Link } from "react-router-dom";
/* import Footer from "../components/Footer";
import Top_Nav from "../components/Top_Nav";
import BottomNav from "../components/BottomNav"; */
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useState } from "react";

const Home = () => {
  const [activeButton, setActiveButton] = useState("receipts");

  function handleClick(buttonName: string) {
    setActiveButton(buttonName);
  }
  return (
    <>
     {/*  <Top_Nav /> */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Now you can upload and categorize your receipt anywhere.
            </h1>
            <p className="mb-5">
              Are you tired of losing track of your receipts and missing out on
              tax deductions? Our Receipt Organizer app is here to help you stay
              on top of your finances effortlessly.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              <Link to="/receipts">Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="hero bg-white min-h-[50vh]">
        <div className=" max-w-5xl mx-auto hero-content flex-col gap-12 lg:flex-row">
          <img
            src="https://www.adobe.com/content/dam/dx-dc/images/mobile/scan/01-acom-scan-scananything-986x1104.png.img.png"
            className="max-w-sm rounded-lg"
          />
          <div>
            <h1 className="text-5xl font-bold">Turn paper into PDFs.</h1>
            <p className="py-6">
              Prepare for tax season with ease by utilizing our app to complete
              the tax reduction form. Our app helps you keep track of your
              deductible expenses, ensuring you never miss out on potential tax
              savings.
            </p>
          </div>
        </div>
      </div>
      <div className="hero bg-white min-h-[50vh]">
        <div className=" max-w-5xl mx-auto hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://www.adobe.com/content/dam/dx-dc/images/mobile/scan/02-acom-scan-cleanandclear-986x1104.png.img.png"
            className="max-w-sm rounded-lg"
          />
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              AI cleans up your scans in seconds.
            </h1>
            <p className="py-6">
              Scan your receipt and turn it into an editable, searchable PDF
              instantly with our AI-driven mobile app. OCR (optical character
              recognition) corrects image perspective, sharpens handwritten or
              printed text, and removes glares and shadows. Once your doc is
              scanned, you can delete text or add new text to match your
              original font.
            </p>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content flex-col gap-20 lg:flex-row">
          <div className="card glass w-96">
            <figure>
              <img
                src="https://www.adobe.com/content/dam/dx-dc/images/mobile/scan/05_Mobile_acom-scan-save-430x480.png.img.png"
                alt="car!"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title self-center">Track your expenses.</h2>
              <p>
                Our app allows you to store all your receipts in one place,
                making it simple to track your expenses.
              </p>
            </div>
          </div>
          <div className="card glass w-96">
            <figure>
              <img
                src="https://www.adobe.com/content/dam/dx-dc/images/mobile/scan/06_Mobile_acom-scan-acrobat-430x480.png.img.png"
                alt="car!"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title self-center">Life hack</h2>
              <p>
                Our app provides a seamless solution for organizing, storing,
                and accessing your receipts.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="btm-nav border-transparent text-current btm-nav-lg bg-blue-100 shadow-sky-600">
     
      <LoginButton/>
       <LogoutButton/> 
      {/* <div className="btm-nav border-transparent text-current btm-nav-lg bg-blue-100 shadow-sky-600">
      <Link
        to="/"
        className={
          activeButton === "home"
            ? "active bg-blue-100 border  border-t-0 border-x-0 border-b-8 border-blue-900"
            : ""
        }
        onClick={() => handleClick("home")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-7 ${
            activeButton === "home" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <div
          className={` ${
            activeButton === "home" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          Home
        </div>
      </Link>
      <Link
        to="receipts"
        className={
          activeButton === "receipts"
            ? "active bg-blue-100 border  border-t-0 border-x-0 border-b-8 border-blue-900"
            : ""
        }
        onClick={() => handleClick("receipts")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-7 ${
            activeButton === "receipts" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <div
          className={` ${
            activeButton === "receipts" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          Receipts
        </div>
      </Link>
      <Link
        to="receipts/tax"
        className={
          activeButton === "tax"
            ? "active  bg-blue-100 border border-t-0 border-x-0 border-b-8 border-blue-900"
            : ""
        }
        onClick={() => handleClick("tax")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-7 ${
            activeButton === "tax" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
          />
        </svg>
        <div
          className={` ${
            activeButton === "tax" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          Tax
        </div>
      </Link>
      <Link
        to="profile"
        className={
          activeButton === "profile"
            ? "active  bg-blue-100 border  border-t-0 border-x-0 border-b-8 border-blue-900"
            : ""
        }
        onClick={() => handleClick("profile")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-7 ${
            activeButton === "profile" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <div
          className={` ${
            activeButton === "profile" ? "text-blue-600" : "text-blue-900"
          }`}
        >
          Profile
        </div>
      </Link>
    </div> */}
    </div>
    </>
  );
};

export default Home;





