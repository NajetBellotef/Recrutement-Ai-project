import api from "./api";

// ================================
// Rechercher des candidats
// ================================

export async function searchCandidates(skill) {
    const response = await api.get("/search/candidates", {
        params: {
            skill: skill
        }
    });

    return response.data;
}


// ================================
// Rechercher des offres
// ================================

export async function searchJobs(skill) {
    const response = await api.get("/search/jobs", {
        params: {
            skill: skill
        }
    });

    return response.data;
}