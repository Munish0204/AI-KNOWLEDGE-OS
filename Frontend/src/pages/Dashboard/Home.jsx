import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Home = ({ analytics }) => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [previewText, setPreviewText] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);

  const getDocumentUrl = (document) => {
    if (!document.fileUrl) {
      return "";
    }

    if (document.fileUrl.startsWith("http")) {
      return document.fileUrl;
    }

    const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
    const backendOrigin = apiUrl.replace(/\/api\/?$/, "");
    return `${backendOrigin}${document.fileUrl}`;
  };

  const handleDocumentClick = async (document) => {
    if (!document.fileUrl) {
      return;
    }

    setSelectedDocument({ ...document, url: getDocumentUrl(document) });
    setPreviewText("");

    if (document.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setPreviewLoading(true);
      try {
        const response = await api.get(`/documents/${document._id}/text`, {
          responseType: "text",
        });
        setPreviewText(response.data);
      } catch {
        setPreviewText("Unable to load document text.");
      } finally {
        setPreviewLoading(false);
      }
    }
  };

  const stats = [
    {
      title: "Notes",
      value: analytics?.totalNotes ?? 0,
      path: "/notes",
      icon: "📝",
      color: "bg-blue-100 text-blue-600",
      ring: "hover:ring-blue-300",
    },
    {
      title: "Tasks",
      value: analytics?.totalTasks ?? 0,
      path: "/tasks",
      icon: "✅",
      color: "bg-green-100 text-green-600",
      ring: "hover:ring-green-300",
    },
    {
      title: "Documents",
      value: analytics?.totalDocuments ?? 0,
      path: "/documents",
      icon: "📄",
      color: "bg-yellow-100 text-yellow-600",
      ring: "hover:ring-yellow-300",
    },
    {
      title: "AI Chats",
      value: analytics?.totalChats ?? 0,
      path: "/chat",
      icon: "🤖",
      color: "bg-purple-100 text-purple-600",
      ring: "hover:ring-purple-300",
    },
  ];

  const activities = analytics?.recentActivity ?? [];
  const documents = analytics?.documents ?? [];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Inline keyframes for effects Tailwind doesn't provide by default */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(4deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .fade-in-up { animation: fadeInUp 0.5s ease-out both; }
        .stat-card:hover .stat-icon { animation: floatIcon 0.8s ease-in-out infinite; }
        .quick-btn {
          background-size: 200% auto;
          transition: all 0.35s ease;
        }
        .quick-btn:hover {
          background-position: right center;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg fade-in-up transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
        <p className="mt-3 text-lg">
          Manage your knowledge, tasks, AI conversations,
          documents, and productivity from one intelligent dashboard.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((item, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`stat-card fade-in-up bg-white rounded-xl shadow-md p-6 ring-2 ring-transparent transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl ${item.ring} ${item.path ? "cursor-pointer" : ""}`}
            onClick={() => item.path && navigate(item.path)}
            onKeyDown={(event) => {
              if (item.path && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                navigate(item.path);
              }
            }}
            role={item.path ? "button" : undefined}
            tabIndex={item.path ? 0 : undefined}
          >
            <div
              className={`stat-icon w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 ${item.color}`}
            >
              {item.icon}
            </div>
            <h2 className="mt-4 text-gray-500">{item.title}</h2>
            <p className="text-3xl font-bold mt-2 transition-colors duration-300 group-hover:text-indigo-600">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">Quick Actions</h2>

        <div className="grid md:grid-cols-4 gap-5">
          <button
            type="button"
            onClick={() => navigate("/notes")}
            className="quick-btn bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white rounded-xl p-5 font-medium active:scale-95"
          >
            ➕ Create Note
          </button>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="quick-btn bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white rounded-xl p-5 font-medium active:scale-95"
          >
            ✅ Create Task
          </button>

          <button
            type="button"
            onClick={() => navigate("/upload")}
            className="quick-btn bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white rounded-xl p-5 font-medium active:scale-95"
          >
            📄 Upload Document
          </button>

          <button
            type="button"
            onClick={() => navigate("/chat")}
            className="quick-btn bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white rounded-xl p-5 font-medium active:scale-95"
          >
            🤖 Open AI Agent
          </button>
        </div>
      </div>

      {/* Recent Activity & AI Assistant */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {/* Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 transition-shadow duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="rounded-lg bg-slate-50 p-4 text-slate-500">
                No recent activity yet.
              </p>
            ) : activities.map((activity) => (
              <div
                key={activity.id}
                className="border-l-4 border-indigo-500 bg-slate-50 p-4 rounded-lg transition-all duration-300 hover:border-indigo-700 hover:bg-indigo-50 hover:translate-x-1 hover:shadow-sm cursor-default"
              >
                {activity.message}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transition-shadow duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Recent Documents</h2>
            <button
              type="button"
              onClick={() => navigate("/documents")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {documents.length === 0 ? (
              <p className="rounded-lg bg-slate-50 p-4 text-slate-500">
                No documents uploaded yet.
              </p>
            ) : documents.map((document) => (
              <div
                key={document._id}
                onClick={() => handleDocumentClick(document)}
                onKeyDown={(event) => {
                  if (
                    document.fileUrl &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    handleDocumentClick(document);
                  }
                }}
                role={document.fileUrl ? "button" : undefined}
                tabIndex={document.fileUrl ? 0 : undefined}
                className={`flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4 ${document.fileUrl ? "cursor-pointer transition hover:bg-indigo-50" : ""}`}
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-800">
                    {document.title || document.filename}
                  </p>
                  <p className="text-sm text-slate-500">
                    {document.fileType || "Document"}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-indigo-600">
                  {document.fileUrl ? "Open" : "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {selectedDocument ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selectedDocument.title || selectedDocument.filename}
            onClick={() => setSelectedDocument(null)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-3 py-1 text-xl text-white"
                aria-label="Close document preview"
              >
                ×
              </button>

              <h2 className="mb-3 pr-12 text-lg font-semibold text-slate-800">
                {selectedDocument.title || selectedDocument.filename}
              </h2>

              {previewLoading ? (
                <p className="p-6 text-slate-500">Loading document text...</p>
              ) : selectedDocument.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <pre className="max-h-[75vh] overflow-auto whitespace-pre-wrap rounded-lg border bg-slate-50 p-6 text-left text-sm leading-6 text-slate-800">
                  {previewText}
                </pre>
              ) : selectedDocument.fileType?.startsWith("image/") ? (
                <img
                  src={selectedDocument.url}
                  alt={selectedDocument.title || selectedDocument.filename}
                  className="mx-auto max-h-[75vh] max-w-full object-contain"
                />
              ) : (
                <iframe
                  src={selectedDocument.url}
                  title={selectedDocument.title || selectedDocument.filename}
                  className="h-[75vh] w-full rounded-lg border"
                />
              )}
            </div>
          </div>
        ) : null}

        {/* AI Assistant */}
        <div className="bg-white rounded-xl shadow-md p-6 transition-shadow duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-5">AI Assistant</h2>

          <div className="bg-indigo-50 rounded-xl p-6 transition-colors duration-300 hover:bg-indigo-100">
            <h3 className="text-xl font-semibold mb-3">💡 Today's Suggestion</h3>

            <p className="text-gray-700">
              You currently have <strong>{analytics?.totalTasks ?? 0} tasks</strong> and
              <strong> {analytics?.totalNotes ?? 0} notes</strong> saved in your workspace.
              Keep building from your live dashboard data.
            </p>

            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="mt-6 bg-indigo-600 text-white px-5 py-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-lg active:scale-95"
            >
              Open AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-500">
        © 2026 AI Knowledge OS | Smart Productivity Platform
      </div>
    </div>
  );
};

export default Home;