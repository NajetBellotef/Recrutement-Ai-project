import api from "./api";

export const getMyCV = async () => {
    const response = await api.get("/cvs/me");
    return response.data;
};

export const uploadCV = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/cvs/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};