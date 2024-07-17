import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post("/api/auth/register", data);
    toast.success("User registered successfully.");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

const RegisterPage = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
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
        <FormRow
          type="text"
          name="location"
          id="location"
          labelText="Location"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default RegisterPage;
