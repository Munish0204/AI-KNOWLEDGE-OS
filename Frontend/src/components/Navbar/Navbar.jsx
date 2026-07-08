import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <Link
        to="/dashboard"
        className="text-2xl font-bold"
      >
        AI Knowledge OS
      </Link>

      <SearchBar />

      <NotificationMenu />
    </nav>
  );
};

export default Navbar;