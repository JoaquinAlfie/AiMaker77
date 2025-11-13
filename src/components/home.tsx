import "../assets/styles/style-home.css"
import React, { useState, useEffect, useRef } from "react";

type HomeProps = {
  user: string;
  setPage: React.Dispatch<
    React.SetStateAction<"landing" | "signin" | "signup" | "home" | "chatbot" | "support">
  >;
};

function Home({ user, setPage }: HomeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className='casa'>
      <header className="navbar">
        <img src="/img/Logox4.png" alt="Logo" className="logo" />
        <section className="nav-items">
          <a className="support" onClick={() => setPage("support")}>
            <img
              src="/img/Sparkle.png"
              alt="Rocket"
              style={{ width: "34px", height: "34px" }}
            />
            Support AI MAKER
          </a>
          <a className="contacto" href="https://mail.google.com/mail/?view=cm&fs=1&to=ai.maker.empresa@gmail.com&su=Consulta%20sobre%20AI%20Maker&body=Hola,%20quería%20hacer%20una%20consulta%20sobre%20su%20plataforma." target="_blank">Contacto</a>
          <div className="user-menu" ref={menuRef}>
          <button className="user" onClick={() => setMenuOpen((prev) => !prev)}>
            <img
              src="/img/user50.png"
              alt="user"
              style={{ width: "50px", height: "50px" }}
            />
          </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ai.maker.empresa@gmail.com" target="_blank" className="dropdown-item">
                  <img src="/img/user50.png" alt="mail" width="18" />
                  Mail
                </a>
                <a className="dropdown-item2" onClick={() => setPage("signin")}>
                  <img src="/img/cerrar.png" alt="logout" width="18" />
                  Cerrar Sesión
                </a>
              </div>
            )}
          </div>
        </section>
      </header>

      <main className="main">
        <h1 className="titulo">CREA TUS MODELOS IA</h1>
        <p className="subtitulo">
          Entrená modelos de inteligencia artificial con tus propios datos, sin
          necesidad de programar ni tener experiencia previa.
        </p>
        <section className="acciones">
          <a className="btn-get-started" onClick={() => setPage("chatbot")}>
            <img
              src="/img/RocketLaunch.png"
              alt="Rocket"
              style={{ width: "32px", height: "32px" }}
            />
            Get Started
          </a>
          <button className="btn-como-funciona">¿Cómo Funciona?</button>
        </section>
        <section className="holapibe">
          <div className="bienvenido">Bienvenido, </div>
          <div className="pibe">{user}</div>
        </section>
      </main>
    </div>
  );
}

export default Home;