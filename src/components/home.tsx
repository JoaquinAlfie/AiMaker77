import "../assets/styles/style-home.css"

type HomeProps = {
  user: string;
  setPage: React.Dispatch<
    React.SetStateAction<"landing" | "signin" | "signup" | "home" | "chatbot" | "support">
  >;
};

function Home({ user, setPage }: HomeProps) {
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
          <button className="contacto">Contacto</button>
          <button className="user">
            <img
              src="/img/user50.png"
              alt="user"
              style={{ width: "50px", height: "50px" }}
            />
          </button>
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