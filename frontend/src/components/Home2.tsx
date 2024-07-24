import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

function Home2(){
    return(
        <>
        <main className="container">
        <LoginButton />
        <LogoutButton />
        <Profile />
        </main>
        </>
    )
}
export default Home2;