// src/services/AuthService.ts
import { doPost } from "../config/Axios";

interface LoginData {
  email: string;
  password: string;
}

interface TokenData {
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

  validateToken: async (data: TokenData) => {
    try {
      const response = await doPost("/auth/validateToken", data);
      return response.data; 
    } catch (error) {
      throw error; 
    }
  }

};


export default AuthService;
