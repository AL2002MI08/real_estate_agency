import { Request, Response } from "express";
import { bookVisitService, cancelBookingService, getAllBookingsService, getAllFavoritesService, getUserProfileService, loginUser, registerUser, toggleFavoriteService } from "../services/userService";
import { BookingRequest, FavoriteRequest, UserEmailRequest } from "../types/user.types";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await loginUser(email, password);

    return res.status(200).json({ message: "Login successful", loggedUser });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUserProfileService();
    
    if (!users || users.length === 0) {
      res.status(404).json({ error: "No users found" });
      return;
    }

    res.json({ users });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const bookVisit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, date }: BookingRequest = req.body;
    const { id } = req.params;

    if (!email || !date || !id) {
      res.status(400).json({ error: "Missing required fields: email, date, or id" });
      return;
    }

    const residencyId = parseInt(id);
    if (isNaN(residencyId)) {
      res.status(400).json({ error: "Invalid residency ID" });
      return;
    }

    const result = await bookVisitService(email, residencyId, date);

    if (!result.success) {
      res.status(400).json({ message: result.message });
      return;
    }

    res.json({ message: result.message });
  } catch (error: unknown) {
    if ((error as Error).message === 'User not found') {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: UserEmailRequest = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const bookedVisits = await getAllBookingsService(email);
    res.json({ bookedVisits });
  } catch (error: unknown) {
    if ((error as Error).message === 'User not found') {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: UserEmailRequest = req.body;
    const { id } = req.params;

    if (!email || !id) {
      res.status(400).json({ error: "Missing required fields: email or id" });
      return;
    }

    const residencyId = parseInt(id);
    if (isNaN(residencyId)) {
      res.status(400).json({ error: "Invalid residency ID" });
      return;
    }

    const result = await cancelBookingService(email, residencyId);

    if (!result.success) {
      res.status(404).json({ message: result.message });
      return;
    }

    res.json({ message: result.message });
  } catch (error: unknown) {
    if ((error as Error).message === 'User not found') {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const toFav = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: FavoriteRequest = req.body;
    const { rid } = req.params;

    if (!email || !rid) {
      res.status(400).json({ error: "Missing required fields: email or residency ID" });
      return;
    }

    const residencyId = parseInt(rid);
    if (isNaN(residencyId)) {
      res.status(400).json({ error: "Invalid residency ID" });
      return;
    }

    const result = await toggleFavoriteService(email, residencyId);
    res.json(result);
  } catch (error: unknown) {
    if ((error as Error).message === 'User not found') {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: UserEmailRequest = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const favResidenciesID = await getAllFavoritesService(email);
    res.json({ favResidenciesID });
  } catch (error: unknown) {
    if ((error as Error).message === 'User not found') {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(500).json({ error: (error as Error).message });
  }
};
