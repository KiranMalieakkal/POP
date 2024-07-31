import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";
import mail from "../assets/save.png"

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 h-full text-white">
        <div className="w-full max-w-xl p-4 bg-blue-900 text-white rounded-lg m-5">
          {isAuthenticated && (
            <article className="container bg-white  text-blue-800 p-6 rounded-lg shadow-xl">
              {user?.picture && (
                <img
                  className="w-24 rounded-full mx-auto mb-4"
                  src={user.picture}
                />
              )}
              {user && (
                <>
                  <p className="text-center mb-2 text-2xl">{user.name}</p>
                  <p className="flex items-center justify-center mb-4">
                  <img
                  className="h-8 w-8 mr-2"
                  src={mail}
                />
                   {user.email}
                  </p>
                </>
              )}
              <div className="flex justify-center">
                <LogoutButton />
              </div>
            </article>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
