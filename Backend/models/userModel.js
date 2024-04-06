const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (
        !value.match(/\d/) ||
        !value.match(/[a-zA-Z]/) ||
        !value.match(/[!@#$%^&*(),.?":{}|<>]/)
      ) {
        throw new Error(
          "Password must contain at least one letter, one number, and one special character."
        );
      }
    },
    minlength: 8,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const USER = new mongoose.model("User", userSchema);
module.exports = USER;
