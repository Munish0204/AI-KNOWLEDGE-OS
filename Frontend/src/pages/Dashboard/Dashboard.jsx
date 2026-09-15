import { useEffect, useRef, useState } from "react";
import Home from "./Home";
import { getDashboardAnalytics } from "../../services/analyticsService";

// Animates a number counting up from 0 to `value` whenever `value` changes.
const useCountUp = (value, duration = 1000) => {
  const [display, setDisplay] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    const target = Number(value) || 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(target * eased));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [value, duration]);

  return display;
};

const STAT_CONFIG = [
  {
    key: "totalNotes",
    label: "Notes",
    icon: "M4 5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z M14 3v6h6",
    from: "#F5A623",
    to: "#E8862B",
    soft: "#FFF3E0",
  },
  {
    key: "totalTasks",
    label: "Tasks",
    icon: "M9 11l3 3 8-8 M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9",
    from: "#4FA9E0",
    to: "#2E7DB8",
    soft: "#E6F3FC",
  },
  {
    key: "totalChats",
    label: "AI chats",
    icon: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z",
    from: "#9B7BE8",
    to: "#7A54D6",
    soft: "#F1ECFC",
  },
  {
    key: "totalDocuments",
    label: "Documents",
    icon: "M14 3v4a1 1 0 0 0 1 1h4 M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z",
    from: "#F0765A",
    to: "#D9482A",
    soft: "#FCEAE4",
  },
];

