import Landing from './components/landing'
import Home from './components/home'
import Signin from './components/signin'
import Signup from './components/signup'
import Chatbot from './components/chatbot'
import Support from './components/support'
import { useState } from "react";

function App() {
  const [user, setUser] = useState<string>("");
  const [page, setPage] = useState<
    "landing" | "signin" | "signup" | "home" | "chatbot" | "support">("landing");

  // 💡 Si ya hay un usuario, mostramos la página correspondiente
  if (user) {
    switch (page) {
      case "home":
        return <Home user={user} setPage={setPage} />;
      case "chatbot":
        return <Chatbot user={user} setPage={setPage} />;
      case "support":
        return <Support setPage={setPage} />;
      default:
        return <Home user={user} setPage={setPage} />;
    }
  }

  // 💡 Si no hay usuario logueado
  switch (page) {
    case "signup":
      return <Signup setUser={setUser} setPage={setPage} />;
    case "signin":
      return <Signin setUser={setUser} setPage={setPage} />;
    default:
      return <Landing setPage={setPage} />;
  }
}
export default App
