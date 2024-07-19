import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Loading } from "../components";
import axios from "axios";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const checkUser = async () => {
      try {
        const { data } = await axios.get("/api/users/current-user");

        if (data.user) {
          setIsLoading(false);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default HomePage;
