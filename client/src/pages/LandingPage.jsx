import { Link } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import main from "../assets/images/main.svg";

const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            LogPose is a comprehensive job tracking application designed to help
            you manage your job search efficiently. With LogPose, you can easily
            track the jobs you have applied for, ensuring you never miss an
            important follow-up or deadline. The app allows you to organize and
            monitor all your applications, from the initial submission to
            receiving interview appointment call letters. This tool is perfect
            for job seekers who want to streamline their search process and
            increase their chances of success.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default LandingPage;
