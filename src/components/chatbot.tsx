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

function Chatbot({ setPage }: ChatbotProps) {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar todos los chats al montar
  useEffect(() => {
    (async () => {
      const all = await getAllChats();
      setChats(all);
    })();
  }, []);

  // 🔹 Cargar mensajes del chat activo
  useEffect(() => {
    if (!activeChat) return;
    (async () => {
      const msgs = await getMessages(activeChat);
      setMessages(msgs);
    })();
  }, [activeChat]);

  // 🔹 Crear nuevo chat
  const handleNewChat = async () => {
    const newChat = await createChat("Nuevo Chat");
    if (newChat) {
      const all = await getAllChats();
      setChats(all);
      const last = all.slice(-1)[0];
      if (last) setActiveChat(last._id || last.id);
    }
  };

  // 🔹 Seleccionar un chat
  const handleActiveChat = async (chatId: string) => {
    setActiveChat(chatId);
    const msgs = await getMessages(chatId);
    setMessages(msgs);
  };

  // 🔹 Enviar mensaje
  const handleSend = async () => {
    if (!message.trim()) return alert("Escribí un mensaje antes de enviar.");
    setLoading(true);
    try {
      let chatId = activeChat;

      // Crear chat si no hay uno activo
      if (!chatId) {
        const newChat = await createChat("Nuevo Chat");
        if (!newChat) throw new Error("No se pudo crear el chat");
        const all = await getAllChats();
        setChats(all);
        const last = all.slice(-1)[0];
        chatId = last._id || last.id;
        setActiveChat(chatId);
      }

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

  return (
    <div className="lacasa">
      <div className="icons">
        <section className="iconizqitems">
          <a className="volver" onClick={() => setPage("home")}>
            <img src="img/logochico.png" alt="Logo" width={58} height={51} />
          </a>
          <button className="barralat">
            <img src="img/barralat.png" alt="Barra Lateral" width={55} height={55} />
          </button>
        </section>

        <section className="iconsitems">
          <div className="centericons">
            <a className="supportchatbot" onClick={() => setPage("support")}>
              <img src="img/Sparkle.png" alt="Rocket" width={34} height={34} />
              Support AI MAKER
            </a>
          </div>
          <div className="righticons">
            <button className="userchatbot">
              <img src="img/user50.png" alt="user" width={50} height={50} />
            </button>
          </div>
        </section>
      </div>

      <div className="chat-controls">
        <button className="newchat" onClick={handleNewChat}>
          <div className="mas">
            <img src="img/mas.png" alt="nuevo chat" width={17} height={17} />
          </div>
          <div className="nuevochat">New Chat</div>
        </button>
      </div>

      <div className="contenedor">
        <section className="chats">
          <div className="chatis">CHATS</div>
          {chats.map((chat) => (
            <div
              key={chat._id || chat.id}
              className={`chat-item ${activeChat === (chat._id || chat.id) ? "active" : ""}`}
              onClick={() => handleActiveChat(chat._id || chat.id)}
            >
              {chat.name || "Chat sin nombre"}
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
            <button className="enterchatbot" onClick={handleSend}>
              {loading ? "..." : (
                <img src="img/Button Icon.png" alt="enter" width={40} height={40} />
              )}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Chatbot;