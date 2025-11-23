import Landing from './components/landing'
import Home from './components/home'
import Signin from './components/signin'
import Signup from './components/signup'
import Chatbot from './components/chatbot'
import Support from './components/support'
import VerifyCode from './components/verifycode'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // instale la libreria framer-motion para cuando cambio de pagina haya una animacion de salida y entrada

interface User {
  name: string;
  email: string;
}
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [verifyEmail, setVerifyEmail] = useState<string>("");
  const [page, setPage] = useState<
    "landing" | "signin" | "signup" | "home" | "verify" |"chatbot" | "support">("landing");

  // 💡 Si ya hay un usuario, mostramos la página correspondiente
  return (
      //el mode wait esperá a que termine la animación de SALIDA antes de mostrar la nueva página.
    <AnimatePresence mode="wait">
      <motion.div 
        key={page} // sin keypage no se anima nada, porque cada vez que cambie la página, trata esto como un componente nuevo
        initial={{ opacity: 0}} // como arranca la pagina cuando aparece
        animate={{ opacity: 1}} //como debe verse cuando está visible
        exit={{ opacity: 0}} // como desaparece la pagina cuando cambio de pantalla
        transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
      >
        {user ? ( // si user es verdadero muestra las paginas privadas
          (() => {
            switch (page) {
              case "home":
                return <Home user={user} setUser={setUser} setPage={setPage} />; // si setpage es home retorna Home, usa set user porque necesita cerrar sesion
              case "chatbot":
                return <Chatbot user={user} setUser={setUser} setPage={setPage} />; // si setpage es chatbot retorna Chatbot, usa set user porque necesita cerrar sesion
              case "support":
                return <Support setPage={setPage} />; // si setpage es support retorna support, no usa set user
              default:
                return <Home user={user} setUser={setUser} setPage={setPage} />; // si page no coincide con ninguno de los casos anteriores retorna home
            }
          })()
        ) : ( // si user es falso muestra las paginas publicas
          (() => {
            switch (page) {
              case "signup":
                return <Signup setUser={setUser} setPage={setPage} setVerifyEmail={setVerifyEmail} />; // si setpage es signup retorna Signup, usa set user porque necesita validar el usuario
              case "signin":
                return <Signin setUser={setUser} setPage={setPage} />; // si setpage es signin retorna Signin, usa set user porque necesita crear el usuario
                case "verify":
                return <VerifyCode email={verifyEmail} setPage={setPage} />;
                default:
                return <Landing setPage={setPage} />; // si page no coincide con ninguno de los casos anteriores retorna landing, no usa set user
            }
          })()
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
