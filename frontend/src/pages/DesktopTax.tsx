import useScreenType from "../components/useSceenType";

import BottomNav from "../components/BottomNav";
import Top_Nav from "../components/Top_Nav";

function DesktopTax() {
  const { isMobile } = useScreenType();
  return (
    <>
      {!isMobile && <Top_Nav />}
      <div>Tax section yo!</div>
      {isMobile && <BottomNav />}
    </>
  );
}
export default DesktopTax;
