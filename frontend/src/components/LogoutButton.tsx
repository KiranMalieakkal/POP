import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div>
          <button className="btn text-blue-800" onClick={() => logout()}>Log out</button>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
