import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm">
        <Link to="/forgot-password" className="text-blue-600">
          Forgot Password?
        </Link>

        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;