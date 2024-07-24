import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/DashBoard";
import Home from "./components/Home";
import TaxInfo from "./components/TaxInfo";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/taxinfo"
              element={<TaxInfo/>}
            />
            <Route
              path="/receipts/*"
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>

        
        {/* <Profile /> */}
        {/* <Tax/> */}
      
    </>
  );
}

export default App;
