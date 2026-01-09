import express from "express";
import {
  createGroup,
  getGroupInfoById,
  getNearbyGroups,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", createGroup);
router.get("/nearby", getNearbyGroups);
router.get("/:id", getGroupInfoById);

export default router;
