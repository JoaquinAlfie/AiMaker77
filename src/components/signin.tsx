import React, { useState } from "react";
import "../assets/styles/style-signin.css";
import { loginUser } from "../api/auth";

interface SigninProps {
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string } | null>>;
  setPage: React.Dispatch<React.SetStateAction<"landing" | "signin" | "signup" | "home"| "chatbot" |"verify" | "support">>;
}

function Signin({ setUser, setPage }: SigninProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(email, password);

      console.log("Respuesta login:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        setUser({ name: res.user.name, email: res.user.email });
        setPage("home");
      } else {
        setError(res.message || res.error || "Credenciales inválidas");
      }
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };
    
    return (
    <div className="iniciodesesion">
        <header className="cabezita">
            <a className="volver" onClick={() => setPage("landing")}> 
                <img src="/img/Logox4.png" alt="Logo"style={{ width: "95px", height: "83.64px" }}/>
            </a>
        </header>
        <main className="maineo">
            <h1 className="titlee">Welcome to Ai Maker</h1>
            <div className="logueo">
                <p className="signin">Sign in</p>
                <section className="usuario">
                    <input id="usuario1" name="usuario" placeholder="Enter email or user name" maxLength={34} value={email} onChange={(e)=> setEmail (e.target.value)}/>
                </section>
                <section className="contra">
                    <input id="contra1" name="contraseña" placeholder="Password" maxLength={28} type={showPassword ? "text" : "password"} value={password} onChange={(e)=> setPassword (e.target.value)}/>
                    <a id="ocultar" onClick={(e) => { 
                      e.preventDefault(); 
                      setShowPassword(!showPassword); 
                      }}>
                        <img src="/img/invisible.png" alt="invisible" style={{ width: "34px", height: "34px" }}/>
                    </a>
                </section>
                <section className="enter">
                    <button className="login" type="button" onClick={handleLogin}>
                        { loading ? "Loading..." : "Login"}
                    </button>
                </section>
                <section className="ifyouregister">
                    <div className="ifyou">
                        If you don’t have an account, you can
                    </div>
                    <a className="register" onClick={() => setPage("signup")}>
                    Register Here!
                    </a>
                </section>
                {error && <p className="obligatorios2">{error}</p>}
            </div>
        </main>
    </div>
  );
}

export default Signin;