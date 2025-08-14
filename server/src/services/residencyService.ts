import { AppDataSource } from "../config/database";
import { Residency } from "../entities/residency.entity";
import { User } from "../entities/user.entity";
import {
  CreateResidencyRequest,
  ResidencyResponse,
} from "../types/residency.types";
import { createResidencySchema } from "../validation/authValidator";

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
  try {
    createResidencySchema.parse(residencyData);
  } catch (error: any) {
    const errorMessages = error.errors.map(
      (err: any) => `${err.path.join(".")}: ${err.message}`
    );
    throw new Error(`Validation failed: ${errorMessages.join(", ")}`);
  }

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
  } = residencyData;

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
        facilities: Object.values(savedResidency.facilities).map((value) => String(value)),
      },
    };
  } catch (error: unknown) {
    console.error("Error in createResidencyService:", error);
    throw new Error((error as Error).message);
  }
};
