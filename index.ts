import express, { Application, Request, Response, NextFunction } from "express";
import express_fileupload from "express-fileupload";
import mongoose from "mongoose";
import routes from "./api/v1/src/routes";
import passport from "passport";
import session from "express-session";
import  {strategy,facebook_strategy, google_strategy}  from "./config";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express_fileupload());
app.use(passport.initialize());
strategy(passport);
facebook_strategy(passport)
google_strategy(passport)
//app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(session({ secret: 'keyboard cat', resave:true,saveUninitialized:true}));

(async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://sarabpreet:Sarab123@cluster0.nxyuq.mongodb.net/phone",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => console.log("connected to db"))
      .catch((err: any) => console.log(err));
  } catch (err) {
    console.log(err);
  }
})();
app.use(
  "/api",
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  routes
);
const PORT = 3007 || process.env.PORT;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
