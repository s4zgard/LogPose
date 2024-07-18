import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { FormRowSelect, FormRow } from "../components";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../api/utils/constants";
import axios from "axios";

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/jobs/${params.id}`);
    return { job: data.job };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.put(`/api/jobs/${params.id}`, data);
    toast.success("Job updated successfully.");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditJobPage = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            labelText="Job Status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Job"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJobPage;
