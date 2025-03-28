import "../styles/LoginScreen2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";
import { useAuth } from "../context/AuthContext";
import { getAuthenticatedAccount } from "../services/AuthService"; // nuevo servicio

const loginService = new LoginService();

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await loginService.loginUser(email, pswd);

    if (success) {
      try {
        const user = await getAuthenticatedAccount(); // GET /api/accounts/me
        login(user); // Guarda en el contexto

        // Redirigir según el tipo de cuenta
        if (user.accountType.type === "Admin") {
          navigate("/mdashboard");
        } else {
          navigate("/udashboard");
        }
      } catch (error) {
        alert("Error al obtener los datos del usuario.");
      }
    } else {
      alert("Login fallido. Verifica tus credenciales.");
    }
  };

  return (
    <div className="main">
      <div className="login">
        <form onSubmit={handleLogin}>
          <label>Login</label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required
            value={pswd}
            onChange={(e) => setPswd(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
