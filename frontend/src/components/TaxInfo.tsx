import Footer from "./Footer";
import Top_Nav from "./Top_Nav";

const TaxInfo = () => {
  return (
    <>
      <Top_Nav />
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://insight2wealth.com/wp-content/uploads/2020/08/shutterstock_318071399.jpg",
        }}
      >
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-neutral-content text-left">
          <div className="max-w-md">
            <h6>Proof Of Purchase app</h6>
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default TaxInfo;
