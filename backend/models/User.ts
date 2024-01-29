import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import * as bcrypt from "bcrypt";
import Shipments from "./Shipments";
class Users extends Model {
  public user_id!: number;
  public fname!: string;
  public lname!: string;
  public email!: string;
  public password!: string;
  public mobilenumber!: string;
  public profileimage!: string;
  public emailToken!: string;
  public tokenExpiry!: Date;
  public isVerified!: boolean;
  public dateofbirth!: Date;
  public isAdmin!: Boolean;
}
Users.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty",
        },
      },
    },
    lname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    profileimage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateofbirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mobilenumber: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
      //checks if email exists
      // beforeValidate: async (user: Users) => {
      //   const existingUser = await Users.findOne({
      //     where: { email: user.email },
      //   });

      //   if (existingUser) {
      //     throw new Error("Email is already in use");
      //   }
      // },
      //hashs the password
      beforeCreate: async (user: Users) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      },
    },
  }
);
Users.hasMany(Shipments, {
  foreignKey: "owner_id",
  as: "shipments",
});

export default Users;
