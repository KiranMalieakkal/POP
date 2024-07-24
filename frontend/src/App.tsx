import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/DashBoard";
import Home from "./pages/Home";
import TaxInfo from "./pages/TaxInfo";

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
