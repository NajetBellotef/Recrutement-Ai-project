import api from "./api";

// =========================
// Toutes les offres
// =========================
export async function getJobs() {

    const response = await api.get("/jobs");

    return response.data;

}

// =========================
// Une offre
// =========================
export async function getJob(id) {

    const response = await api.get(`/jobs/${id}`);

    return response.data;

}

// =========================
// Créer une offre
// =========================
export async function createJob(data) {

    const response = await api.post("/jobs", data);

    return response.data;

}

// =========================
// Modifier une offre
// =========================
export async function updateJob(id, data) {

    const response = await api.put(`/jobs/${id}`, data);

    return response.data;

}

// =========================
// Supprimer une offre
// =========================
export async function deleteJob(id) {

    const response = await api.delete(`/jobs/${id}`);

    return response.data;

}