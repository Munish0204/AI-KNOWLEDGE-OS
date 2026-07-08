import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className="block hover:text-blue-400"
          >
            Home
          </NavLink>

          <NavLink
            to="/notes"
            className="block hover:text-blue-400"
          >
            Notes
          </NavLink>

          <NavLink
            to="/tasks"
            className="block hover:text-blue-400"
          >
            Tasks
          </NavLink>

          <NavLink
            to="/chat"
            className="block hover:text-blue-400"
          >
            AI Chat
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;