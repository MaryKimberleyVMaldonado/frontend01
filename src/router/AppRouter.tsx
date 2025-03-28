import { Routes, Route } from "react-router-dom";
import LoginScreen from "../auth/LoginScreen";
import RegisterScreen from "../auth/RegisterScreen";
import UDashboard from "../auth/UDashboard";
import ProtectedRouter from "./ProtectedRouter";
import LogoutButton from '../components/LogoutButton';
import LoginCheckPage from "../components/LoginCheckPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/logout" element={<LogoutButton />} />
      <Route path="/login-check" element={<LoginCheckPage />} />

      {/* ✅ Ruta protegida correctamente */}
      <Route path="/udashboard" element={
        <ProtectedRouter>
          <UDashboard />
        </ProtectedRouter>
      } />
    </Routes>
  );
};

export default AppRouter;
