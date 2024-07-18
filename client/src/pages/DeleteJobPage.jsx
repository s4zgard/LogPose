import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/jobs/${params.id}`);
    toast.success("Job deleted successfully.");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/all-jobs");
};
