import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardPage";

const Navlinks = ({ isBigSidebar = false }) => {
  const { handleToggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        if (link.path === "admin" && user.role !== "admin") {
          return;
        }
        return (
          <NavLink
            to={link.path}
            key={link.text}
            className="nav-link"
            onClick={!isBigSidebar && handleToggleSidebar}
            end
          >
            <span className="icon">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default Navlinks;
