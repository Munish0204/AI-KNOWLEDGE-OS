import { useLocation, useNavigate } from "react-router-dom";
import NotificationMenu from "./NotificationMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const storedUser = localStorage.getItem("user");
  let userName = "User";

  if (storedUser) {
    try {
      userName = JSON.parse(storedUser).name || userName;
    } catch {
      userName = "User";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-white/10 text-white px-4 sm:px-6 py-3 shadow-lg">
      {/* Inline keyframes/utilities Tailwind doesn't provide by default */}
      <style>{`
        .nav-icon-btn {
          transition: all 0.25s ease;
        }
        .nav-icon-btn:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-panel { animation: slideDown 0.25s ease-out both; }
      `}</style>

      <div className="flex items-center justify-between gap-4">
        {pathname !== "/dashboard" ? (
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="nav-icon-btn rounded-lg px-3 py-2 text-sm font-medium active:scale-95"
            aria-label="Go back"
          >
            ← Back
          </button>
        ) : null}

        <span className="mr-auto text-lg font-semibold tracking-tight">
          AI Knowledge
        </span>

        <div className="hidden items-center gap-2 text-sm sm:flex">
          <button
            type="button"
            onClick={() => navigate("/calendar")}
            className="nav-icon-btn rounded-lg px-3 py-2 font-medium"
          >
            Calendar
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="nav-icon-btn rounded-full p-2 active:scale-95">
            <NotificationMenu />
          </div>

          <div className="group relative">
            <button
              type="button"
              className="nav-icon-btn rounded-full w-9 h-9 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 font-semibold text-sm active:scale-95"
              title="Profile"
              aria-label={`Profile: ${userName}`}
            >
              {userName.charAt(0).toUpperCase()}
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 translate-y-1 rounded-xl border border-slate-200 bg-white p-3 text-slate-800 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <p className="truncate px-2 py-1 font-semibold" title={userName}>
                {userName}
              </p>
              <div className="my-2 border-t border-slate-100" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Log out
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;