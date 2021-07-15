const router = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const UserData = require("../models/UserData");
router.get("/", (req, res) => {
  res.send("Welcome to login");
});
router.post("/register", async (req, res) => {
  //validating
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  
  try {
    const savedUser = await user.save();
    const userdata = new UserData({
    user_id: savedUser.id,
    notes: [
      {
        id : "874f008-178e-a5ac-d37-4c0e58a4df34",
        title: "",
        text: "",
        tag: "All Notes",
        time: "00:00",
        date: "0000-00-00",
        edited : "00-00-0000"
    }
    ],
    tags:[]
  })
  const savedUserdata = userdata.save()

    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login

router.post("/login", async (req, res)=>{

  const {error} = loginValidation(req.body);
  if(error) return res.send(error.details[0].message);

  //check email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Email is not found, Sign Up instead");
  
  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send('Invalid Password');

  //create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('Token', token).json({token:token, user:user});
   
});

module.exports = router;
