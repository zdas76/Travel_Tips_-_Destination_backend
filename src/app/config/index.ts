import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  db_rul: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
  saltRounds: process.env.SALTROUNDS,
  access_secret: process.env.ACCESS_SECRET,
  access_expires_in: process.env.ACCESS_EXPRIES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES,
  reset_pass_link: process.env.RESET_PASSWORD_LINK,
};
