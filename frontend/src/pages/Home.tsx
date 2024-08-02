import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import loginImg from "../assets/loginImg.jpg";
import mainImg from "../assets/mainBlue1.jpg";
import short from "../assets/short.jpeg";
import largeMain from "../assets/mainShort.jpg";
import Footer from "../components/Footer";

 import popLogo from "../assets/pop-logo-white.svg"; 

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div className="hero  relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${isAuthenticated ? loginImg : mainImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(90%)",
          }}
        ></div>

        <div className="flex flex-col md:flex-row lg:flex-row items-center h-full relative">
          <div className="flex-1 flex items-center justify-center h-full px-4 ml-0 md:ml-6 ">
            <img
              src={short}
              alt="short Image"
              className="h-full w-full object-cover block md:hidden"
            />
            <img
              src={largeMain}
              alt="large Image"
              className="h-full w-full object-cover hidden md:block "
            />
          </div>
          {/* <div className="pop-logo w-56">
            <img src={popLogo} alt="P.O.P. logotype" />
          </div> */}
          <div className="">
          <div className=" flex items-center justify-center p-4">
                <img className=" w-12 h-12  xl:mb-20  lg:mb-14 " src={popLogo} alt="P.O.P. logotype" />
                <h1 className="text-center text-3xl md:text-2xl lg:text-3xl xl:text-5xl xl:mb-20 lg:mb-14 font-serif md:mb-3 mt-2 text-yellow-200 ml-2">
              Proof Of Purchase{" "}
            </h1>
              </div>
            <div className="flex-1 flex items-center justify-center py-7 mt-1 md:py-7 lg:py-10 md:px-5 px-3 lg:px-1 mr-7 m-7 xl:ml-16 bg-white bg-opacity-65 rounded-lg shadow-lg md:max-w-sm xl:max-w-2xl">
              <div className="text-center">
                {isAuthenticated ? (
                  <>
                    <h3 className="mb-1 text-xl font-bold lg:p-1 md:text-xl lg:text-2xl ">
                      POP is here to help you stay on top of your finances
                      effortlessly
                    </h3>
                    <p className=" text-sm p-2 lg:text-lg">
                      Let us handle the details, making it easy for you to
                      manage receipts, view them anytime and ensure you have all
                      receipts handy to benefit from potential deductions!
                    </p>
                    <p className="text-lg font-semibold p-2 lg:mx-3 ">
                      Enjoy having everything in order!
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="mb-1 text-xl font-bold lg:p-1 md:text-xl lg:text-3xl ">
                      Now you can upload and categorize your receipt anywhere.
                    </h3>
                    <p className=" text-sm p-2 lg:text-lg">
                      Our app allows you to store all your receipts in one
                      place, making it simple to track your expenses.
                    </p>
                    <div className=" text-blue-900 font-bold py-2 px-4 rounded-md text-center mx-10">
                      <p>POP Always!</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero bg-white min-h-[40vh]">
        <div className=" max-w-2xl md:max-w-4xl mx-auto hero-content flex-col gap-12 lg:flex-row">
          <img
            src="https://img.freepik.com/free-photo/hand-holding-receipt-shopping-campaign_53876-129567.jpg?uid=R157119579&ga=GA1.1.759350799.1721280675&semt=ais_hybrid"
            className="md:max-w-sm max-w-auto rounded-full h-48 w-48 object-cover"
          />
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              Turn paper into a digital file.
            </h1>
            <p className="py-6">
              Prepare for tax season with ease by utilizing our app to complete
              the tax reduction form. Our app helps you keep track of your
              deductible expenses, ensuring you never miss out on potential tax
              savings.
            </p>
          </div>
        </div>
      </div>
      <div className="hero bg-white min-h-[40vh]">
        <div className=" max-w-2xl  md:max-w-4xl mx-auto hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.freepik.com/free-photo/hand-holding-calculator-finance-concept_53876-129568.jpg?t=st=1722388650~exp=1722392250~hmac=a375c8a80e17dd006eba83ee0708aa8dfad8487b34efac7bb456812a2b686163&w=1380"
            className="md:max-w-sm max-w-auto rounded-full h-48 w-48 object-cover"
          />
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              AI cleans up your scans in seconds.
            </h1>
            <p className="py-6">
              Scan your receipt and turn it into an editable, OCR (optical
              character recognition) corrects image perspective, sharpens
              handwritten or printed text, and removes glares and shadows. Once
              your receipt is scanned, you can delete text or add new text to
              match your original font.
            </p>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-[40vh] p-2 pb-20">
        <div className="hero-content flex-col gap-20 md:flex-row">
          <div className="card glass w-90">
            <figure>
              <img
                src="https://img.freepik.com/free-photo/top-view-smartphone-template-workspace_23-2148175198.jpg?t=st=1722388831~exp=1722392431~hmac=a5c784576eb4a196d253afdb99ffcc80e6a9c2960b06b96f5b3ec6e0ff65c607&w=2000"
                alt="car!"
                className=" h-60 w-75 object-cover"
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
          <div className="card glass w-90">
            <figure>
              <img
                src="https://img.freepik.com/free-photo/excited-young-woman-hold-paper-letter-feel-euphoric-receiving-job-promotion-tax-refund-from-bank-happy-woman-reading-paperwork-document-smiling-good-pleasant-news-getting-student-scholarship_657921-661.jpg?t=st=1722389231~exp=1722392831~hmac=65429f0e00834fc15534b08cd17ab172f4c06f5cae85b668dd40ff66b17db026&w=1800"
                alt="car!"
                className=" h-60 w-76 object-cover"
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
      <div className="btm-nav border-transparent text-current btm-nav-lg bg-blue-100 shadow-sky-600 w-auto">
        {isAuthenticated ? <Footer /> : <LoginButton />}
      </div>
    </>
  );
};

export default Home;
