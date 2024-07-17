import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../utils/customErrors.js";
import { verifyJWT } from "../utils/generateToken.js";

export const protect = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { _id: userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const admin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") throw new UnauthorizedError("You are not authorized");
  next();
};
