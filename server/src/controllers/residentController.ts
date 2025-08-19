import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Residency } from "../entities/residency.entity";
import { User } from "../entities/user.entity";

const residencyRepository = AppDataSource.getRepository(Residency);
const userRepository = AppDataSource.getRepository(User);

export const createResidency = async (req: Request, res: Response) => {
  const response = req.body.data
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
  } = response;

  try {
    const user = await userRepository.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const existingResidency = await residencyRepository.findOne({
      where: { address, userEmail },
    });

    if (existingResidency) {
      return res.status(400).json({
        error: "A residency with this address already exists for this user",
      });
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

    res.status(201).json({
      message: "Residency created successfully",
      residency: savedResidency,
    });
  } catch (err: unknown) {
    console.error("Error creating residency:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAllResidencies = async (req: Request, res: Response) => {
  try {
    const residencies = await residencyRepository.find({
      relations: ["owner"],
      order: {
        createdAt: "DESC",
      },
    });

    res.json(residencies);
  } catch (err: unknown) {
    console.error("Error fetching residencies:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getResidency = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const residency = await residencyRepository.findOne({
      where: { id: parseInt(id) },
      relations: ["owner"],
    });

    if (!residency) {
      return res.status(404).json({ error: "Residency not found" });
    }

    res.json(residency);
  } catch (err: unknown) {
    console.error("Error fetching residency:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};