const StatCard = ({ config, value, index, loading }) => {
  const animated = useCountUp(loading ? 0 : value);

  return (
    <div
      className="stat-card"
      style={{
        "--from": config.from,
        "--to": config.to,
        "--soft": config.soft,
        "--delay": `${index * 90}ms`,
      }}
    >
      <span className="stat-shine" aria-hidden="true" />
      <div className="stat-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={config.icon} />
        </svg>
      </div>
      <p className="stat-label">{config.label}</p>
      <p className="stat-value">
        {loading ? <span className="stat-skeleton" /> : animated.toLocaleString()}
      </p>
      <span className="stat-underline" aria-hidden="true" />
    </div>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return { text: "Burning the midnight oil", icon: "🌙" };
  if (hour < 12) return { text: "Good morning", icon: "☀️" };
  if (hour < 17) return { text: "Good afternoon", icon: "🌤️" };
  if (hour < 21) return { text: "Good evening", icon: "🌆" };
  return { text: "Good night", icon: "🌙" };
};

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const greeting = getGreeting();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUserName(JSON.parse(storedUser).name || "");
      } catch {
        setUserName("");
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getDashboardAnalytics()
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setAnalytics(response.data.analytics);
        setLastUpdated(new Date());
      })
      .catch((analyticsError) => {
        if (!isMounted) {
          return;
        }

        setError(
          analyticsError?.response?.data?.message ||
            "Unable to load live dashboard data."
        );
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="dash-shell space-y-10">
      <style>{`
        .dash-shell {
          position: relative;
          min-height: 100%;
          padding-bottom: 2rem;
        }
        .dash-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(600px 300px at 90% -5%, #EDE7FB 0%, transparent 60%),
            radial-gradient(500px 260px at -5% 10%, #E6F3FC 0%, transparent 55%),
            #FAFAF7;
        }

        /* ---- Header ---- */
        .dash-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeSlideIn 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .dash-avatar {
          width: 3.1rem;
          height: 3.1rem;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.05rem;
          box-shadow: 0 10px 20px -8px rgba(99, 102, 241, 0.55);
          flex-shrink: 0;
          transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .dash-avatar:hover {
          transform: scale(1.08) rotate(-4deg);
        }
        .dash-greeting-row {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .dash-greeting {
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #8b8a82;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0 0 0.15rem;
        }
        .dash-name {
          font-size: 2rem;
          font-weight: 700;
          color: #23231F;
          margin: 0;
          line-height: 1.15;
        }
        .dash-status {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: #8b8a82;
          background: rgba(255,255,255,0.7);
          border: 1px solid #ECEAE3;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          transition: border-color 250ms ease, box-shadow 250ms ease;
        }
        .dash-status:hover {
          border-color: #C9C6BA;
          box-shadow: 0 4px 14px -8px rgba(0,0,0,0.15);
        }
        .dash-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3FB27F;
          box-shadow: 0 0 0 0 rgba(63, 178, 127, 0.6);
          animation: pulseDot 2.2s ease-in-out infinite;
        }
        .dash-status-dot.is-loading {
          background: #E8862B;
        }

        /* ---- Section heading ---- */
        .dash-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.1rem;
        }
        .dash-section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #23231F;
          margin: 0;
        }
        .dash-section-sub {
          font-size: 0.82rem;
          color: #9a988f;
          margin: 0.2rem 0 0;
        }

        /* ---- Error banner ---- */
        .dash-error {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          background: #FEF2F2;
          border: 1px solid #FCD5D5;
          color: #B3261E;
          border-radius: 14px;
          padding: 0.9rem 1.1rem;
          font-size: 0.88rem;
          animation: fadeSlideIn 400ms ease forwards;
        }

        /* Stat cards (unchanged from your original) */
        .stat-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #ECEAE3;
          border-radius: 18px;
          padding: 1.6rem 1.5rem 1.5rem;
          overflow: hidden;
          isolation: isolate;
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          animation: rise 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--delay);
          box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 320ms ease,
                      border-color 320ms ease;
        }
        .stat-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(120px 90px at 100% 0%, var(--soft), transparent 70%);
          opacity: 0;
          transition: opacity 320ms ease;
          z-index: -1;
        }
        .stat-card:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: transparent;
          box-shadow: 0 20px 40px -18px color-mix(in srgb, var(--to) 55%, transparent),
                      0 2px 8px rgba(20, 20, 20, 0.06);
        }
        .stat-card:hover::before {
          opacity: 1;
        }
        .stat-shine {
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          transition: left 650ms ease;
          pointer-events: none;
        }
        .stat-card:hover .stat-shine {
          left: 130%;
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--from), var(--to));
          color: #ffffff;
          margin-bottom: 1.2rem;
          box-shadow: 0 6px 14px -6px color-mix(in srgb, var(--to) 65%, transparent);
          transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-card:hover .stat-icon {
          transform: scale(1.12) rotate(-6deg);
        }
        .stat-icon svg {
          width: 21px;
          height: 21px;
        }
        .stat-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: #7A7972;
          margin: 0 0 0.4rem;
          transition: color 280ms ease;
        }
        .stat-card:hover .stat-label {
          color: var(--to);
        }
        .stat-value {
          font-family: Georgia, "Iowan Old Style", serif;
          font-size: 2.3rem;
          font-weight: 600;
          color: #23231F;
          margin: 0;
          line-height: 1;
        }
        .stat-underline {
          position: absolute;
          left: 1.5rem;
          right: 1.5rem;
          bottom: 0;
          height: 3px;
          border-radius: 3px 3px 0 0;
          background: linear-gradient(90deg, var(--from), var(--to));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .stat-card:hover .stat-underline {
          transform: scaleX(1);
        }
        .stat-skeleton {
          display: inline-block;
          width: 3.5rem;
          height: 2rem;
          border-radius: 6px;
          background: linear-gradient(90deg, #EEECE4 25%, #F6F5F0 37%, #EEECE4 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }

        @keyframes rise {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(63, 178, 127, 0.5); }
          50% { box-shadow: 0 0 0 5px rgba(63, 178, 127, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-card, .stat-icon, .stat-underline, .stat-shine,
          .dash-header, .dash-error, .dash-status-dot, .dash-avatar {
            animation: none !important;
            transition: none !important;
          }
          .stat-card { opacity: 1; transform: none; }
          .stat-card:hover { transform: none; }
          .dash-header { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="dash-header">
        <div className="dash-greeting-row">
          <div>
            <p className="dash-greeting">
              <span>{greeting.icon}</span> {greeting.text}
            </p>
            <h1 className="dash-name">{userName || "User"}</h1>
          </div>
        </div>

        <div className="dash-status">
          <span className={`dash-status-dot ${loading ? "is-loading" : ""}`} />
          {loading
            ? "Syncing your workspace…"
            : lastUpdated
            ? `Live · updated ${lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Live dashboard"}
        </div>
      </div>

      {error ? (
        <div className="dash-error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      ) : null}

      <Home analytics={analytics} />

    </div>
  );
};

export default Dashboard;