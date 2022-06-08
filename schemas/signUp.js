const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid E-mail",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "please add a password"],
      minlength: [6, "password must have at least six(6) characters"],
      match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters",
      ],
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//encrypting password before saving
signUpSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//VERIFY PASSWORD
signUpSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

//get the token
signUpSchema.methods.jwtGenerateToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRETE,
    { expiresIn: 3600 }
  );
};

module.exports = mongoose.model("signup", signUpSchema);
