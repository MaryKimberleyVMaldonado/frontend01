import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accounts";

interface RegisterResponse {
  id: number;
  email: string;
  accountType: {
    id: number;
    type: string;
  };
}

class RegisterService {
  async registerUser(
    email: string,
    password: string,
    accountTypeId: number
  ): Promise<RegisterResponse | null> {
    try {
      // ✅ AQUÍ estaba el error: faltaba esta línea
      const response = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
        accountTypeId
      }, {
        withCredentials: false // ⛔ Evita que mande cookies o sesión
      });

      // Verificación opcional del response
      if (!response.data?.id) {
        throw new Error("Invalid response from server");
      }
      

      return response.data;
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      throw error;
    }
  }
}

export default RegisterService;

