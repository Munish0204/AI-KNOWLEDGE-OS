import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token
    ? (
      <>
        <Navbar />
        {children}
      </>
    )
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;