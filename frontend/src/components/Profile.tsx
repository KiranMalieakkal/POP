import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <article className="container">
          {/*   {JSON.stringify(user)} */}
          {user?.picture && <img src={user.picture} />}
          {user && (
            <>
              <p>Nombre: {user.name}</p>
              <p>Correo electrónico: {user.email}</p>
            </>
          )}
        </article>
      )}
    </>
  );
};

export default Profile;
