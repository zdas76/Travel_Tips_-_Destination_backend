import { User } from "./../user/user.model";
import { TUser } from "../user/user.interfact";
import { TLoginUser } from "./auth.interfact";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/AppError";
import { sendEmail } from "../../Utiles/sendEmail";
import { createToken, verifyToken } from "./auth.utils";

const createUserInToDB = async (payLoad: TUser) => {
  const isUserExists = await User.findOne({ email: payLoad?.email });
  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This email already used");
  }
  payLoad.password = await bcrypt.hash(
    payLoad.password,
    Number(config.saltRounds)
  );

  const newUser = await User.create(payLoad);

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    mobileNumber: newUser.phone,
    profileImage: newUser.profileImage,
    role: newUser.role,
    status: newUser.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (payLoad: TLoginUser) => {
  const user = await User.findOne({ email: payLoad?.email });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Plase provice a valid email or password!"
    );
  } else if (!payLoad.password) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Plase provice a valid email or password!"
    );
  }

  const match = await bcrypt.compare(payLoad.password, user.password);

  if (!match) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User Not Found");
  }
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.phone,
    profileImage: user.profileImage,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  const isDeleted = user.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.phone,
    profileImage: user.profileImage,
    role: user.role,
    status: user.status,
  };

  const resetToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string
  );

  const resetUIlink = `${config.reset_pass_link}?id=${user._id}&token=${resetToken}`;

  sendEmail(user.email, resetUIlink);
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.phone,
    profileImage: user.profileImage,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string
  );

  return {
    accessToken,
  };
};

const resetPassword = async (
  payload: { email: string; newpassword: string },
  token: string
) => {
  const email = payload?.email;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const verifyToken = jwt.verify(
    token,
    config.access_secret as string
  ) as JwtPayload;

  if (payload.email !== verifyToken.email) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newpassword,
    Number(config.saltRounds)
  );

  await User.findOneAndUpdate(
    {
      email: verifyToken.userId,
      role: verifyToken.role,
    },
    {
      password: newHashedPassword,
    }
  );
};

export const AuthService = {
  createUserInToDB,
  loginUser,
  forgetPassword,
  refreshToken,
  resetPassword,
};
