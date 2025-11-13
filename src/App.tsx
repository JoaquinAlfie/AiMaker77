import Landing from './components/landing'
import Home from './components/home'
import Signin from './components/signin'
import Signup from './components/signup'
import Chatbot from './components/chatbot'
import Support from './components/support'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [user, setUser] = useState<string>("");
  const [page, setPage] = useState<
    "landing" | "signin" | "signup" | "home" | "chatbot" | "support">("landing");

  // 💡 Si ya hay un usuario, mostramos la página correspondiente
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
      >
        {user ? (
          (() => {
            switch (page) {
              case "home":
                return <Home user={user} setUser={setUser} setPage={setPage} />;
              case "chatbot":
                return <Chatbot user={user} setUser={setUser} setPage={setPage} />;
              case "support":
                return <Support setPage={setPage} />;
              default:
                return <Home user={user} setUser={setUser} setPage={setPage} />;
            }
          })()
        ) : (
          (() => {
            switch (page) {
              case "signup":
                return <Signup setUser={setUser} setPage={setPage} />;
              case "signin":
                return <Signin setUser={setUser} setPage={setPage} />;
              default:
                return <Landing setPage={setPage} />;
            }
          })()
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
