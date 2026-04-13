import bcrypt from "bcryptjs";

export class PasswordService {

  #saltStrength = 12;

  hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(this.#saltStrength);
    return await bcrypt.hash(password, salt);
  }

  comparePasswords = async (
    plainTextPassword,
    hashPassword
  ) => {
    // try {
    const match = await bcrypt.compare(plainTextPassword, hashPassword);
    // console.log("comparing: ", match);
    return match;
  };
}
