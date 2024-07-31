import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/DashBoard";
import Home from "./pages/Home";
import TaxInfo from "./pages/TaxInfo";
import ViewProject from "./pages/ViewProject";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import BottomNav from "./components/BottomNav";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/taxinfo" element={<TaxInfo />} />
          <Route path="/receipts/*" element={<Dashboard />} />
          <Route path="/viewproject" element={<ViewProject />} />
        </Routes>
        {isAuthenticated ? <BottomNav /> : <LoginButton />}
      </BrowserRouter>
    </>
  );
}

export default App;
