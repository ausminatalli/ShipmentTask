import express = require("express");
import {
  addUser,
  deleteUser,
  filterUsers,
  getAllUsers,
  updateUser,
} from "../controllers/UserController";
import { verifyAdmin } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);
router.post("/", verifyAdmin, addUser);
router.put("/", verifyAdmin, updateUser);
router.delete("/", verifyAdmin, deleteUser);
router.post("/filter", verifyAdmin, filterUsers);

export default router;
