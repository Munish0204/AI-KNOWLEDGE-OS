import { useEffect, useMemo, useState } from "react";
import { getTasks } from "../../services/taskService";
import api from "../../services/api";

// ---------- date helpers ----------
const toKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSameDay = (a, b) => toKey(a) === toKey(b);

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABEL = (date) =>
  date.toLocaleDateString(undefined, { month: "long", year: "numeric" });

// Builds a 42-cell (6-week) grid for the given month, including
// leading/trailing days from adjacent months.
const buildMonthGrid = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay(); // 0 = Sunday
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return {
      date,
      isCurrentMonth: date.getMonth() === month,
    };
  });
};

// ---------- component ----------
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(startOfDay(new Date()));
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState("");

  const [importantDates, setImportantDates] = useState([]);
  const [datesLoading, setDatesLoading] = useState(true);
  const [datesError, setDatesError] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    getTasks()
      .then((response) => setTasks(response.data.tasks || []))
      .catch(() => setTasksError("Unable to load your tasks."))
      .finally(() => setTasksLoading(false));
  }, []);

  useEffect(() => {
    api
      .get("/calendar/important-dates")
      .then((response) => setImportantDates(response.data.importantDates || []))
      .catch(() => setDatesError("Unable to load important dates."))
      .finally(() => setDatesLoading(false));
  }, []);

  // Map dateKey -> tasks[] and dateKey -> importantDates[] for fast lookup per cell
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks
      .filter((task) => task.dueDate)
      .forEach((task) => {
        const key = toKey(task.dueDate);
        (map[key] ||= []).push(task);
      });
    return map;
  }, [tasks]);

  const datesByDate = useMemo(() => {
    const map = {};
    importantDates.forEach((item) => {
      const key = toKey(item.date);
      (map[key] ||= []).push(item);
    });
    return map;
  }, [importantDates]);

  const grid = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);
  const today = startOfDay(new Date());

  const selectedKey = toKey(selectedDate);
  const selectedTasks = tasksByDate[selectedKey] || [];
  const selectedImportantDates = datesByDate[selectedKey] || [];

  const goToMonth = (offset) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const handleSelectDay = (date) => {
    setSelectedDate(startOfDay(date));
  };

  const handleAddImportantDate = async (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await api.post("/calendar/important-dates", {
        title,
        date: selectedDate.toISOString(),
      });
      const created = response.data.importantDate || {
        _id: `temp-${Date.now()}`,
        title,
        date: selectedDate.toISOString(),
      };
      setImportantDates((prev) => [...prev, created]);
      setNewTitle("");
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Unable to save that important date."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteImportantDate = async (id) => {
    const previous = importantDates;
    setImportantDates((prev) => prev.filter((item) => item._id !== id));

    try {
      await api.delete(`/calendar/important-dates/${id}`);
    } catch {
      setImportantDates(previous); // rollback on failure
      setDatesError("Unable to delete that date. Please try again.");
    }
  };

  return (
    <div className="cal-shell bg-white shadow-sm rounded-2xl p-6">
      <style>{`
        .cal-shell {
          border: 1px solid #ECEAE3;
        }
        .cal-title {
          background: linear-gradient(90deg, #4F46E5, #9333EA);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .cal-sub {
          color: #9a988f;
          font-size: 0.88rem;
          margin-top: -0.9rem;
          margin-bottom: 1.4rem;
        }
        .cal-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #FEF2F2;
          border: 1px solid #FCD5D5;
          color: #B3261E;
          border-radius: 12px;
          padding: 0.7rem 1rem;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          animation: fadeSlideIn 300ms ease forwards;
        }

        /* ---- Month nav ---- */
        .cal-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .cal-nav-label {
          font-size: 1.15rem;
          font-weight: 700;
          color: #23231F;
          min-width: 160px;
          text-align: center;
        }
        .cal-nav-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid #ECEAE3;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7A54D6;
          font-weight: 600;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }
        .cal-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -10px rgba(122, 84, 214, 0.5);
          border-color: transparent;
        }
        .cal-today-btn {
          font-size: 0.78rem;
          font-weight: 600;
          color: #4F46E5;
          background: #EEF2FF;
          border: 1px solid #E0E0FA;
          border-radius: 999px;
          padding: 0.35rem 0.85rem;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }
        .cal-today-btn:hover {
          background: #E0E7FF;
          transform: translateY(-1px);
        }
        .cal-nav-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ---- Grid layout ---- */
        .cal-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 900px) {
          .cal-layout {
            grid-template-columns: 1.5fr 1fr;
          }
        }
        .cal-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 0.4rem;
        }
        .cal-weekday {
          text-align: center;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #9a988f;
          text-transform: uppercase;
          padding-bottom: 0.4rem;
        }
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .cal-cell {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          border: 1px solid transparent;
          background: #FAFAF9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
          opacity: 0;
          animation: cellIn 320ms ease forwards;
          animation-delay: var(--delay);
        }
        .cal-cell:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 18px -12px rgba(20, 20, 20, 0.25);
          border-color: #ECEAE3;
        }
        .cal-cell.is-other-month {
          opacity: 0.35;
        }
        .cal-cell.is-other-month:hover {
          opacity: 0.6;
        }
        .cal-cell.is-today {
          border-color: #4F46E5;
          background: #EEF2FF;
        }
        .cal-cell.is-selected {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          box-shadow: 0 10px 22px -10px rgba(79, 70, 229, 0.55);
        }
        .cal-cell-num {
          font-size: 0.85rem;
          font-weight: 600;
          color: #23231F;
        }
        .cal-cell.is-today .cal-cell-num {
          color: #4F46E5;
        }
        .cal-cell.is-selected .cal-cell-num {
          color: #ffffff;
        }
        .cal-dots {
          display: flex;
          gap: 3px;
        }
        .cal-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .cal-dot.task { background: #0EA5E9; }
        .cal-dot.important { background: #F59E0B; }
        .cal-cell.is-selected .cal-dot { background: rgba(255,255,255,0.85); }

        /* ---- Legend ---- */
        .cal-legend {
          display: flex;
          gap: 1.1rem;
          margin-top: 0.9rem;
          font-size: 0.78rem;
          color: #9a988f;
        }
        .cal-legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* ---- Side panel ---- */
        .cal-panel {
          background: #FAFAF9;
          border: 1px solid #ECEAE3;
          border-radius: 16px;
          padding: 1.2rem;
        }
        .cal-panel-date {
          font-size: 1.05rem;
          font-weight: 700;
          color: #23231F;
          margin-bottom: 1rem;
        }
        .cal-panel-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #9a988f;
          margin: 1rem 0 0.5rem;
        }
        .cal-panel-section-title:first-of-type {
          margin-top: 0;
        }
        .cal-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #ffffff;
          border: 1px solid #ECEAE3;
          border-radius: 10px;
          padding: 0.55rem 0.7rem;
          margin-bottom: 0.45rem;
          font-size: 0.85rem;
          color: #23231F;
          transition: box-shadow 200ms ease, transform 200ms ease;
        }
        .cal-item:hover {
          box-shadow: 0 8px 16px -12px rgba(20,20,20,0.2);
          transform: translateY(-1px);
        }
        .cal-item-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cal-item-dot.task { background: #0EA5E9; }
        .cal-item-dot.important { background: #F59E0B; }
        .cal-item-text {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cal-item-delete {
          flex-shrink: 0;
          border: none;
          background: transparent;
          color: #C9C6BA;
          cursor: pointer;
          font-size: 0.9rem;
          line-height: 1;
          padding: 0.2rem;
          border-radius: 6px;
          transition: color 180ms ease, background 180ms ease;
        }
        .cal-item-delete:hover {
          color: #DC2626;
          background: #FEF2F2;
        }
        .cal-empty-note {
          font-size: 0.82rem;
          color: #B0AEA4;
          padding: 0.4rem 0;
        }
        .cal-add-form {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.9rem;
        }
        .cal-add-input {
          flex: 1;
          border: 1px solid #ECEAE3;
          border-radius: 10px;
          padding: 0.55rem 0.7rem;
          font-size: 0.85rem;
          background: #ffffff;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .cal-add-input:focus {
          outline: none;
          border-color: #4F46E5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }
        .cal-add-btn {
          flex-shrink: 0;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease;
          box-shadow: 0 6px 14px -8px rgba(79, 70, 229, 0.55);
        }
        .cal-add-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .cal-add-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cal-submit-error {
          font-size: 0.78rem;
          color: #DC2626;
          margin-top: 0.4rem;
        }
        .cal-skeleton {
          height: 340px;
          border-radius: 16px;
          background: linear-gradient(90deg, #F5F4F0 25%, #FAFAF9 37%, #F5F4F0 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }

        @keyframes cellIn {
          to { opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cal-cell, .cal-banner { animation: none !important; opacity: 1; }
          .cal-cell:hover { transform: none; }
        }
      `}</style>

      <h1 className="cal-title text-3xl font-bold mb-1">Calendar</h1>
      <p className="cal-sub">Tap a date to see what's due and add important dates.</p>

      {tasksError ? (
        <div className="cal-banner">
          <span>⚠️</span>
          <span>{tasksError}</span>
        </div>
      ) : null}
      {datesError ? (
        <div className="cal-banner">
          <span>⚠️</span>
          <span>{datesError}</span>
        </div>
      ) : null}

      {tasksLoading || datesLoading ? (
        <div className="cal-skeleton" />
      ) : (
        <div className="cal-layout">
          {/* Month grid */}
          <div>
            <div className="cal-nav">
              <div className="cal-nav-controls">
                <button type="button" className="cal-nav-btn" onClick={() => goToMonth(-1)} aria-label="Previous month">
                  ‹
                </button>
                <button type="button" className="cal-today-btn" onClick={goToToday}>
                  Today
                </button>
              </div>
              <p className="cal-nav-label">{MONTH_LABEL(currentMonth)}</p>
              <button type="button" className="cal-nav-btn" onClick={() => goToMonth(1)} aria-label="Next month">
                ›
              </button>
            </div>

            <div className="cal-weekdays">
              {WEEKDAYS.map((day) => (
                <span key={day} className="cal-weekday">{day}</span>
              ))}
            </div>

            <div className="cal-grid">
              {grid.map(({ date, isCurrentMonth }, index) => {
                const key = toKey(date);
                const dayTasks = tasksByDate[key] || [];
                const dayDates = datesByDate[key] || [];
                const cellClasses = [
                  "cal-cell",
                  !isCurrentMonth && "is-other-month",
                  isSameDay(date, today) && "is-today",
                  isSameDay(date, selectedDate) && "is-selected",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={key}
                    className={cellClasses}
                    style={{ "--delay": `${(index % 7) * 25}ms` }}
                    onClick={() => handleSelectDay(date)}
                  >
                    <span className="cal-cell-num">{date.getDate()}</span>
                    {(dayTasks.length > 0 || dayDates.length > 0) && (
                      <span className="cal-dots">
                        {dayTasks.length > 0 && <span className="cal-dot task" />}
                        {dayDates.length > 0 && <span className="cal-dot important" />}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="cal-legend">
              <span className="cal-legend-item">
                <span className="cal-dot task" /> Task due
              </span>
              <span className="cal-legend-item">
                <span className="cal-dot important" /> Important date
              </span>
            </div>
          </div>

          {/* Selected day panel */}
          <div className="cal-panel">
            <p className="cal-panel-date">
              {selectedDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="cal-panel-section-title">Tasks due</p>
            {selectedTasks.length === 0 ? (
              <p className="cal-empty-note">No tasks due this day.</p>
            ) : (
              selectedTasks.map((task) => (
                <div key={task._id} className="cal-item">
                  <span className="cal-item-dot task" />
                  <span className="cal-item-text">{task.title}</span>
                </div>
              ))
            )}

            <p className="cal-panel-section-title">Important dates</p>
            {selectedImportantDates.length === 0 ? (
              <p className="cal-empty-note">No important dates yet.</p>
            ) : (
              selectedImportantDates.map((item) => (
                <div key={item._id} className="cal-item">
                  <span className="cal-item-dot important" />
                  <span className="cal-item-text">{item.title}</span>
                  <button
                    type="button"
                    className="cal-item-delete"
                    onClick={() => handleDeleteImportantDate(item._id)}
                    aria-label="Delete important date"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}

            <form className="cal-add-form" onSubmit={handleAddImportantDate}>
              <input
                type="text"
                placeholder="Add an important date…"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="cal-add-input"
              />
              <button type="submit" className="cal-add-btn" disabled={submitting}>
                {submitting ? "Adding…" : "Add"}
              </button>
            </form>
            {submitError ? <p className="cal-submit-error">{submitError}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;