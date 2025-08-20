import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/apiTypes";

export function useRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function register(name: string, email: string, password: string, confirmPassword: string) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      throw "All fields are required";
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/user/register`, {
        name,
        email,
        password,
        confirmPassword: confirmPassword
      });
      const { data: user } = res as { data: User};
 

      if (user) {
        localStorage.setItem("token", user.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, register };
}
