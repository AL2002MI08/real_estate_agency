import z from "zod";
import { createResidencySchema } from "../validation/authValidator";

export type CreateResidencyRequest = z.infer<typeof createResidencySchema>;
export interface ResidencyData {
  title: string;
  description: string;
  price: number;
  address: string;
  country: string;
  city: string;
  facilities: { [key: string]: boolean | string | number };
  image?: string;
  userEmail: string;
}

export interface ResidencyResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  country: string;
  city: string;
  facilities: string[];
  image?: string;
  userEmail: string;
  owner: any;
  createdAt: Date;
  updatedAt: Date;
}

export function extractResidencyData(request: CreateResidencyRequest): ResidencyData {
    return request.data;

}