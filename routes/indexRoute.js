const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});


// router.get("/admin", ensureAuthenticated, (req, res) => {
//   req.sessionStore.all((err, sessions) => {
//     if (err) {
//       console.log("Error retrieving sessions:", err);
//       return res.status(500).send("Error retrieving sessions");
//     }
//     console.log("All Sessions:", sessions);
//     res.json(sessions); // Send sessions as JSON for testing
//   });
// });



router.get("/test-session", (req, res) => {
  req.session.test = "Hello, session!111";
  res.send("Session set11!");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // console.log(req.session)

  if(req.user.hasOwnProperty("provider") && req.user["provider"]=== "github" ){ //check if it from github
    data = {user:{
      name:req.user["username"]
    }}
  }
  else{
    data ={user: req.user}
  }
  res.render("dashboard", data);
  console.log(data)
  
});


module.exports = router;
