import "../assets/styles/style-support.css"

interface SupportProps {
  setPage: React.Dispatch<
    React.SetStateAction<
      "landing" | "signin" | "signup" | "home" | "chatbot" |"verify" | "support"
    >
  >;
}

function Support({ setPage }: SupportProps) {
    return (
        <div className='cuerposupport'>
            <div className="navbar">
                <a className="logo" onClick={() => setPage("home")}>
                    <img src="img/Logox4.png" alt="Logo" style={{width: "95px" , height: "83.64px"}}/>
                </a>
            </div>
            <main className="mainsupport">
                <section className="belo">
                    <img src="img/belo.png" alt="Logo" className="lbelo" style={{width: "230px" , height: "128px"}}/>
                    <div className="apoyabelo">
                        Apoyanos con Belo
                    </div>
                    <a className="donarbelo" href="https://pay.belo.app/error/expired-link" target="_blank"> Donar con Belo </a>
                </section>
                <section className="mercadopago">
                    <img src="img/mp.png" alt="Logo" className="lmp" style={{width: "315px" , height: "82px"}}/>
                    <div className="apoyamp">
                        Apoyanos con MP
                    </div>
                    <a className="donarmp" href="https://link.mercadopago.com.ar/aimaker" target="_blank">Donar con MP</a>
                </section>
                <section className="paypal">
                    <img src="img/pp.png" alt="Logo" className="lpp" style={{width: "294px" , height: "78px"}}/>
                    <div className="apoyapp">
                        Apoyanos con PayPal
                    </div>
                    <a className="donarpp" href="https://www.paypal.com/paypalme/AiMaker2025" target="_blank">Donar con PayPal</a>
                </section>
            </main>
        </div>    
    );
}

export default Support;