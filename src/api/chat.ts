const BASE_URL = "https://ai-maker-api.vercel.app/chats";
const MSG_URL = "https://ai-maker-api.vercel.app/messages";

// Helper para obtener el token guardado
const getToken = () => localStorage.getItem("token");

// CHATS 
export const getAllChats = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Error al obtener los chats");
    const data = await res.json();
    return data.chats || [];
  } catch (error) {
    console.error(error);
    return [];
  }

};
export const createChat = async (name:string) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Error al crear el chat");
    const data = await res.json();
    return data.message || "Chat creado";
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/chat/${chatId}`, {
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
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Error al obtener mensajes del chat");
    const data = await res.json();
    return data.chat_messages || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const sendMessage = async (chatId: string, content: string) => {
  try {
    const res = await fetch(`${MSG_URL}/chat/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
                sender_type: "user",
        text: content,
      }),
    });
    if (!res.ok) throw new Error("Error al enviar mensaje");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
