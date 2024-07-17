import jwt from "jsonwebtoken";

export const generateJWT = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  return res.cookie("token", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};
