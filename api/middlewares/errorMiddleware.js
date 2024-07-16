import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "something went wrong, try again later";
  res.status(statusCode).json({ message });
};

export default errorMiddleware;
