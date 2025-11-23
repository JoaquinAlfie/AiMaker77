import "../assets/styles/style.css"

interface LandingProps {
  setPage: React.Dispatch<React.SetStateAction<"landing" | "signin" | "signup" | "home"| "chatbot" |"verify" | "support">>;
}

function Landing({ setPage }: LandingProps) {
  return (
    <div className='cuerpo'>
      <header className="navbar">
        <img src="/img/Logox4.png" alt="Logo" className="logo" />
        <section className="nav-items">
          <a className="contacto" href="https://mail.google.com/mail/?view=cm&fs=1&to=ai.maker.empresa@gmail.com&su=Consulta%20sobre%20AI%20Maker&body=Hola,%20quería%20hacer%20una%20consulta%20sobre%20su%20plataforma." target="_blank">Contacto</a>
          <a className="btn-login" onClick={() => setPage("signin")}>Iniciar Sesión</a>
          <a className="btn-register" onClick={() => setPage("signup")}>Registrate</a>
        </section>
      </header>

      <main className="main">
        <h1 className="titulo">CREA TUS MODELOS IA</h1>
        <p className="subtitulo">
          Entrená modelos de inteligencia artificial con tus propios datos, sin necesidad de programar ni tener experiencia previa.
        </p>
        <section className="acciones">
          <a className="btn-get-started" onClick={() => setPage("signup")}>
            <img src="/img/RocketLaunch.png" alt="Rocket" style={{ width: 32, height: 32 }} />
            Get Started
          </a>
          <button className="btn-como-funciona">¿Cómo Funciona?</button>
        </section>
      </main>
    </div>
  );
}

export default Landing;