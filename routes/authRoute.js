const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();
const app = express()

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login"}),
  (req,res)=>{
  
    if (req.user["id"] === 0){
      res.redirect("/admin")
    }
    else{
      res.redirect("/dashboard")
    }
  }
);



router.get('/logout', (req, res) => {
  // Destroy the session on the server
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out");
    }

    
    res.clearCookie('connect.sid'); 
    res.redirect('/auth/login');     
  });
});

// router.get("/logout", (req, res, next) => {
//   req.logout((err) => {  // Logs out the user, removes `req.user`
//     if (err) return next(err);
//     req.session.destroy(() => {  // Clears all session data
//       res.clearCookie("connect.sid");  // Clears the session cookie in the browser
//       res.redirect("/auth/login");  // Redirects to the login page
//     });
//   });
// });

router.get('/github',
  passport.authenticate('github',{ prompt: "login" }));

router.get('/github/callback', 
  
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    

    res.redirect('/dashboard');
  });

router.post("/deletesession",(req,res)=>{
  console.log(req.body)
  const destroysessionID = req.body.sessionId

  req.sessionStore.destroy(  destroysessionID, function(data,error){});
  res.redirect("/admin")
})





module.exports = router;
