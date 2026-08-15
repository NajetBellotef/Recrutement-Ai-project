import api from "./api";

export const getDashboard = async () => {

    const response = await api.get("/candidate/dashboard/stats");

    return response.data;

};