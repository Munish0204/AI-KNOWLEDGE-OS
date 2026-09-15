import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskService";

const getUrgency = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  if (diffDays <= 3) return "soon";
  return "later";
};

const URGENCY_CONFIG = {
  overdue: { label: "Overdue", icon: "⏰", accent: "#DC2626", soft: "#FEF2F2" },
  today: { label: "Due today", icon: "📌", accent: "#D97706", soft: "#FFFBEB" },
  soon: { label: "Due soon", icon: "🔔", accent: "#D97706", soft: "#FFFBEB" },
  later: { label: "Upcoming", icon: "🗓️", accent: "#0EA5E9", soft: "#F0F9FF" },
};

const Reminder = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then((response) => setTasks(response.data.tasks || []))
      .finally(() => setLoading(false));
  }, []);

  const upcomingTasks = tasks
    .filter((task) => task.dueDate && !task.completed)
    .sort((first, second) => new Date(first.dueDate) - new Date(second.dueDate));

  return (
    <div className="reminder-shell bg-white p-6 rounded-2xl shadow-sm">
      <style>{`
        .reminder-shell {
          border: 1px solid #ECEAE3;
        }
        .reminder-title {
          background: linear-gradient(90deg, #D97706, #DC2626);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .reminder-sub {
          color: #9a988f;
          font-size: 0.88rem;
          margin-top: -1.15rem;
          margin-bottom: 1.5rem;
        }
        .reminder-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          background: #ffffff;
          border: 1px solid #ECEAE3;
          border-radius: 14px;
          padding: 1rem 1.1rem;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
          animation: itemIn 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--delay);
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 240ms ease,
                      border-color 240ms ease;
        }
        .reminder-item:hover {
          transform: translateY(-3px);
          border-color: transparent;
          box-shadow: 0 16px 30px -18px color-mix(in srgb, var(--accent) 55%, transparent),
                      0 2px 8px rgba(20, 20, 20, 0.05);
        }
        .reminder-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
        }
        .reminder-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: var(--soft);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .reminder-item:hover .reminder-icon {
          transform: scale(1.1) rotate(-6deg);
        }
        .reminder-body {
          flex: 1;
          min-width: 0;
        }
        .reminder-item-title {
          color: #23231F;
          font-weight: 500;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .reminder-date {
          margin-top: 0.2rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--accent);
        }
        .reminder-badge {
          flex-shrink: 0;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--accent);
          background: var(--soft);
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          white-space: nowrap;
        }
        .reminder-item.overdue .reminder-badge {
          animation: badgePulse 2s ease-in-out infinite;
        }
        .reminder-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 3.5rem 1rem;
          color: #9a988f;
          background: #FAFAF9;
          border: 1px dashed #ECEAE3;
          border-radius: 14px;
        }
        .reminder-empty-icon {
          font-size: 2rem;
          opacity: 0.7;
        }
        .reminder-skeleton-row {
          height: 4.2rem;
          border-radius: 14px;
          background: linear-gradient(90deg, #F5F4F0 25%, #FAFAF9 37%, #F5F4F0 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
          margin-bottom: 0.75rem;
        }
        @keyframes itemIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 35%, transparent); }
          50% { box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent) 0%, transparent); }
        }
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .reminder-item, .reminder-badge {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
          .reminder-item:hover { transform: none; }
        }
      `}</style>

      <h1 className="reminder-title text-3xl font-bold mb-1">Reminders</h1>
      <p className="reminder-sub">Everything you still need to act on.</p>

      {loading ? (
        <div>
          <div className="reminder-skeleton-row" />
          <div className="reminder-skeleton-row" />
          <div className="reminder-skeleton-row" />
        </div>
      ) : upcomingTasks.length === 0 ? (
        <div className="reminder-empty">
          <span className="reminder-empty-icon">🎉</span>
          <p>No upcoming reminders.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {upcomingTasks.map((task, index) => {
            const urgency = getUrgency(task.dueDate);
            const config = URGENCY_CONFIG[urgency];

            return (
              <li
                key={task._id}
                className={`reminder-item ${urgency}`}
                style={{
                  "--accent": config.accent,
                  "--soft": config.soft,
                  "--delay": `${index * 60}ms`,
                }}
              >
                <span className="reminder-icon">{config.icon}</span>
                <div className="reminder-body">
                  <p className="reminder-item-title">{task.title}</p>
                  <p className="reminder-date">
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="reminder-badge">{config.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Reminder;