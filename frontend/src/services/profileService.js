import api from "./api";

// Récupérer le profil
export const getProfile = async () => {

    const response = await api.get("/profile/me");

    return response.data;

};

// Modifier le profil
export const updateProfile = async (data) => {

    const response = await api.put(
        "/profile/update",
        data
    );

    return response.data;

};

// Changer le mot de passe
export const changePassword = async (data) => {

    const response = await api.put(
        "/profile/change-password",
        data
    );

    return response.data;

};

// Upload de la photo
export const uploadProfileImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/profile/upload-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};