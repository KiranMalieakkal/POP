import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import BottomNav from "../components/BottomNav";

import Tax from "./Tax";
import ListReceipts from "./ListReceipts";
import ViewReceipt from "./ViewReceipt";

function Dashboard() {
  // const { data } = useQuery({
  //   queryKey: ["fetch"],
  //   queryFn: () =>
  //     fetch(`http://localhost:3000/api/users/${username}/trips`)
  //       .then((response) => response.json())
  //       .then((data) => data),
  // });

  return (
    <>
      <div className="">
        <Routes>
          <Route path="" element={<ListReceipts />} />
          <Route path="addReceipt" element={<ListReceipts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tax" element={<Tax />} />
          <Route path=":id" element={<ViewReceipt />} />
        </Routes>
      </div>
      <div>
        <BottomNav />
      </div>
    </>
  );
}

export default Dashboard;
