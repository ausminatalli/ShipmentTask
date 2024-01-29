import { Sequelize } from "sequelize";
const config = require("./config.json");

const env = process.env.NODE_ENV || "development";

const { username, password, database, host } = config[env];

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
  logging: false,
});

export default sequelize;
