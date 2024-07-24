import Footer from "./Footer";

const Home = () => {
  return (
    <>
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
              Get Started
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

      <div className="hero bg-base-200 min-h-[50vh] bg-blue-50">
        <div className="hero-content flex-col gap-20 lg:flex-row">
          <div className="card glass w-96">
            <figure>
              <img
                src="https://www.adobe.com/content/dam/dx-dc/images/mobile/scan/05_Mobile_acom-scan-save-430x480.png.img.png"
                alt="car!"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title">Track your expenses.</h2>
              <p>Our app allows you to store all your receipts in one place, making it simple to track your expenses.</p>
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
              <h2 className="card-title">Life hack</h2>
              <p>Our app provides a seamless solution for organizing, storing, and accessing your receipts.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
