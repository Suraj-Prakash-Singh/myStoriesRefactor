export const signupController = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log('this code run');
  res.sendStatus(200);
};
