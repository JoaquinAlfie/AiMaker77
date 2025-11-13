import "../assets/styles/style-chatbot.css";
import React, { useEffect, useState, useRef } from "react";
import { getAllChats, createChat, getMessages, sendMessage} from "../api/chat";

type ChatbotProps = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<
    React.SetStateAction<
      "landing" | "signin" | "signup" | "home" | "chatbot" | "support"
    >
  >;
};

function Chatbot({setPage, user, setUser }: ChatbotProps) {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  
  // Cargar todos los chats del usuario
  useEffect(() => {
    (async () => {
      const res = await getAllChats(); 
      console.log("🔹 chats cargados:", res); // broo 
       if (!res.error) { 
        setChats(Array.isArray(res) ? res : res.chats || []); 
      } })(); 
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
  console.log("🔹 handleSend ejecutado"); 
  if (!message.trim()) return alert("Escribí un mensaje antes de enviar.");
  setLoading(true);

  try {
    let chatId = activeChat;

    // Crear chat si no hay activo
    if (!chatId) {
      const newChat = await createChat("Nuevo Chat");
      if (newChat && !newChat.error) {
        const allChats = await getAllChats();
        setChats(allChats.chats || allChats);
        const lastChat = (allChats.chats || allChats).slice(-1)[0];
        chatId = lastChat.id;
        setActiveChat(chatId);
      } else {
        alert("Error al crear el chat.");
        setLoading(false);
        return;
      }
    }

    // Ahora sí mandamos el mensaje al chat correcto
    const res = await sendMessage(chatId!, message);
    if (res) {
      setMessages([...messages, { sender_type: "user", text: message }]);
      setMessage("");
    }
  } catch (err) {
    console.error("❌ Error al enviar mensaje:", err);
  } finally {
    setLoading(false);
  }
};
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

    const handleLogout = () => {
    localStorage.removeItem("token");
    setUser("");
    setPage("landing");
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
            <div className="user-menu2">
            <button className="userchatbot" onClick={() => setMenuOpen((prev) => !prev)}>
              <img
                src="img/user50.png"
                alt="user"
                style={{ width: "50px", height: "50px" }}
              />
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <a className="dropdown-item">
                  <img src="/img/usergris.png" alt="mail" width="18" />
                  {user}
                </a>
                <a className="dropdown-item2" onClick={handleLogout}>
                  <img src="/img/cerrar.png" alt="logout" width="18" />
                  Cerrar Sesión
                </a>
              </div>
            )}
            </div>
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
