import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AdminContext from "./context";

function Navbar() {
  const isAdmin = useContext(AdminContext);

  return (
    <nav className="nav">
      <Link className="site-title" to="/">
        Animal shelter
      </Link>
      <ul>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/list">List</CustomLink>
        <CustomLink to="/donations">Donations</CustomLink>
        <CustomLink to="/notifications">Notifications</CustomLink>
        {isAdmin ? (
          <span>Input</span>
        ) : (
          <CustomLink to="/input">Input</CustomLink>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
