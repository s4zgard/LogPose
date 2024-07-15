import { Link } from "react-router-dom";
import { Logo } from "../components";
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
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name ..."
            className="form-input "
            required
          />
        </div>
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
