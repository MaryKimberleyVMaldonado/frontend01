import axios from "axios";

// Esta función se encarga de traer la cuenta del usuario autenticado
export const getAuthenticatedAccount = async () => {
  const response = await axios.get("http://localhost:8080/api/accounts/me", {
    withCredentials: true
  });
  return response.data;
};
