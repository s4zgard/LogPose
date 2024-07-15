import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

const DashboardPage = ({ isDark }) => {
  const user = { name: "John" };

  const [darkTheme, setDarkTheme] = useState(isDark);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleTheme = () => {
    const theme = !darkTheme;
    setDarkTheme(theme);
    document.body.classList.toggle("dark-theme", theme);
    localStorage.setItem("darkTheme", theme);
  };
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleLogout = async () => {
    console.log("User logged out.");
  };

  const values = {
    darkTheme,
    showSidebar,
    user,
    handleTheme,
    handleToggleSidebar,
    handleLogout,
  };

  return (
    <DashboardContext.Provider value={values}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardPage;
