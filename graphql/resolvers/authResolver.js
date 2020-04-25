const User = require("./../../models/users");
const bcrypt = require("bcryptjs");

module.exports ={
  createUser: async (args) => {
    const { name, email, password } = args.userInput;

    try {
      const user = User.findOne({ email: email });
      if (user) {
        throw new Error(" User alredy exist!");
      }

      const hashPassword = bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        hashPassword,
      });
      const userResult = await newUser.save();

      return { ...userResult._doc, password: null };
    } catch (error) {
      throw error;
    }
  },
};
