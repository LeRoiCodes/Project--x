const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userModel");
const { generateToken } = require("../middleware/authMiddleware")

passport.use(new GoogleStrategy({ 
    callbackURL: process.env.CALLBACK_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
}, 
async (accessToken, refreshToken, profile, done) => {
    // Check if user with same email or id exists in DB if not create one and save in DB
    //const token = jwt.sign({ email: profile.emails }, process.env.JWTSecretKey,{ expiresIn:'14d'});

    const currentUser = await User.findOne({ email : profile.emails[0].value});
    if (!currentUser){
       const newUser = await User.create({
        email: profile.emails[0].value,
        firstName: profile.firstName,
        lastName: profile.lastName,
        password: profile.id,
        isEmployer,
        isGoogle: true,
        isVerified: true,
    }); 
    const token = generateToken(newUser.id)
    const user  = {
        newUser,
        token
    }
    return done(null, user)
    }
    if (currentUser.isGoogle === false){
        return done(null, false, {
            message: `You have previously signed up with a different signin method`
        });
    }
    const token = generateToken(currentUser.id)
    const user = {
        currentUser,
        token
    }
    done(null, user)
})
);
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (_id, done) => {
    const currentUser = await User.findOne({
      _id,
    });
    done(null, currentUser);
  });

module.exports = passport;