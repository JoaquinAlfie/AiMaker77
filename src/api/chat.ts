const BASE_URL = "https://ai-maker-api.vercel.app/chats"; //rutas para chats
const MSG_URL = "https://ai-maker-api.vercel.app/messages"; //rutas para mensajes

// funcion para obtener el token JWT que guarde al iniciar sesión. es necesario para que el backend deje entrar
const getToken = () => localStorage.getItem("token");

// CHATS 
// funcion getAllChats
export const getAllChats = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, { //llama a get /chats
      headers: { Authorization: `Bearer ${getToken()}` }, //le manda el token
    });
    if (!res.ok) throw new Error("Error al obtener los chats"); // si la respuesta no fue exitosa crea el error y lo manda
    return await res.json(); // devuelve la lista de chats en .json
  } catch (error) { // si sale mal ejecuta el catch
    console.error(error);
    return [];
  }
};
// funcion createChat
export const createChat = async (name:string) => {
  try {
    const res = await fetch(`${BASE_URL}`, { //llama a post /chats
      method: "POST",
      headers: {
        "Content-Type": "application/json", // le digo al servidor de que tipo es la peticion que le mando
        Authorization: `Bearer ${getToken()}`, //le manda el token
      },
      body: JSON.stringify({ name }), // envia name (el nombre del chat)
    });
    if (!res.ok) throw new Error("Error al crear el chat");
    return await res.json(); // devuelve el chat creado
  } catch (error) {
    console.error(error);
    return null;
  }
};
// funcion deleteChat
export const deleteChat = async (chatId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${chatId}`, { // llama a DELETE /chats/:id
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }, //le manda el token
    });
    return await res.json(); // devuelve deleteChat para quien llame a deletechat pueda usarlo
  } catch {
    return { error: "Error al eliminar el chat." };
  }
};
// MENSAJES 
// funcion getMessages
export const getMessages = async (chatId: string) => {
  try {
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, { // llama a GET /messages/chat/:chatId
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` }, //le manda el token
    });
    if (!res.ok) {
      console.warn(`No messages found for chat ${chatId}`);
      return []; // Devuelve array vacío en lugar de intentar leer res.json()
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.messages || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
// funcion sendMessage
export const sendMessage = async (chatId: number, message: { sender_type: string; text: string }) => {
  try {
    const token = getToken();
    console.log("sendMessage token:", token);
    console.log("https://ai-maker-api.vercel.app/messages/chat/155");
    console.log(`${MSG_URL}/chat/${chatId}`)
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, { // llama a post a /messages/chat/:chatId
      method: "POST",
      headers: {
        "Content-Type": "application/json", // le digo al servidor de que tipo es la peticion que le mando
        Authorization: `Bearer ${token}`, //le manda el token
      },
      body: JSON.stringify({ sender_type: "user", text: content }), // Envia sender_type: "user", text: content
    });
    
    const data = await res.json().catch(() => null); // evita fallo si res no tiene json
    console.log("RESPUESTA REAL DEL BACKEND:", data);
    if (!res.ok) {
      console.error(`Error al enviar mensaje al chat ${chatId}`, data);
      return { error: true, ...data }; // siempre devuelve un objeto
    }

    return data; // mensaje creado
  } catch (e) {
    console.error("sendMessage error:", e);
    return { error: true, message: e };
  }
};