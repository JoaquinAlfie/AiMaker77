import Landing from './components/landing'
import Home from './components/home'
import Signin from './components/signin'
import Signup from './components/signup'
import Chatbot from './components/chatbot'
import Support from './components/support'
import { useState } from "react";

function App() {

  const [user, setUser] =  useState<string>("");
  const [page, setPage ] = useState<"landing" | "signin" | "signup" | "home"> ("landing");
  if (user) return <Home user = {user}/>;

  switch (page) {
    case "signup":
      return <Signup setUser={setUser} setPage={setPage}/>;
    case "signin":
      return <Signin setUser={setUser} setPage={setPage}/>;
    default:
      return <Landing setPage={setPage}/>;
  }
}

export default App
