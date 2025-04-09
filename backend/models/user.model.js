import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User FirstName is required"],
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: [true, "User LastName is required"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  },
  username: {
    type: String,
    required: [true, "User Username is required"],
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
