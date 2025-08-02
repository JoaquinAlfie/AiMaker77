import "../assets/styles/style-home.css"

function Home() {
  return (
    <div className='casa'>
      <header className="navbar">
        <img src="/img/Logox4.png" alt="Logo" className="logo" />
        <section className="nav-items">
          <a className="support" href="support.html">
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
          <a className="btn-get-started" href="chatbot.html">
            <img
              src="/img/rocketlaunch.png"
              alt="Rocket"
              style={{ width: "32px", height: "32px" }}
            />
            Get Started
          </a>
          <button className="btn-como-funciona">¿Cómo Funciona?</button>
        </section>
      </main>
    </div>
  );
}

export default Home;