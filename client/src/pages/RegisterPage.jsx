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
        <h4>Register</h4>
        <FormRow type="text" name="name" id="name" labelText="Name" />
        <FormRow
          type="text"
          name="lastName"
          id="lastName"
          labelText="Last Name"
        />
        <FormRow type="email" name="email" id="email" labelText="Email" />
        <FormRow
          type="password"
          name="password"
          id="password"
          labelText="Password"
        />
        <button type="submit" className="btn btn-block">
          Register
        </button>
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login here
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default RegisterPage;
