import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg p-3"
        />

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

        <button className="w-full bg-green-600 text-white p-3 rounded-lg">
          Register
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?
        <Link to="/" className="text-blue-600 ml-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;