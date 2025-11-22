import "../assets/styles/style-chatbot.css";
import React, { useEffect, useState, useRef } from "react";
import { getAllChats, createChat, getMessages, sendMessage} from "../api/chat";

type ChatbotProps = { //Define qué propiedades recibe el componente
  user: string; //nombre del usuario actual
  setUser: React.Dispatch<React.SetStateAction<string>>; //función para actualizar el usuario (por ejemplo al cerrar sesión)
  setPage: React.Dispatch< //función para cambiar la página que se muestra
    React.SetStateAction<
      "landing" | "signin" | "signup" | "home" | "chatbot" | "support"
    >
  >;
};

function Chatbot({setPage, user, setUser }: ChatbotProps) {
  const [chats, setChats] = useState<any[]>([]); //estado que guarda todos los chats del usuario. tipo: any[], es un arreglo de objetos(cada objeto representa un chat). Valor inicial: [], vacío, porque al principio no hay chats cargados. Se actualiza con setChats(...) cuando traés los chats del backend. Se usa para mostrar la lista de chats en la interfaz.
  const [activeChat, setActiveChat] = useState<string | null>(null); //es el ID del chat que está activo o seleccionado actualmente. puede ser un string (el ID) o null si no hay chat activo. Cuando el usuario hace clic en un chat, se actualiza con setActiveChat(id). Se usa para cargar los mensajes del chat activo y destacar el chat en la lista.
  const [messages, setMessages] = useState<any[]>([]); // guarda todos los mensajes del chat activo. any[] → arreglo de objetos, cada objeto es un mensaje { sender_type: "user" | "ai", text: "..." }. Valor inicial: [] - vacío, porque al inicio no hay mensajes cargados. Se actualiza con setMessages(...) cada vez que se selecciona un chat o se envía un mensaje. Se usa para renderizar los mensajes en la pantalla.
  const [message, setMessage] = useState(""); // guarda el texto que el usuario está escribiendo en la caja de chat. Tipo: string → siempre un texto. Valor inicial: "" -vacío al inicio. Se actualiza con setMessage(...) cada vez que el usuario escribe en el textarea. Se usa al enviar el mensaje para mandarlo al backend y luego limpiar la caja de texto.
  const [loading, setLoading] = useState(false); // indica si está cargando algo, por ejemplo, enviando un mensaje. Tipo: boolean → true o false. Valor inicial: false- al inicio no está cargando nada. Se pone true cuando se llama a handleSend y se envía un mensaje. Se pone false cuando termina de enviarlo (en finally). Sirve para mostrar un spinner o indicador de carga mientras el mensaje se envía.
  const [menuOpen, setMenuOpen] = useState(false); // controla si el menú del usuario está abierto o cerrado. Tipo: boolean → true o false. Valor inicial: false - menú cerrado al inicio. Se pone true al hacer clic en el botón del usuario. Se pone false al hacer clic afuera del menú (detectado con menuRef). Sirve para mostrar u ocultar el menú desplegable.
  const menuRef = useRef<HTMLDivElement>(null); // crea una referencia (menuRef) que puede apuntar a un elemento HTML. le digo: Este menuRef va a apuntar a un <div> (HTMLDivElement). Inicializarla en null, porque al principio el div todavía no existe en la página (no se ha renderizado). Usarla más adelante con ref={menuRef} para poder acceder directamente a ese div desde el código.
  const [modelInfo, setModelInfo] = useState<any | null>(null); //prueba

  
  // Cargar todos los chats del usuario
  useEffect(() => { //Este useEffect solo se ejecuta al cargar el componente Chatbot, por eso [] al final
    (async () => {
      const res = await getAllChats(); // llama a getAllChats(), trae todos los chats desde el backend.
      console.log("🔹 chats cargados:", res); // broo 
       if (!res.error) { 
        setChats(Array.isArray(res) ? res : res.chats || []); //si res es un array, lo usa; si no, usa res.chats; y si nada de eso existe, usa un array vacío
      } })(); 
    }, []);

  // Cargar mensajes del chat seleccionado
useEffect(() => { //define un efecto que React ejecuta después de que chatbot se renderiza. Se ejecutará cada vez que cambie alguna variable del array de dependencias ([activeChat]
  if (!activeChat) return; // si activeChat es null o undefined (o vacio), !activeChat será true y el return detiene la ejecucion del useEffect
  (async () => {
    try {
      console.log("🔹 Request a getMessages con chatId:", activeChat);
      const res = await getMessages(String(activeChat)); //llama a la funcion getMessages del backend pasando el id del chat activo. String(activeChat) asegura que el ID sea un string.
      console.log("🔹 Respuesta de getMessages:", res);

      if (res.error) { // si la respuesta tiene un error (res.error existe), se vacia el estado messages para que no muestre nada
        console.error("Error al obtener mensajes del chat:", res.error);
        setMessages([]);
      } else {
        setMessages(res.messages || res || []); //si res es un array, lo usa, si no, usa res.chats; y si nada de eso existe, usa un array vacío
      }
    } catch (err) {
      console.error("Error inesperado al obtener mensajes:", err);
      setMessages([]);
    } 
  })();
}, [activeChat]); // El useEffect se ejecuta cada vez que cambia activeChat

// declara la funcion handleNewChat
  const handleNewChat = async () => {
  await createChat("Chat");   // llama a la función createChat del archivo chat.ts y le pasa "chat"
  const allChats = await getAllChats();  // Llama a la función getAllChats() para obtener la lista actualizada de todos los chats del usuario desde el backend. Guarda la lista en la variable allChats. Esto “recarga los chats” porque ahora tengo la lista completa, incluyendo el chat que acabo de crear.
  setChats([...(allChats.chats || allChats)].reverse()); //Si allChats tiene una propiedad chats usa eso, si no usa allChats directamente (si ya es un array) crea una copia y luego la da vuelta, sin modificar el array original.
  const lastChat = (allChats.chats || allChats).slice(-1)[0]; //Toma la última posición del array de chats, es decir, el chat que acabamos de crear. slice(-1)[0] devuelve el último elemento del array. Guardamos ese chat en lastChat para poder seleccionarlo como activo.
  if (lastChat) setActiveChat(lastChat.id); // Si existe un lastChat (por seguridad, para no tirar error si no hay chats), actualizamos el estado activeChat.
 };

 // // declara la funcion handleActiveChat
const handleActiveChat = async (chatId: string) => {
  console.log("Seleccionaste chat:", chatId);
  setActiveChat(chatId);

  try {
    const response = await getMessages(String(chatId)); // renombré a response
    console.log("🔹 Respuesta de getMessages:", response);
    setMessages(response); // ahora sí usamos la propiedad correcta //prueba 1
  } catch (err) {
    console.error("Error al obtener mensajes del chat:", err);
    setMessages([]);
  }
};
//declara  la funcion handleSend
  const handleSend = async () => 
  {
    //messages - Varible que se define en el front la cual es igual al texto ingresado
    //
    console.log("ACTIVE CHAT INICIAL:", activeChat);
    console.log("handleSend ejecutando..."); 
    if (!message.trim()) return alert("Escribí un mensaje antes de enviar."); // verifica que el mensaje no esté vacío ni tenga solo espacios.
     // --- AGREGAR MENSAJE DEL USER AL INSTANTE ---
  const userMessageText = message; 
  setMessages(prev => [...prev, { sender_type: "user", text: userMessageText }]);
  setMessage(""); 
    setLoading(true); //Indica que se esta cargando el mensaje

    try 
    {
      
      let chatId = activeChat; //Guarda el ID del chat activo en una variable local chatId. Esto se usa para enviar el mensaje al chat correcto.

      // Verfica que chatId exista, si no, crea uno nuevo
      if (!chatId) 
      {
        const newChat = await createChat("Nuevo Chat"); //Crea un nuevo chat con nombre "nuevo chat"
        // Si el chat se creó correctamente, actualiza la lista de chats y establece el chat activo
        if (newChat && !newChat.error) // Comprueba que el chat se haya creado correctamente y no tenga errores.
        {
          // Declara allChats como la lista de chats actualizada
          const allChats = await getAllChats(); // llama a getAllChats para recargar la lista de chats del usuario desde el backend.
          // Actualiza el estado de los chats en el front
          setChats(allChats.chats || allChats); // Si allChats.chats existe, lo usa; si no, usa allChats directamente.
          // Obtiene el ID del último chat creado
          const lastChat = (allChats.chats || allChats).slice(-1)[0];
          // Asigna el ID del nuevo chat a chatId y lo establece como chat activo
          chatId = lastChat.id;
          // Define el chat activo en el estado
          setActiveChat(chatId);
        } 
        else 
        {
          // Si hubo un error al crear el chat, muestra una alerta
          alert("Error al crear el chat.");
          //Detiene la carga
          setLoading(false);
          // Retorna un objeto que indica un error al crear el chat y detiene la función.
          return {error: "Error al crear el chat.", message: newChat};
        }
      }

      // Debug
      console.log("chatId, message", { chatId, message: userMessageText }); 
      console.log("Enviando mensaje...")

      const result = await sendMessage(chatId!, userMessageText); // llama a sendMessage del backend para enviar el mensaje al chat especificado.
      console.log("Respuesta real de la API:", result);
      //Si resultado tiene un valor, actualiza los mensajes en el front
      if (result) {

        if (result.modelResult && result.modelResult.message?.length > 0) {
          const item = result.modelResult.message[0];
          setModelInfo({
            url: item.download_url,
            metricName: item.metrics?.metric,
            metricValue: item.metrics?.value,
    });

    console.log("Model info guardada:", item);
  }

    // Ahora agregamos los mensajes que devuelve la IA (bot)
    if (result && result.chat_messages) {
      // Cada mensaje que venga de la API lo agregamos al estado
      setMessages(prev => [...prev, ...result.chat_messages]);
      console.log("Mensajes de la IA agregados:", result.chat_messages);
    }}}
    catch (err) {
      console.error("Error al enviar mensaje:", err);
    } 
    finally {
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
              <div className="dropdown-menuchat">
                <a className="dropdown-itemchat">
                  <img src="/img/usergris.png" alt="mail" width="22" />
                  {user}
                </a>
                <a className="dropdown-item2chat" onClick={handleLogout}>
                  <img src="/img/cerrar.png" alt="logout" width="22" />
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
          {messages.length === 0 &&( <h1 className="titulochatbot">Creá, entrená, optimizá. ¿Por dónde empezamos?</h1>)}
          <div className="mensajes">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender_type}`}>
                <b>{msg.sender_type}:</b> {msg.text}
              </div>
            ))}
          </div>
                    {modelInfo && (
            <div className="modelo-info">
              <p><b>Modelo entrenado:</b></p>
              {modelInfo.metricName && (
                <p>Métrica ({modelInfo.metricName}): <b>{modelInfo.metricValue}</b></p>
                )}
                {modelInfo.url && (
                  <a href={modelInfo.url} target="_blank">Descargar modelo</a>
                  )}
              </div>
            )}

          <section className="accioneschatbot">
            <textarea
              className="chatbox"
              placeholder="Message AI Maker..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="enterchatbot" onClick={handleSend} disabled={loading}>
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
