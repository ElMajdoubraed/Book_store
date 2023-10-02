import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

var validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      enum: ["jwt", "google"],
      default: "jwt",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (!this.password) {
    this.provider = "google";
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

schema.methods.comparePassword = function (plain: string) {
  return bcrypt.compareSync(plain, this.password);
};

schema.methods.signJwt = function () {
  let data: any = { id: this._id };
  data.token = jwt.sign(data, process.env.JWT_SECRET as string);
  return data;
};

schema.methods.isAdmin = function () {
  return this.role === "admin";
};

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.User || mongoose.model("User", schema);
