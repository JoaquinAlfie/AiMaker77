import "../assets/styles/style-signin.css"

function Signin() {
  return (
    <div className="iniciodesesion">
        <header className="cabezita">
            <a className="volver" href="/index.html"> 
                <img src="/img/Logox4.png" alt="Logo"style={{ width: "95px", height: "83.64px" }}/>
            </a>
        </header>
        <main className="maineo">
            <h1 className="titlee">Welcome to Ai Maker</h1>
            <div className="logueo">
                <p className="signin">Sign in</p>
                <section className="usuario">
                    <input id="usuario1" name="user" placeholder="Enter email or user name" maxLength={34}/>
                </section>
                <section className="contra">
                    <input id="contra1" name="contraseña" placeholder="Password" maxLength={28}/>
                    <button id="ocultar" type="button">
                        <img src="/img/invisible.png" alt="invisible" style={{ width: "34px", height: "34px" }}/>
                    </button>
                </section>
                <section className="enter">
                    <button className="login" type="button">
                    Login
                    </button>
                </section>
                <section className="ifyouregister">
                    <div className="ifyou">
                        If you don’t have an account, you can
                    </div>
                    <a className="register">
                    Register Here!
                    </a>
                </section>
            </div>
        </main>
    </div>
  );
}

export default Signin;