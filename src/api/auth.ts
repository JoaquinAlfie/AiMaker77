const BASE_URL = "https://ai-maker-api.vercel.app/auth";

interface RegisterData {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { error: "Error al registrar el usuario" };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch {
    return { error: "Error al iniciar sesión" };
  }
};