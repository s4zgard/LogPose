import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/users/current-user");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardPage = ({ isDark }) => {
  const { user } = useLoaderData();

  const navigate = useNavigate();

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
    navigate("/");
    await axios.get("/api/auth/logout");
    toast.success("Logging out...");
  };

  const values = {
    darkTheme,
    showSidebar,
    user,
    handleTheme,
    handleToggleSidebar,
    handleLogout,
  };

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <DashboardContext.Provider value={values}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardPage;
