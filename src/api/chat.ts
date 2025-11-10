const BASE_URL = "https://ai-maker-api.vercel.app/chats";
const MSG_URL = "https://ai-maker-api.vercel.app/messages";

const getToken = () => localStorage.getItem("token");

// 🟣 Obtener todos los chats
export const getAllChats = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al obtener los chats");
    return Array.isArray(data) ? data : data.chats || [];
  } catch (error) {
    console.error("❌ Error en getAllChats:", error);
    return [];
  }
};

// 🟣 Crear nuevo chat
export const createChat = async (name: string) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al crear el chat");
    return data;
  } catch (error) {
    console.error("❌ Error en createChat:", error);
    return null;
  }
};

// 🟣 Obtener mensajes de un chat
export const getMessages = async (chatId: string) => {
  try {
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al obtener mensajes");
    return Array.isArray(data) ? data : data.messages || [];
  } catch (error) {
    console.error("❌ Error en getMessages:", error);
    return [];
  }
};

// 🟣 Enviar mensaje
export const sendMessage = async (chatId: string, text: string) => {
  try {
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ sender_type: "user", text }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al enviar mensaje");
    return data;
  } catch (error) {
    console.error("❌ Error en sendMessage:", error);
    return null;
  }
};