import User from "../model/User.model.js";

export const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.sendStatus(400);
  
  const existingEmail = await User.findOne({email: email});
  if(existingEmail!=null) {
    res.status(404).send({
      message: "User exists with this email already!"
    });
  }
  else{
    await User.create({
      username: username,
      email: email,
      password: password
    })
  
    res.status(201).send({
      message: "Sign up success!"
    })
  }
};
