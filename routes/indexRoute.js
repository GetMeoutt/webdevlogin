const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const fs = require("fs/promises")
const path = require("path");
const { error } = require("console");

const allsession2=[]

router.get("/", (req, res) => {
  res.send("welcome");
  
});


router.get("/admin", ensureAuthenticated, async (req, res) => {
  
    
    req.sessionStore.all((err, sessions) => {
      if (err) {
        console.error("Error retrieving sessions:", err);
      } else {
        
        res.render("admin", {sessions})
          
        
      }
      })
})




router.get("/dashboard", ensureAuthenticated, (req, res) => {
  
  if (!allsession2.some(session => session.id === req.sessionID && session.usrid === req.user.id)) {
    allsession2.push({id: req.sessionID, usrid: req.user.id});
  }
  


  
  if(req.user.hasOwnProperty("provider") && req.user["provider"]=== "github" ){ 
    data = {user:
      
      {name:req.user["username"],}}
  }
  else{
    data ={user: req.user}
  }
  res.render("dashboard", data);
  
  
  
});


module.exports = router;
