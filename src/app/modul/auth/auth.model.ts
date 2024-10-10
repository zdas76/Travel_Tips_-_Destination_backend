// import { Schema, model } from "mongoose";
// import { TUser } from "../user/user.interfact";

// const userSchema = new Schema<TUser>(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//       minlength: [5, "Name required minimum 5 characters"],
//     },
//     email: { type: String, required: [true, "Emain Required"] },
//     password: { type: String, required: [true, "Password Required"] },
//     phone: { type: String, required: [true, "Phone number is required"] },
//     role: { type: String, enum: ["admin", "user"], default: "user" },
//     address: {
//       type: String,
//       minlength: [10, "Address required minimum 50 characters"],
//     },
//   },
//   { timestamps: true }
// );

// export const User = model("User", userSchema);
