import { User } from "./user.model";

const getAllUserFromBD = async () => {
  const result = await User.find();

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

const getLoginUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateUsertoDB = async (id: string, payLoad: { role: string }) => {
  let newRole;
  if (payLoad?.role === "admin") {
    newRole = "user";
  } else {
    newRole = "admin";
  }

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { role: newRole },
    { new: true }
  );
  return result;
};

export const UserService = {
  getAllUserFromBD,
  getLoginUserFromDB,
  updateUsertoDB,
  deleteUserFromDB,
};
