import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Top_Nav from "../components/Top_Nav";
import BottomNav from "../components/BottomNav";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
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
     {/*  <Link
        to="/"
        className=" bg-blue-100 border  border-t-0 border-x-0 border-b-2 border-blue-900"
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        
      </Link> */}
      <LoginButton/>
      <LogoutButton/>
    </div>
    </>
  );
};

export default Home;





