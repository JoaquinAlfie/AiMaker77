import "../assets/styles/style-chatbot.css"

function Chatbot ()  {
 return (
    <div className='lacasa'>
        <div className='icons'>
            <section className="iconizqitems">
                <a className="volver" >
                    <img src="img/logochico.png" alt="Logo"  style= {{width: "57.97px" , height: "51.04px"}} />
                </a>
                <button className="barralat">
                    <img src="img/barralat.png" alt="Barra Lateral" style={{width: "55px" , height: "55px"}}/>
                </button>
            </section>
            <section className="iconsitems">
                <div className="centericons">
                    <a className="supportchatbot" style={{margin: 0,}}>
                        <img src="img/Sparkle.png" alt="Rocket" style={{width: "34px" , height: "34px"}}/>
                        Support AI MAKER
                    </a>
                </div>
                <div className="righticons">
                    <button className="userchatbot">
                        <img src="img/user50.png" alt="user" style={{width: "50px" , height: "50px"}}/>
                    </button>
                </div>
            </section>
        </div>
        <div className="chat-controls">
            <button className="newchat">
                <div className="mas">
                    <img src="img/mas.png" alt="nuevo chat" style={{width: "17px" , height: "17px"}}/>
                </div>
                <div className="nuevochat">
                    New Chat
                </div>
            </button>
            <button className="searchchat">
                <div className="pens">
                    <img src="img/pens.png" alt="pensamiento" style={{width: "27px" , height: "27px"}}/>
                </div>
                <div className="buscarchat">
                    Search Chat
                </div>
            </button>
        </div>
        <div className="contenedor">
            <section className="chats">
                <div className="chatis">
                    CHATS
                </div>
            </section>
            <main className="mainchatbot">
                <h1 className="titulochatbot">
                    Creá, entrená, optimizá.
                    ¿Por dónde empezamos?
                </h1>
                <section className="accioneschatbot">
                    <textarea  className="chatbox" name="tipear" placeholder="Message AI Maker..."></textarea>
                    <button className="enterchatbot">
                        <img src="img/Button Icon.png" alt="enter" style={{width: "40px" , height: "40px"}}/>
                    </button>
                </section>
            </main>
        </div>
    </div>
    );
}
export default Chatbot;