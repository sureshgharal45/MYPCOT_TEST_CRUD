const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const userRecordModel = require("../models/userRecordModel");

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user is not giving email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Pasword", 400));
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email,password, gender } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    return next(new ErrorHandler("User has already been registered", 401));
  }

  const user = await User.create({ name, email, password, gender });

  sendToken(user, 201, res);
});

//create new record
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  const { name, description, categories, status } = req.body;

  if (!name || !description || !categories || !status) {
    return next(
      new ErrorHandler(
        "All the fields are mandatory, please fill the blank fields",
        401
      )
    );
  }
  const user = await userRecordModel.create({
    name,
    description,
    categories,
    status,
  });


  res.status(200).json({
    user,
    success: true,
  });
});

//get all records
exports.getAllRecords = catchAsyncErrors(async (req, res, next) => {
  const search = req.query.search || "";
  const status = req.query.status || "";
  const query = {
    name: { $regex: search, $options: "i" },
  };

  if (status !== "All") {
    query.status = status;
  }
  const records = await userRecordModel.find(query);
  res.status(200).json({
    records,
    success: true,
  });
});

//get single record
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const record = await userRecordModel.findById(req.params.id);

  if (!record) {
    return next(
      new ErrorHandler(`user does not exists with Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    record,
  });
});

//update record
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
    status: req.body.status,
  };

  const updatedRecord = await userRecordModel.findByIdAndUpdate(
    req.params.id,
    newUserData
  );

  res.status(200).json({
    success: true,
    updatedRecord,
  });
});

//delete record
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const record = await userRecordModel.findById(req.params.id);

  if (!record) {
    return next(
      new ErrorHandler(`user does not exists with Id: ${req.params.id}`, 404)
    );
  }

  await record.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
