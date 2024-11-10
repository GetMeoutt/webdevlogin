const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const fs = require("fs/promises")
const path = require("path");
const { error } = require("console");

const allsession2={}

router.get("/", (req, res) => {
  res.send("welcome");
});


router.get("/admin", ensureAuthenticated, async (req, res) => {
  try{
    console.log("v2",allsession2)


    
    const allSession = await fs.readdir("./sessions")
    const session_detail={}

    await Promise.all(
      allSession.map(async (session) => {

        
        // session_detail.sessionID.push(path.basename(session, path.extname(session)));

        if (!(path.basename(session, path.extname(session)) in session_detail)){
          const data = await fs.readFile(path.join("sessions", session), "utf8");
          const sessionFile = JSON.parse(data);
          session_detail[path.basename(session, path.extname(session))]={

            "userid":sessionFile.passport.user.id
          }
        }
        
        
        
      })
    );
    
    
    res.render("admin", { session_detail });


  }
  catch(err){
    console.log(err)
  }
  
  
   
})



router.get("/dashboard", ensureAuthenticated, (req, res,next) => {
  console.log(req.sessionID)
  console.log((!(req.sessionID in allsession2)))
  if (!(req.sessionID in allsession2)){
    allsession2[req.sessionID]={"id":req.user.id}
    console.log("addusertoolist")
  }
  
  console.log("Cookie connect.sid:", req.cookies['connect.sid']);  
  console.log("Session ID from req.sessionID:", req.sessionID);
next()

  
  if(req.user.hasOwnProperty("provider") && req.user["provider"]=== "github" ){ 
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
