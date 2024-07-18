import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import axios from "axios";
import { createContext } from "react";
import { useContext } from "react";

export const loader = async ({ request }) => {
  try {
    const { data } = await axios.get("/api/jobs");
    return { jobs: data.jobs };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobsPage = () => {
  const { jobs } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobsPage;
