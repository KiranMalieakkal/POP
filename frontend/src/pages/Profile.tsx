import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[url('https://img.freepik.com/free-photo/statistic-document-with-pen-glasses_1098-2006.jpg?uid=R157119579&ga=GA1.1.759350799.1721280675&semt=sph')] bg-cover bg-center h-full text-white">
        <div className="w-full max-w-xl">
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
                  <p className="text-center mb-2">{user.name}</p>
                  <p className="text-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 inline-block text-blue-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                   {" "} {user.email}
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
