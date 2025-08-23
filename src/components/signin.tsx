import "../assets/styles/style-signin.css"

function Signin() {
  return (
    <div className="iniciodesesion">
        <header className="cabezita">
            <a className="volver" href="/index.html"> 
                <img src="/img/Logox4.png" alt="Logo"style={{ width: "95px", height: "83.64px" }}/>
            </a>
        </header>
        <main className="main">
            <h1 className="titulo">Welcome to Ai Maker</h1>
            <div className="logueo">
                <p className="signin">Sign in</p>
                <section className="usuario">
                    <input id="mail" name="user" placeholder="Enter email or user name" maxLength={34}/>
                </section>
                <section className="contra">
                    <input id="password" name="contraseña" placeholder="Password" maxLength={28}/>
                    <button id="ocultar" type="button">
                        <img src="/img/invisible.png" alt="invisible" style={{ width: "34px", height: "34px" }}/>
                    </button>
                </section>
                <section className="enter">
                    <a className="login" href="/home.html">
                    Login
                    </a>
                </section>
                <section className="ifyouregister">
                    <div className="ifyou">
                        If you don’t have an account, you can
                    </div>
                    <a className="Register" href="/signup.html">
                    Register Here!
                    </a>
                </section>
            </div>
        </main>
    </div>
  );
}

export default Signin;