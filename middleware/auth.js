import bcrypt from "bcrypt";

// Hash Password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// Compare Password
const comparePassword = async (hashedPassword, password) => {
  try {
    return await bcrypt.compare(hashedPassword, password);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };
