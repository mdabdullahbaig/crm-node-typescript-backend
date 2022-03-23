import { Router } from "express";
import {
  createLead,
  deleteLeadById,
  getLeadById,
  getLeads,
  updateLeadById,
} from "../controller/leadController";

const router: Router = Router();

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.patch("/:id", updateLeadById);
router.delete("/:id", deleteLeadById);

export default router;
