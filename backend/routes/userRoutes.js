const express = require("express");
const {
  registerUser,
  createRecord,
  getAllRecords,
  getSingleRecord,
  updateRecord,
  deleteRecord,
  loginUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/Auth");

const router = express.Router();

//routes
router.post("/login", isAuthenticatedUser, loginUser);
router.post("/register", registerUser);
router.post("/create", createRecord);
router.get("/allrecords", getAllRecords);
router.get("/record/:id", getSingleRecord);
router.put("/updaterecord/:id", updateRecord);
router.delete("/deleterecord/:id", deleteRecord);

module.exports = router;
