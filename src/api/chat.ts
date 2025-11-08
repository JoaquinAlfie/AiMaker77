const BASE_URL = "https://ai-maker-api.vercel.app/chats";
const MSG_URL = "https://ai-maker-api.vercel.app/messages";

// Helper para obtener el token guardado
const getToken = () => localStorage.getItem("token");

// CHATS 
export const getAllChats = async () => {
  try {
    const res = await fetch(BASE_URL + "/", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch {
    return { error: "Error al obtener los chats." };
  }
};
export const createChat = async (name: string) => {
  try {
    const res = await fetch(BASE_URL + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ name }),
    });
    return await res.json();
  } catch {
    return { error: "Error al crear el chat." };
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
