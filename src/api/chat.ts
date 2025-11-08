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