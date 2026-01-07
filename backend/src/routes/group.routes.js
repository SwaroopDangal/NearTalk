import express from "express";
import {
  createGroup,
  getNearbyGroups,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", createGroup);
router.get("/nearby", getNearbyGroups);

export default router;
