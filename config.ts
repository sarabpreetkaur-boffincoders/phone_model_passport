import { Strategy } from "passport-local";
import user_record_model from "./api/v1/src/model/user_model";
import bcrypt from "bcrypt";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const strategy = (passport) =>
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
      },
      async function (email, password, done) {
        await user_record_model.findOne(
          { email: email },
          async function (err, user) {
            //console.log(user)
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            if (user) await bcrypt.compare(password, user.password);
            return done(null, user);
          }
        );
      }
    )
  );

export const facebook_strategy = (passport) =>
  passport.use(
    new FacebookStrategy(
      {
        clientID: "1166390110437720",
        clientSecret: "17339b803aea9dec6de807dd9c0ff4b6",
        callbackURL: "http://localhost:3007/api/v1/login/facebook/callback",
        profileFields: ["emails", "name"],
        //enableProof: true,
        authType:"reauthenticate"
      },
      async function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
        //  await  user_record_model.find({ facebookId: profile.id }, function (err, user) {
        //     return cb(err, profile);
        //   });
      }
    )
  );

  export const google_strategy = (passport) =>
  passport.use(new GoogleStrategy({
    clientID: '238909280266-a7sg6hndnq7egke8nd0qv6cehvmnb2ul.apps.googleusercontent.com',
    clientSecret:'QkOfKhkPDZu4NH8YCmtulPyp',
    callbackURL: "http://localhost:3007/api/v1/login/google/callback",
    
  },
  function(accessToken, refreshToken, profile, cb) {
   return cb (null,profile)
  }
));