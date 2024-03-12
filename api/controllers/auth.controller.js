export const signupController = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.sendStatus(400);
  //create User schema
  // const emailExist = User.find({ email });
  res.sendStatus(201);
};
