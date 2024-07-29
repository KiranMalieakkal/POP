import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/DashBoard";
import Home from "./pages/Home";
import TaxInfo from "./pages/TaxInfo";
import ViewProject from "./pages/ViewProject";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/taxinfo" element={<TaxInfo />} />
          <Route path="/receipts/*" element={<Dashboard />} />
          <Route path="/viewproject" element={<ViewProject />} />
          
        </Routes>
      </BrowserRouter>

      {/* <Profile /> */}
      {/* <Tax/> */}
    </>
  );
}

export default App;
