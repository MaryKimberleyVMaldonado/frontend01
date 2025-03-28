import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/UserScreen.css";
import UserService, { AccountResponse } from "../services/UserService";
import LogoutButton from "../components/LogoutButton";


const UDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<AccountResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserService.getCurrentUser();
      console.log("User data:", userData);
      if (userData) {
        setUser(userData);
      } else {
        navigate("/login"); // No hay sesión, redirige al login
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <main>
      <nav className="main-menu">
        <h1>Loans App</h1>
        <img
          className="logo"
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4cfdcb5a-0137-4457-8be1-6e7bd1f29ebb"
          alt=""
        />
        <ul>
          <li className="nav-item active">
            <b></b>
            <b></b>
            <a href="#">
              <i className="fa fa-house nav-icon"></i>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li className="nav-item">
            <b></b>
            <b></b>
            <a href="#">
              <i className="fa fa-user nav-icon"></i>
              <span className="nav-text">Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <b></b>
            <b></b>
            <button onClick={handleLogout} className="nav-text" style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
              <i className="fa fa-sign-out nav-icon"></i>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <section className="content">
        <div className="left-content">
          <div className="activities">
            <h1>Dashboard</h1>
            <div className="user-info-box" style={{ marginBottom: "20px" }}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tipo de cuenta:</strong> {user.accountType.type}</p>
            </div>
            {/* Aquí puedes mantener el resto de las tarjetas u otros componentes */}
            <p>Contenido del dashboard para {user.accountType.type}.</p>
          </div>
        </div>

        <div className="right-content">
          {/* Aquí puedes colocar algún resumen o stats del usuario si lo deseas */}
        </div>

        <LogoutButton />

      </section>
    </main>
  );
};

export default UDashboard;
