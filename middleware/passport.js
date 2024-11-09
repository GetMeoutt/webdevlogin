const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const User = require("../controllers/User.js")
const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);


var GitHubStrategy = require('passport-github').Strategy;


const githubLogin = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile)
    done(null,profile)
  }

  
)


passport.use(githubLogin)
passport.use(localLogin)


passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user); 
});









// hint: express-session list, destroy






// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   let user = userController.getUserById(id);
//   if (user) {
//     done(null, user);
//   } else {
//     done({ message: "User not found" }, null);
//   }
// });

module.exports = passport;

