import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const NotificationMenu = () => {
  const { hasUnreadResponse, markResponsesRead } = useContext(ChatContext);

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={markResponsesRead}
        className="relative text-2xl"
        aria-label="Notifications"
      >
        🔔
        {hasUnreadResponse ? (
          <span
            className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-900"
            aria-label="Unread AI response"
          />
        ) : null}
      </button>
    </div>
  );
};

export default NotificationMenu;