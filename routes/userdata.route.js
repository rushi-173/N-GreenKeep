const express = require("express");
const router = express.Router();
const UserData = require("../models/UserData");
const verify = require("./verifyToken");

//Get user's wishlist
router.get("/", verify, async (req, res) => {
  try {
    const userdata = await UserData.findOne({ user_id: req.user._id });
    res.status(200).json(userdata);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's wishlist or update previous wishlist
router.post("/notes", verify, async (req, res) => {
  const hasUserdata = await UserData.find({ user_id: req.user._id});
  if(hasUserdata.length !== 0){
    try {
      const savedUserdata = await UserData.findOneAndUpdate(
        { user_id: req.user._id },
        { notes: req.body.notes },
        {},
        async function (err, result) {
          if(err){
            console.log(err)
          }
        }
      );
      res.status(200).json(savedUserdata);
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err });
    }
  }
 

 
});


module.exports = router;
