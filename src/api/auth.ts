const BASE_URL = "https://ai-maker-api.vercel.app/auth"; // ruta para login y registro

interface RegisterData { // define la forma del objeto que se va a enviar al backend al registrar un usuario
  name: string;
  last_name: string;
  email: string;
  password: string;
}

// funcion registerUser
export const registerUser = async (data: RegisterData) => { //la función recibe un parametro llamado data
  try {
    const res = await fetch(`${BASE_URL}/register`, { // llama a POST /auth/register
      method: "POST",
      headers: { "Content-Type": "application/json" }, // le dice al backend que los datos son JSON
      body: JSON.stringify(data), // envia { name, last_name, email, password } al servidor
    });
    return await res.json(); // devuelve la información sobre el usuario registrado
  } catch {
    return { error: "Error al registrar el usuario" };
  }
};

export const loginUser = async (email: string, password: string) => { // la función recibe dos parametros, email y password
  try {
    const res = await fetch(`${BASE_URL}/login`, { //llama a POST /auth/login
      method: "POST",
      headers: { "Content-Type": "application/json" }, // le dice al backend que los datos son JSON
      body: JSON.stringify({ email, password }), //envia { email, password } al servidor
    });
    return await res.json(); // devuelve la información sobre el usuario logueado
  } catch {
    return { error: "Error al iniciar sesión" };
  }
};