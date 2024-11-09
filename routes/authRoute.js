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



router.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    console.log(err)

    res.redirect("/auth/login")
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







module.exports = router;