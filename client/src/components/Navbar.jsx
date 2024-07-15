import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardPage";
import LogoutContainer from "./LogoutContainer";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { showSidebar, handleToggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={handleToggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
