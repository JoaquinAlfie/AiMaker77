import "../assets/styles/style-signup.css"
import React, { useState } from "react";
import { registerUser, verifyUserCode } from "../api/auth";

interface SignupProps {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<"landing" | "signin" | "signup" | "home">>;
}

function Signup({ setUser, setPage }: SignupProps) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !lastName || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await registerUser({ name, last_name: lastName, email, password });
      console.log(res); //prueba backend
      if (res.error) setError(res.error);
      else {
        setNeedsVerification(true); 
         if (res.code) //prueba
            setCode(res.code); //prueba
        alert(`Código de verificación (solo dev): ${res.code}`);//prueba backend
      }
    } catch {
      setError("Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code) return setError("Ingresa el código de verificación.");
    setLoading(true);
    setError("");
    try {
      const res = await verifyUserCode(email, code);
      if (res.error) setError(res.error);
      else {
        alert("Usuario verificado correctamente. Ahora puedes iniciar sesión.");
        setPage("signin");
      }
    } catch {
      setError("Error al verificar usuario.");
    } finally {
      setLoading(false);
    }
  };

  if (needsVerification) {
    return (
      <div className="registrodesesion">
        <h2>Ingresa el código de verificación enviado a {email}</h2>
        <input
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleVerify}>{loading ? "Verificando..." : "Verificar"}</button>
        {error && <p>{error}</p>}
      </div>
    );
  }
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
                    <a className="login1">
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