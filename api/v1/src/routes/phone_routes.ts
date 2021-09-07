import { Router } from "express";
import Phone_detail from "../controller";
import passport from "passport";
const phone_detail_routes = Router();
phone_detail_routes.route("/phone").post(Phone_detail.phone_detail_controller);
phone_detail_routes.route("/user").post(Phone_detail.user_signup_controller);
phone_detail_routes.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  Phone_detail.user_login_controller
);
phone_detail_routes.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
phone_detail_routes.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/failedlogin",
    prompt: "true",
  }),
  Phone_detail.user_login_controller
);
phone_detail_routes.get("/failedlogin", function (req, res) {
  res.send("login failed");
});
phone_detail_routes.get("/logout", function (req, res) {
  req.logout();
  res.send("user logout");
});

phone_detail_routes.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile email"] })
);
phone_detail_routes.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/failedlogin" }),
  function (req, res) {
    // Successful authentication, redirect home.
    //res.send("logged into google");
    res.send(req.user);
  }
);
phone_detail_routes.get("/failedlogin", function (req, res) {
  res.send("login failed");
});
phone_detail_routes.get("/google/logout", function (req, res) {
  req.logout();
  res.send("user logout");
});

export default phone_detail_routes;
