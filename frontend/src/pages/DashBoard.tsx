import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import BottomNav from "../components/BottomNav";
import Tax from "./Tax";
import ListReceipts from "./ListReceipts";
import ViewReceipt from "./ViewReceipt";
import AddReceipt from "./AddReceipt";
import ViewProject from "./ViewProject";
import SelectTaxCategory from "./SelectTaxCategory";

function Dashboard() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="" element={<ListReceipts />} />
          <Route path="add" element={<AddReceipt />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tax" element={<Tax />} />
          <Route path=":id" element={<ViewReceipt />} />
          <Route path="/addReceipt" element={<AddReceipt />} />
          <Route path="selectTax" element={<SelectTaxCategory />} />
          <Route path="tax/:id" element={<ViewProject />} />
        </Routes>
      </div>
      <div>
        <BottomNav />
      </div>
    </>
  );
}

export default Dashboard;
