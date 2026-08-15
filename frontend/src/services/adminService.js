import api from "./api";

export async function getDashboardStats() {
    const response = await api.get("/admin/dashboard");
    return response.data;
}

export async function getUsers() {
    const response = await api.get("/admin/users");
    return response.data;
}

export async function createRecruiter(data) {
    const response = await api.post("/admin/recruiters", data);
    return response.data;
}

export async function deleteUser(userId) {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
}