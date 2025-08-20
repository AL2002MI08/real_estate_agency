import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import type { APIUser } from "../types/apiTypes";

export default function useLogin() {
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string): Promise<APIUser> {
    if (!email.trim().length || !password) {
      throw new Error("All fields are required");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/user/login`, { email, password });
      const { data: user } = res as { data: APIUser };
      return user;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, login };
}
