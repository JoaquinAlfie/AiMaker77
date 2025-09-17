import "../assets/styles/style-signup.css"

function Signup () {
return (
    <div className="registrodesesion">
        <header className="cabezita">
            <a className="volver" href="/index.html"> 
                <img src="/img/Logox4.png" alt="Logo"style={{ width: "95px", height: "83.64px" }}/>
            </a>
        </header>
        <main className="maineo">
            <h1 className="titlee">Welcome to Ai Maker</h1>
            <div className="registreo">
                <p className="signup">Sign Up</p>
                <section className="email">
                    <input id="mail1" name="mail" placeholder="Enter email" maxLength={34}/>
                </section>
                <section className="usuario1">
                    <input type="text" id="user" name="user" placeholder="Create User Name" maxLength={22}/>
                </section>
                 <section className="contra1">
                    <input id="password1" name="contraseña" placeholder="Password" maxLength={28}/>
                    <button id="ocultar" type="button">
                        <img src="/img/invisible.png" alt="invisible" style={{ width: "27px", height: "27px" }}/>
                    </button>
                 </section>
                 <section className="confirmcontra">
                    <input id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" maxLength={28}/>
                    <button id="ocultar2">
                        <img src="img/invisible27.png" alt="invisible" style={{width: "27px", height: "27px"}}/>
                    </button>
                 </section>
                 <section className="enter1">
                    <a className="register1">
                        Register
                    </a>
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
    </div>
);
}

export default Signup;