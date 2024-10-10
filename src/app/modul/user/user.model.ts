import { Schema, model } from "mongoose";
import { TUser } from "./user.interfact";
import { USER_STATUS } from "./user.constants";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [5, "Name required minimum 5 characters"],
    },
    email: { type: String, required: [true, "Emain Required"], unique: true },
    password: {
      type: String,
      required: [true, "Password Required"],
    },
    phone: { type: String },
    profileImage: { type: String, default: null },
    address: {
      type: String,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },

    follower: {
      totalFollow: { type: Number, default: null },
      followId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    following: {
      totalFollowing: { type: Number, default: null },
      followingId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },

    timestamps: true,
  }
);

export const User = model("User", userSchema);
