import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/LogoutService";

const LogoutButton = () => {
  console.log("LogoutButton cargado");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default LogoutButton;
