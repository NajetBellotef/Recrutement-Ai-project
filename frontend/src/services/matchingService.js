import api from "./api";

export const getCandidateMatches = async () => {

    const response = await api.get("/candidate/matching");

    return response.data;

};