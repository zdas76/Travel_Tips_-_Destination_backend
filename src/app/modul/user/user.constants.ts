export const USER_ROLE = {
  admin: "admin",
  user: "user",
} as const;

export const USER_STATUS = {
  PREMIUM: "PREMIUM",
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export const UserSearchableFields = [
  "name",
  "email",
  "phone",
  "role",
  "status",
];
