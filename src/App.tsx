import Landing from './components/landing'
import Home from './components/home'
import Signin from './components/signin'
import Signup from './components/signup'
import Chatbot from './components/chatbot'
import Support from './components/support'
import { useState } from "react";

function App() {

  const [user, setUser] = useState<string[]>([]);
  return (
    <>
    { user.length === 0
    ? <Signup setUser={setUser} /> 
    : <Home/>
    }
    </>
  )
}

export default App
