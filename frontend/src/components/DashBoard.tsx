import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import BottomNav from "./BottomNav";

import Tax from "./Tax";
import ListReceipts from "./ListReceipts";


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
          <Route path="addReceipt" element={<ListReceipts  />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tax" element={<Tax />} />
        </Routes>
      </div>
      <div>
        <BottomNav />
      </div>
    </>
  );
}

export default Dashboard;
