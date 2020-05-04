const User = require("./../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

module.exports ={
  createUser: async (args) => {
    const { name, email, password } = args.userInput;
    try {
      const user = await User.findOne({ email: email });
      console.log(user)
      if (user) {
        throw new Error(" User alredy exist!");
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password:hashPassword,
      });
      const userResult = await newUser.save();

      return { ...userResult._doc, password: null };
    } catch (error) {
      throw error;
    }
  },
  login : async ({email, password}) => {
    
    user = await User.findOne({email:email});
    if(!user){
      throw new Error("User does not exist!")
    }
    
    passwordIsCorrect = await bcrypt.compare(password, user.password);
    console.log(passwordIsCorrect)
    if(!passwordIsCorrect){
      throw new Error("Incorrect password!")
    }
    const token = jwt.sign({userId:user._id, email: user.email}, "secretkey?", {expiresIn:"1h"});
    console.log(token)
    return({
      _id:user._id,
      token,
      tokenExpiration:1
    })
  }
};
