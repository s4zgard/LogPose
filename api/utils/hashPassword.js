import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  return hashed;
};
