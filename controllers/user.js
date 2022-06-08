const User = require("../schemas/signUp");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new ErrorResponse("E-mail already exists", 400));
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("E-mail and password required", 400));
    }

    //check user email
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Invalid E-mail ", 400));
    }

    //verify password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid E-mail or password", 400));
    }

    generateToken(user, 200, res);

    //check user password
  } catch (error) {
    console.log(error);

    return next(new ErrorResponse("Invalid E-mail or password", 400));
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    // expires: new Date(Date.now() + process.env.EXPIRE_TOKEN),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

//logout User
exports.logOut = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
