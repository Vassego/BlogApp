import { Schema, Types, model } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    blogs: [
      {
        type: Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);
const userModel = model("User", userSchema);
export default userModel;
