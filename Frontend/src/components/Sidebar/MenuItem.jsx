import { NavLink } from "react-router-dom";

const MenuItem = ({ name, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-lg mb-2 transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-800"
        }`
      }
    >
      {name}
    </NavLink>
  );
};

export default MenuItem;