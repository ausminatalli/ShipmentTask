import express = require("express");
import {
  addShimpent,
  filterShipments,
  filterShipmentsByUserID,
  getAllShipments,
  getShipmentByWaybill,
  getUserShipments,
  updateShipmenyByID,
} from "../controllers/ShipmentsController";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken";

const router = express.Router();
router.get("/", verifyAdmin, getAllShipments);
router.post("/", verifyUser, addShimpent);
router.get("/:ownerid", verifyUser, getUserShipments);
// router.put("/:id", updateShipmenyByOwnerID);
// router.put("/:ownerid", updateShipmenyByOwnerID);filterShipments
router.put("/:id", verifyUser, updateShipmenyByID);
router.get("/waybill/:waybill", getShipmentByWaybill);
router.post("/filter", verifyUser, filterShipments);
router.post("/filter/:ownerID", verifyUser, filterShipmentsByUserID);

export default router;
