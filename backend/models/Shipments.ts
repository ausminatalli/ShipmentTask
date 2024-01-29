import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Shipments extends Model {
  public shipment_id!: number;
  public waybill!: string;
  public customer_name!: string;
  public customer_address!: string;
  public customer_phone!: string;
  public owner_id!: number;
  public shipment_image!: string;
  public status!:
    | "Pending"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
}

Shipments.init(
  {
    shipment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    waybill: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Waybill empty",
        },
      },
    },
    customer_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    customer_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address cannot be empty",
        },
      },
    },
    customer_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone cannot be empty",
        },
      },
    },
    shipment_image: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Owner ID required",
        },
      },
    },
    status: {
      type: DataTypes.ENUM(
        "Pending",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
      ),
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "shipments",
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Shipments;
