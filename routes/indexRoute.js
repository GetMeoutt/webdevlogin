const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const fs = require("fs/promises")
const path = require("path");
const { error } = require("console");



router.get("/", (req, res) => {
  res.send("welcome");
});


router.get("/admin", ensureAuthenticated, async (req, res) => {
  try{


    const session_detail={
      sessionID:[],
      UserID:[]
      // session_detail.sessionID.push(path.basename(session,path.extname(session)))

    }
    const allSession = await fs.readdir("./sessions")
    

    await Promise.all(
      allSession.map(async (session) => {
        session_detail.sessionID.push(path.basename(session, path.extname(session)));
        
        const data = await fs.readFile(path.join("sessions", session), "utf8");
        const sessionFile = JSON.parse(data);
        session_detail.UserID.push(sessionFile.passport.user.id);  
        console.log("here",Object.keys(sessionFile.passport.user.id))
      })
    );
    
    res.render("admin", { session_detail });


  }
  catch(err){
    console.log(err)
  }
  
  
   
})



router.get("/dashboard", ensureAuthenticated, (req, res,next) => {
  // console.log(req.session)
  console.log("Cookie connect.sid:", req.cookies['connect.sid']);  // Logs the cookie value
  console.log("Session ID from req.sessionID:", req.sessionID);
next()
  if(req.user.hasOwnProperty("provider") && req.user["provider"]=== "github" ){ //check if it from github
    data = {user:
      
      {name:req.user["username"],}}
  }
  else{
    data ={user: req.user}
  }
  res.render("dashboard", data);
  console.log(data)
  
});


module.exports = router;
