import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobsPage";

const JobsContainer = () => {
  const { jobs } = useAllJobsContext();
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display.</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
