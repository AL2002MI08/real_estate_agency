
import { In } from "typeorm";
import { generateToken } from "../middleware/auth";
import { getUserRepository } from "../repositories/user.repository";
import { User, BookedVisit } from '../types/user.types';
import { AppDataSource } from "../config/database";
import { Residency } from "../entities/residency.entity";

import bcrypt from "bcrypt";

const userRepository = getUserRepository();
const residencyRepository = AppDataSource.getRepository(Residency);
export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      email,
      password: hashedPassword,
      name,
      bookedVisits: [],
      favResidenciesID: [],
    });
    const savedUser = await userRepository.save(user);

    return {
      message: "User registered successfully",
      user: savedUser,
    };
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");
     if (!process.env.JWT_SECRET) {
      throw new Error("JWT configuration error");
    }
    const token = generateToken({ id: user.id, email: user.email });

    return { token };
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};


export const getUserProfileService = async (): Promise<User[]> => {
  return await userRepository.find();
};

export const bookVisitService = async (
  email: string, 
  residencyId: number, 
  date: string
): Promise<{ success: boolean; message: string }> => {
  const user = await userRepository.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }

  const alreadyBooked = user.bookedVisits?.some(
    (visit: BookedVisit) => visit.id === residencyId
  );

  if (alreadyBooked) {
    return { success: false, message: 'This residency is already booked by you' };
  }

  const newBooking: BookedVisit = { id: residencyId, date };
  const updatedBookings = user.bookedVisits
    ? [...user.bookedVisits, newBooking]
    : [newBooking];

  await userRepository.update(
    { email },
    { bookedVisits: updatedBookings }
  );

  return { success: true, message: 'Your visit is booked successfully' };
};

export const getAllBookingsService = async (email: string): Promise<BookedVisit[]> => {
  const user = await userRepository.findOne({
    where: { email },
    select: ['bookedVisits'],
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.bookedVisits || [];
};

export const cancelBookingService = async (
  email: string, 
  residencyId: number
): Promise<{ success: boolean; message: string }> => {
  const user = await userRepository.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }

  const originalBookingsLength = user.bookedVisits?.length || 0;
  const updatedBookings = (user.bookedVisits || []).filter(
    (visit: BookedVisit) => visit.id !== residencyId
  );

  if (updatedBookings.length === originalBookingsLength) {
    return { success: false, message: 'Booking not found' };
  }

  await userRepository.update(
    { email },
    { bookedVisits: updatedBookings }
  );

  return { success: true, message: 'Booking cancelled successfully' };
};

export const toggleFavoriteService = async (
  email: string, 
  residencyId: number
): Promise<{ message: string; user: User }> => {
  const user = await userRepository.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }

  const currentFavorites = user.favResidenciesID || [];
  let updatedFavorites: number[];
  let message: string;

  if (currentFavorites.includes(residencyId)) {
    updatedFavorites = currentFavorites.filter((id: number) => id !== residencyId);
    message = 'Removed from favorites';
  } else {
    updatedFavorites = [...currentFavorites, residencyId];
    message = 'Added to favorites';
  }

  const updatedUser = await userRepository.save({
    ...user,
    favResidenciesID: updatedFavorites,
  });

  return { message, user: updatedUser };
};


export const getAllFavoritesService = async (email: string) => {
  const user = await userRepository.findOne({
    where: { email },
    select: ["favResidenciesID"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const favoriteIds = user.favResidenciesID || [];

  if (favoriteIds.length === 0) {
    return [];
  }

  const favoriteProperties = await residencyRepository.find({
    where: { id: In(favoriteIds) },
  });

  return favoriteProperties;
};

