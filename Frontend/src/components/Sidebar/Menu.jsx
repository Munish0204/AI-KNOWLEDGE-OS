import MenuItem from "./MenuItem";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "AI Chat", path: "/chat" },
  { name: "Knowledge", path: "/knowledge" },
  { name: "Voice", path: "/voice" },
  { name: "Tasks", path: "/tasks" },
  { name: "Profile", path: "/profile" },
  { name: "Admin", path: "/admin" },
];

const Menu = () => {
  return (
    <nav className="flex-1 p-4">
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          name={item.name}
          path={item.path}
        />
      ))}
    </nav>
  );
};

export default Menu;