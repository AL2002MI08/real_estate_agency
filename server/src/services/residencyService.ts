import { AppDataSource } from "../config/database";
import { Residency } from "../entities/residency.entity";
import { User } from "../entities/user.entity";
import {
  CreateResidencyRequest,
  ResidencyResponse,
  extractResidencyData
} from "../types/residency.types";

const residencyRepository = AppDataSource.getRepository(Residency);
const userRepository = AppDataSource.getRepository(User);

export const createResidencyService = async (
  residencyData: CreateResidencyRequest
): Promise<{
  success: boolean;
  message: string;
  residency?: ResidencyResponse;
  savedResidency?: ResidencyResponse;
}> => {

  const data = extractResidencyData(residencyData);
  
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = data;

  try {
    const user = await userRepository.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingResidency = await residencyRepository.findOne({
      where: { address, userEmail },
    });

    if (existingResidency) {
      return {
        success: false,
        message: "A residency with this address already exists for this user",
      };
    }

    const residency = residencyRepository.create({
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
      owner: user,
    });

    const savedResidency = await residencyRepository.save(residency);

    return {
      success: true,
      message: "Residency created successfully",
      residency: {
        ...savedResidency,
        facilities: Object.entries(savedResidency.facilities || {}).map(([key, value]) => 
          typeof value === 'boolean' && value ? key : `${key}: ${value}`
        ).filter(Boolean),
      },
    };
  } catch (error: unknown) {
    console.error("Error in createResidencyService:", error);
    throw new Error((error as Error).message);
  }
};