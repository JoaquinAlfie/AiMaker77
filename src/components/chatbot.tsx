import "../assets/styles/style-chatbot.css";
import React, { useEffect, useState } from "react";
import { getAllChats, createChat, getMessages, sendMessage} from "../api/chat";

type ChatbotProps = {
  user: string;
  setPage: React.Dispatch<
    React.SetStateAction<
      "landing" | "signin" | "signup" | "home" | "chatbot" | "support"
    >
  >;
};

function Chatbot({setPage }: ChatbotProps) {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar todos los chats del usuario
  useEffect(() => {
    (async () => {
      const res = await getAllChats();
      console.log("🔹 chats cargados:", res); // broo
      if (!res.error) {
        setChats(Array.isArray(res) ? res : res.chats || []);  }
    })();
  }, []);

  // Cargar mensajes del chat seleccionado
useEffect(() => {
  if (!activeChat) return;

  (async () => {
    try {
      console.log("🔹 Request a getMessages con chatId:", activeChat);
      const res = await getMessages(String(activeChat));
      console.log("🔹 Respuesta de getMessages:", res);

      if (res.error) {
        console.error("Error al obtener mensajes del chat:", res.error);
        setMessages([]);
      } else {
        setMessages(Array.isArray(res) ? res : res.messages || []);
      }
    } catch (err) {
      console.error("❌ Error inesperado al obtener mensajes:", err);
      setMessages([]);
    }
  })();
}, [activeChat]);


  const handleNewChat = async () => {
  await createChat("Nuevo Chat");   // crea el chat en backend
  const allChats = await getAllChats();  // recarga todos
  setChats(allChats.chats || allChats);
  const lastChat = (allChats.chats || allChats).slice(-1)[0];
  if (lastChat) setActiveChat(lastChat.id);
  };

  const handleActiveChat = async (chatId: string) => {
     console.log("Seleccionaste chat:", chatId); // anda?
    setActiveChat(chatId);
    const msgs = await getMessages(String(chatId));
    console.log("🔹 Respuesta de getMessages:", msgs); // br brr patapin
    setMessages(Array.isArray(msgs) ? msgs : msgs.messages || []);
  };

  const handleSend = async () => {
  if (!activeChat) return alert("Seleccioná o creá un chat primero.");
  if (!message.trim()) return alert("Escribí un mensaje antes de enviar.");

  setLoading(true);
  try {
    const res = await sendMessage(activeChat, message); // <-- message pasa como content
    console.log("Mensaje enviado:", res);

    if (res) {
      // Actualizamos la UI inmediatamente con el mensaje del usuario
      setMessages([...messages, { sender_type: "user", text: message }]);
      setMessage(""); // limpiamos el textarea
    }
  } catch (err) {
    console.error("Error enviando mensaje:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="lacasa">
      <div className="icons">
        <section className="iconizqitems">
          <a className="volver" onClick={() => setPage("home")}>
            <img
              src="img/logochico.png"
              alt="Logo"
              style={{ width: "57.97px", height: "51.04px" }}
            />
          </a>
          <button className="barralat">
            <img
              src="img/barralat.png"
              alt="Barra Lateral"
              style={{ width: "55px", height: "55px" }}
            />
          </button>
        </section>
        <section className="iconsitems">
          <div className="centericons">
            <a
              className="supportchatbot"
              style={{ margin: 0 }}
              onClick={() => setPage("support")}
            >
              <img
                src="img/Sparkle.png"
                alt="Rocket"
                style={{ width: "34px", height: "34px" }}
              />
              Support AI MAKER
            </a>
          </div>
          <div className="righticons">
            <button className="userchatbot">
              <img
                src="img/user50.png"
                alt="user"
                style={{ width: "50px", height: "50px" }}
              />
            </button>
          </div>
        </section>
      </div>

      <div className="chat-controls">
        <button className="newchat" onClick={handleNewChat}>
          <div className="mas">
            <img src="img/mas.png" alt="nuevo chat" style={{ width: "17px", height: "17px" }} />
          </div>
          <div className="nuevochat">New Chat</div>
        </button>
      </div>

      <div className="contenedor">
        <section className="chats">
          <div className="chatis">CHATS</div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
              onClick={() => handleActiveChat(chat.id)}
            >
              {chat.name}
            </div>
          ))}
        </section>

        <main className="mainchatbot">
          <h1 className="titulochatbot">
            {activeChat
              ? `Chat activo: ${activeChat}`
              : "Creá, entrená, optimizá. ¿Por dónde empezamos?"}
          </h1>

          <div className="mensajes">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender_type}`}>
                <b>{msg.sender_type}:</b> {msg.text}
              </div>
            ))}
          </div>

          <section className="accioneschatbot">
            <textarea
              className="chatbox"
              placeholder="Message AI Maker..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="enterchatbot" onClick={handleSend} >
              {loading ? (
                "..."
              ) : (
                <img src="img/Button Icon.png" alt="enter" style={{ width: "40px", height: "40px" }} />
              )}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Chatbot;
