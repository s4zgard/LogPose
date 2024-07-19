import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post("/api/auth/login", data);
    toast.success("Login successful.");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await axios.post("/api/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" id="email" labelText="Email" />
        <FormRow
          type="password"
          name="password"
          id="password"
          labelText="Password"
        />
        <button type="submit" disabled={isSubmitting} className="btn btn-block">
          {isSubmitting ? "Logging In ..." : "Login"}
        </button>
        {/* <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button> */}
        <p>
          Not a member?
          <Link to="/register" className="member-btn">
            Register here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default RegisterPage;
