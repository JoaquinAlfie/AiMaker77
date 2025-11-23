import React, { useState } from "react";
import { verifyCode } from "../api/auth";
import "../assets/styles/verifycode.css";
interface VerifyProps {
  email: string;
  setPage: React.Dispatch<React.SetStateAction<"landing" | "signin" | "signup" | "home" | "chatbot" |"verify" | "support">>;
}

function VerifyCode({ email, setPage }: VerifyProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      setError("Ingresá el código de verificación.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await verifyCode(email, code);
      console.log("Respuesta verificación:", res);

      if (res.code === "OK") {
        alert("Cuenta verificada con éxito. Ahora podés iniciar sesión.");
        setPage("signin");
      } else {
        setError(res.message || "Código incorrecto.");
      }
    } catch {
      setError("Error al verificar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2 className="tituloverifycode">Verificación de cuenta</h2>
      <p className="sehaenviado">Se ha enviado un código a tu correo: {email}</p>
      <input type="text" placeholder="Código de verificación" className="inputverify" value={code} onChange={(e) => setCode(e.target.value)} />
      <button className="verificarcode" onClick={handleVerify}>{loading ? "Verificando..." : "Verificar"}</button>
      {error && <p className="obligatorios">{error}</p>}
    </div>
  );
}

export default VerifyCode;