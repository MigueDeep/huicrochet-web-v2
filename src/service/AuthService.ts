// src/services/AuthService.ts
import { doPost } from "../config/Axios";

interface LoginData {
  email: string;
  password: string;
}

interface tokeData {
  token: string;
  email: string;
}

const AuthService = {
  login: async (data: LoginData) => {
    try {
      const response = await doPost("/auth/signIn", data);
      return response.data; 
    } catch (error) {
      throw error; 
    }
  },
};

const validateToken = {
  login: async (data: tokeData) => {
    try {
      const response = await doPost("/auth/validateToken", data);
      return response.data; 
    } catch (error) {
      throw error; 
    }
  },
};

export default AuthService;
