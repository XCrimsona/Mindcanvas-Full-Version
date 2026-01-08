import bcrypt from "bcryptjs";

export class PasswordService {

  #saltStrength = 12;

  hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(this.#saltStrength);
    return await bcrypt.hash(password, salt);
    // }
    // catch (err) {
    // return res.status(500).json({ message: err.message + " :and " + err.stack })
    // };
  }

  comparePasswords = async (
    plainTextPassword,
    hashPassword
  ) => {
    // try {
    const match = await bcrypt.compare(plainTextPassword, hashPassword);
    // console.log("comparing: ", match);
    return match;
    // }
    // catch (err) {
    // return res.status(500).json({ message: err.message + " :and " + err.stack })
    // };
  };
}
