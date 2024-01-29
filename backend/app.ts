const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
import * as cookieParser from "cookie-parser";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import MailRoute from "./routes/mailer";

import ShipmentRoute from "./routes/shipment";
const app = express();

app.use(express.json());
dotenv.config({ path: ".env.example" });
const port = process.env.PORT || 8000;

app.use(cors({ origin: process.env.Client_url, credentials: true }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/shipment", ShipmentRoute);
app.use("/request", MailRoute);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
module.exports = app;
