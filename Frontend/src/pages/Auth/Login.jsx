import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginUser } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    loginUser({ email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: response.data.user?.name,
            email: response.data.user?.email,
          })
        );
        navigate("/dashboard", { replace: true });
      })
      .catch((loginError) => {
        setError(
          loginError?.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        .login-card {
          animation: cardIn 0.5s ease-out both;
        }
        .login-input {
          background-position: 0 100%;
          background-repeat: no-repeat;
          background-size: 0% 2px;
          background-image: linear-gradient(90deg, #4f46e5, #7c3aed);
          transition: background-size 0.35s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .login-input:hover {
          border-color: #a5b4fc;
        }
        .login-input:focus {
          outline: none;
          border-color: transparent;
          background-size: 100% 2px;
          box-shadow: 0 4px 14px -6px rgba(79, 70, 229, 0.35);
        }
        .shine-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .shine-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(79, 70, 229, 0.55);
        }
        .shine-btn:active {
          transform: translateY(0);
        }
        .shine-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-120%) skewX(-20deg);
        }
        .shine-btn:hover::after {
          animation: shine 0.9s ease forwards;
        }
        .link-underline {
          position: relative;
        }
        .link-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .link-underline:hover::after {
          width: 100%;
        }
        .move-out {
          transform: translateX(120%);
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.35s ease;
        }
      `}</style>

      <div className="login-card w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center mb-1 text-slate-800">
          Welcome back
        </h2>
        <p className="text-center text-slate-400 text-sm mb-6">
          Sign in to continue to your account
        </p>

        {error ? (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login-input w-full border-2 border-slate-200 rounded-xl p-3 text-slate-700 placeholder-slate-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-input w-full border-2 border-slate-200 rounded-xl p-3 text-slate-700 placeholder-slate-400"
          />

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="link-underline text-indigo-600 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="shine-btn w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-xl font-medium"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm">
        

          <Link
            to="/register"
            className="link-underline text-indigo-600 font-medium-center"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};



export default Login;