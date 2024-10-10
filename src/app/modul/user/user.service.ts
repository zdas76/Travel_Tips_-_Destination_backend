import { User } from "./user.model";

const getAllUserFromBD = async () => {
  const result = await User.find();

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

const getOneUserFromDB = () => {};

const updateUsertoDB = async (id: string, payLoad: { role: string }) => {
  console.log(id, payLoad);
  let newRole;
  if (payLoad?.role === "admin") {
    newRole = "user";
  } else {
    newRole = "admin";
  }
  console.log("first", newRole);
  const result = await User.findByIdAndUpdate(
    { _id: id },
    { role: newRole },
    { new: true }
  );
  return result;
};

export const UserService = {
  getAllUserFromBD,
  getOneUserFromDB,
  updateUsertoDB,
  deleteUserFromDB,
};
