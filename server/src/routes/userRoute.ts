import express from "express";
import {
  bookVisit,
  cancelBooking,
  register,
  getAllBookings,
  getAllFavorites,
  getUserProfile,
  login,
  toFav,
} from "../controllers/userController";
import jwtCheck from "../middleware/auth";
import { validate } from "../middleware/validator";
import { loginSchema, registerSchema } from "../validation/authValidator";
const router = express.Router();

router.post("/register",validate(registerSchema),  register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", getUserProfile);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav/", jwtCheck, getAllFavorites);
export { router as userRoute };
