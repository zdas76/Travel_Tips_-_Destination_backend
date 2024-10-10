import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandaler from "./app/meddleware/globalErrorHandler";
import notFound from "./app/meddleware/notFound";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  Credential: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//global error handler
app.use(globalErrorHandaler);

//handle not found
app.use(notFound);

export default app;
