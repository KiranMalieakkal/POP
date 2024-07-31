import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
/* import Dashboard from "./pages/DashBoard"; */
import Home from "./pages/Home";
/* import TaxInfo from "./pages/TaxInfo";
import ViewProject from "./pages/ViewProject";
import SelectTaxCategory from "./pages/SelectTaxCategory.tsx"; */
import DesktopListReceipts from "./pages/DesktopListReceipts.tsx";
import DesktopTax from "./pages/DesktopTax.tsx";
import BottomNav from "./components/BottomNav.tsx";
import LoginButton from "./components/LoginButton.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import useScreenType from "./components/useSceenType.tsx";
import Top_Nav from "./components/Top_Nav.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  const { isAuthenticated } = useAuth0();
  const { isMobile } = useScreenType();
  return (
    <>
      <BrowserRouter>
        {isAuthenticated && !isMobile && <Top_Nav />}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/taxinfo" element={<TaxInfo />} />
          <Route path="/receipts/*" element={<Dashboard />} />
          <Route path="/viewproject" element={<ViewProject />} />
          <Route path="/viewtaxproject" element={<SelectTaxCategory />} /> */}
          <Route path="/receipts/*" element={<DesktopListReceipts />} />
          <Route path="/tax" element={<DesktopTax />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {isAuthenticated && isMobile ? <BottomNav /> : <LoginButton />}
      </BrowserRouter>
    </>
  );
}

export default App;
