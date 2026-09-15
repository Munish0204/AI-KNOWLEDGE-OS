import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    resetPassword({ email, password, confirmPassword })
      .then((response) => {
        setSuccess(response.data.message || "Password changed successfully.");
        setTimeout(() => navigate("/login", { replace: true }), 1200);
      })
      .catch((resetError) => {
        setError(
          resetError?.response?.data?.message ||
            "Unable to change your password. Please try again."
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
      `}</style>

      <div className="login-card w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold mb-1 text-slate-800">
          Forgot password
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Verify your email and choose a new password
        </p>

        {error ? (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {success} Redirecting to login...
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login-input w-full border-2 border-slate-200 rounded-xl p-3 text-slate-700 placeholder-slate-400"
          />

          <input
            required
            minLength={6}
            type="password"
            placeholder="New password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-input w-full border-2 border-slate-200 rounded-xl p-3 text-slate-700 placeholder-slate-400"
          />

          <input
            required
            minLength={6}
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="login-input w-full border-2 border-slate-200 rounded-xl p-3 text-slate-700 placeholder-slate-400"
          />

          <button
            type="submit"
            disabled={isSubmitting || Boolean(success)}
            className="shine-btn w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-xl font-medium"
          >
            {isSubmitting ? "Changing password..." : "Change password"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <Link
            to="/login"
            className="link-underline text-indigo-600 font-medium"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;