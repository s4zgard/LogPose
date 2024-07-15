import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage.js";
import img404 from "../assets/images/not-found.svg";

const ErrorPage = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img404} alt="404 not found" />
          <h3>Lost in the Grand Line?</h3>
          <p>Looks like you've pulled a Zoro and lost your way!.</p>
          <Link to="/dashboard">Go back</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong.</h3>
      </div>
    </Wrapper>
  );
};
export default ErrorPage;
