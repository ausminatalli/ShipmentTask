import express = require("express");
import { ResetPassword, VerifyPassword, Waybill } from "../controllers/MailController";
import { verifyAdmin } from "../middleware/verifyToken";

const router = express.Router();

// router.get("/test", (req: Request, res: Response, next: NextFunction) => {
//   res.send("You are Authorized to delete your account");
// });

router.post("/verifySent", VerifyPassword);
router.post("/reset", ResetPassword);
router.post("/waybill",verifyAdmin, Waybill);

export default router;
