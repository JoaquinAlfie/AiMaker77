import "../assets/styles/style-signup.css";
import React, { useState } from "react";
import { registerUser } from "../api/auth";

interface SignupProps {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<"landing" | "signin" | "signup" | "home">>;
}

function Signup({ setPage }: SignupProps) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !lastName || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await registerUser({
        name,
        last_name: lastName,
        email,
        password,
      });

      console.log("Respuesta registro:", res);

      if (res.code === "error" || res.error) {
        setError(res.message || res.error);
      } else {
        alert("Usuario creado con éxito. Ahora puedes iniciar sesión.");
        setPage("signin");
      }
    } catch {
      setError("Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
};
return (
    <form className="registrodesesion" onSubmit = {handleRegister}>
        <header className="cabezita">
            <a className="volver" onClick={() => setPage("landing")}> 
                <img src="/img/Logox4.png" alt="Logo"style={{ width: "95px", height: "83.64px" }}/>
            </a>
        </header>
        <main className="maineo">
            <h1 className="titlee">Welcome to Ai Maker</h1>
            <div className="registreo">
                <p className="signup">Sign Up</p>
                <section className="nombre">
                    <input type="text" id="nombre1" name="nombre" placeholder="Name" maxLength={22} value= {name} onChange={(e) => setName(e.target.value)} />
                </section>
                <section className="apellido">
                    <input type="text" id="apellido1" name="apellido" placeholder="Last Name" maxLength={22} value= {lastName} onChange={(e) => setLastName(e.target.value)} />
                </section>
                 <section className="correo">
                    <input type="text" id="correo1" name="correo" placeholder="Email" maxLength={34} value= {email} onChange={(e) => setEmail(e.target.value)} />
                 </section>
                 <section className="contraseña">
                    <input type="text" id="contraseña1" name="contraseña" placeholder="Password" maxLength={26} value= {password} onChange={(e) => setPassword(e.target.value)} />
                    <a id="ocultar2">
                        <img src="img/invisible27.png" alt="invisible" style={{width: "27px", height: "27px"}}/>
                    </a>
                 </section>
                 <section className="enter1">
                    <button className="register1" type="submit">
                        { loading ? "Loading..." : "Register"}
                    </button>
                 </section>
                 <section className="ifyoulogin">
                    <div className="ifyou">
                        If you already have an account, you can
                    </div>
                    <a className="login1" onClick={() => setPage("signin")}>
                        Login Here ! 
                    </a>
                 </section>
            </div>
        </main>
        {error && <p className="obligatorios">{error}</p> }
    </form>
);
}

export default Signup;