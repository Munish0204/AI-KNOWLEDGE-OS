import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-black text-white p-6">
        <h2 className="text-3xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-4">
          <NavLink
            to="/admin"
            className="block hover:text-blue-400"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className="block hover:text-blue-400"
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/notes"
            className="block hover:text-blue-400"
          >
            Notes
          </NavLink>

          <NavLink
            to="/admin/settings"
            className="block hover:text-blue-400"
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;