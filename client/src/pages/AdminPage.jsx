import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { StatItem } from "../components";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/users/admin/stats");
    return data;
  } catch (error) {
    toast.error("You are not authorized to view this page.");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title={"Current users"}
        count={users}
        color={"#e9b949"}
        icon={<FaSuitcaseRolling />}
        bcg={"#fcefc7"}
      />
      <StatItem
        title={"Current Jobs"}
        count={jobs}
        color={"#647acb"}
        icon={<FaCalendarCheck />}
        bcg={"#e0e8f9"}
      />
    </Wrapper>
  );
};
export default Admin;
