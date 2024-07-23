import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'

function App() {
  

  return (
    <>
      <main className="container">
        <h1>Auth0 Login</h1>
       <LoginButton />
       <LogoutButton />
       <Profile />
      </main>
    </>
  )
}

export default App
