import { useAuth0 } from "@auth0/auth0-react";
import BottomNav from "./BottomNav";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <>{isAuthenticated && 
    <div><button onClick={() => logout()}>Log out</button>

    <BottomNav/></div>}
  </>);
};

export default LogoutButton;