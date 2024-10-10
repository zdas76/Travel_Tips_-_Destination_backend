import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // true for port 465, false for other ports
    auth: {
      user: "zdas86@gmail.com",
      pass: "jyap kyto iylr ulec",
    },
  });

  await transporter.sendMail({
    from: '"Mrinal_Travel_Tips" <zdas86@gmail.com>', // sender address
    to,
    subject: "Reset your password within 5 mins!", // Subject line
    text: "", // plain text body
    html, // html body
  });
};
