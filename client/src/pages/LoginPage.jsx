import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" id="email" labelText="Email" />
        <FormRow
          type="password"
          name="password"
          id="password"
          labelText="Password"
        />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
        <p>
          Not a member?
          <Link to="/register" className="member-btn">
            Register here
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default RegisterPage;
