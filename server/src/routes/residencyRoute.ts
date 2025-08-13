import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residentController";
import jwtCheck from "../middleware/auth";
import { validate } from "../middleware/validator";
import { createResidencySchema } from "../validation/authValidator";
const router = express.Router();

router.post(
  "/create",
  jwtCheck,
  validate(createResidencySchema),
  createResidency
);
router.get("/allresidencies",getAllResidencies);
router.get("/:id", getResidency);
export { router as residencyRoute };
