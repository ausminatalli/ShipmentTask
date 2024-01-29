import { NextFunction, Request, Response } from "express";
import Shipments from "../models/Shipments";
import generateWaybill from "../utils/generateWaybill";
export const getAllShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shipments = await Shipments.findAll();
    return res.status(200).json(shipments);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Shipments" });
  }
};

export const getUserShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner_id = req.params.ownerid;
    const users = await Shipments.findAll({ where: { owner_id: owner_id } });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Shipments" });
  }
};

export const getShipmentByWaybill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const waybill = req.params.waybill;
    const users = await Shipments.findOne({ where: { waybill: waybill } });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Shipments" });
  }
};

export const updateShipmenyByOwnerID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner_id = req.params.ownerid;
    const data = req.body;
    const [updatedRowsCount] = await Shipments.update(data, {
      where: { owner_id: owner_id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Shipment's User not found" });
    }
    res.status(200).json({ message: "Shipment Updated" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to Update Shipments" });
  }
};

export const updateShipmenyByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const [updatedRowsCount] = await Shipments.update(data, {
      where: { shipment_id: id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    return res.status(200).json({ message: "Shipment Updated" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to Update Shipments" });
  }
};

export const addShimpent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      customer_name,
      customer_address,
      customer_phone,
      owner_id,
      shipment_image,
    } = req.body;

    if (!customer_name || !customer_address || !customer_phone || !owner_id) {
      return res.status(401).json({ message: `Missing fields` });
    }
    const waybill = generateWaybill();
    const addShipment = await Shipments.create({
      customer_name,
      customer_address,
      customer_phone,
      owner_id,
      shipment_image,
      waybill,
    });

    return res.status(200).json(addShipment);
  } catch (error) {
    return res.status(500).json({ error: `Failed to add Shipment ${error}` });
  }
};

export const filterShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await req.body;

  try {
    const whereClause: any = {};
    if (data.customer_name) {
      whereClause.customer_name = data.customer_name.trim();
    }

    if (data.customer_phone) {
      whereClause.customer_phone = data.customer_phone;
    }
    if (data.waybill) {
      whereClause.waybill = data.waybill;
    }

    if (data.status) {
      whereClause.status = data.status;
    }

    const filteredData = await Shipments.findAll({
      where: whereClause,
    });
    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const filterShipmentsByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerID = req.params.ownerID;

  const data = await req.body;
  try {
    const whereClause: any = {};
    if (data.customer_name) {
      whereClause.customer_name = data.customer_name.trim();
    }

    if (data.customer_phone) {
      whereClause.customer_phone = data.customer_phone;
    }
    if (data.waybill) {
      whereClause.waybill = data.waybill;
    }

    if (data.status) {
      whereClause.status = data.status;
    }
    whereClause.owner_id = ownerID;

    const filteredData = await Shipments.findAll({
      where: whereClause,
    });
    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
