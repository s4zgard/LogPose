import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../api/utils/constants";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post("/api/jobs/", data);
    toast.success("Job created successfully.");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddJobPage = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="Job Status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Job"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJobPage;
