// src/services/AuthService.ts
import { doGet, doPut, doPutId } from "../config/Axios";

const UserService = {
        getUsers: async () => {
            try {
            const response = await doGet("/auth/getAll");
            return response.data;
            } catch (error) {
            throw new Error(
                "An error occurred while fetching users. Please try again."
            );
            }
        },

        changeUserStatus: async (id: string) => {
            try {
            const response = await doPutId(`/user/changeStatus/${id}`);
            return response.data;
            } catch (error) {
            throw new Error(
                "An error occurred while changing user status. Please try again."
            );
            }
        },
};

export default UserService;
