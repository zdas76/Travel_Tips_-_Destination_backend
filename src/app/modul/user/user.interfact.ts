import { USER_ROLE, USER_STATUS } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profileImage?: string;
  address?: string;
  role: TUserRole;
  follower: TFollower;
  following: TFollowing;
  status: TUserStatus;
  isDeleted: boolean;
};

export type TFollower = {
  totalFollow: number;
  followId: [string];
};

export type TFollowing = {
  totalFollowing: number;
  FollowingId: [string];
};
export type TUserRole = keyof typeof USER_ROLE; // "admin" | "user";

export type TUserStatus = keyof typeof USER_STATUS;
