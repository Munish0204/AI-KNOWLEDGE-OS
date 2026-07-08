import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;