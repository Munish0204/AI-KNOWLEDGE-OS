import Menu from "./Menu";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        AI Knowledge OS
      </div>

      <Menu />
    </aside>
  );
};

export default Sidebar;