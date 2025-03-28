import "../styles/LoginScreen.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RegisterService from "../services/RegisterService";

const registerService = new RegisterService();

const RegisterScreen: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [type, setType] = useState(1); // Por defecto, tipo de cuenta "User"

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerService.registerUser(email, pswd, type);
      console.log("Usuario registrado:", response);

      navigate("/login"); // Redirige al dashboard
    } catch (error) {
      alert("Error al registrarse. Revisa los datos o el servidor.");
    }
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>

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

          <input
            type="number"
            name="type"
            placeholder="Account Type"
            required
            value={type}
            onChange={(e) => setType(parseInt(e.target.value))}
          />

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
