import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user";
import jwt from "jsonwebtoken";

var callbackURL = "http://localhost:3000/api/google/callback";
if (process.env.NODE_ENV === "production")
  callbackURL = "https://kotbi.elmajdoub.live/api/google/callback";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({
          email: profile.email,
        });
        const token = await jwt.sign(
          {
            id: user?._id,
          },
          process.env.JWT_SECRET as string
        );
        if (user) return done(null, token, { message: "Success" });
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.email,
          provider: "google",
        });
        const userSign = newUser.signJwt();
        return done(null, userSign.token, { message: "Success" });
      } catch (error) {
        done(error, false, { message: "Something went wrong googleAuth" });
      }
    }
  )
);
