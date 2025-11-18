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
    if (!res.ok) throw new Error("Error al obtener los chats");
    return await res.json(); // devuelve la lista de chats en .json
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const createChat = async (name:string) => {
  try {
    const res = await fetch(`${BASE_URL}`, { //llama a post /chats
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
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

export const deleteChat = async (chatId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${chatId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch {
    return { error: "Error al eliminar el chat." };
  }
};
// MENSAJES 
export const getMessages = async (chatId: string) => {
  try {
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Error al obtener mensajes del chat");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const sendMessage = async (chatId: string, content: string) => {
  try {
    const token = getToken();
    console.log("sendMessage token:", token);
    console.log("https://ai-maker-api.vercel.app/messages/chat/155");
    console.log(`${MSG_URL}/chat/${chatId}`)
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sender_type: "user", text: content }),
    });

    // con no-cors no podemos leer la respuesta, así que solo devolvemos true/false
    return res.ok;
  } catch (e) {
    console.error("sendMessage error:", e);
    return false;
  }
};
