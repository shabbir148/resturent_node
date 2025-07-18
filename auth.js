const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person.js");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
      if (!user) {
        done(null, false, { message: "Invalid username" });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        done(null, false, { message: "Invalid password" });
      }
      else{
        done(null, user);
      }
     } catch (error) {
      done(error);
    }
  })
);

module.exports = passport;
