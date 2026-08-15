import { useEffect, useState } from "react";

import ProfileCard from "../../components/profile/ProfileCard";
import PersonalInfoCard from "../../components/profile/PersonalInfoCard";
import SecurityCard from "../../components/profile/SecurityCard";

import {
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage,
} from "../../services/profileService";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const data = await getProfile();

                setProfile(data);

            } catch (error) {

                console.error(error);

                alert("Impossible de charger le profil.");

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    const handleUpdate = async (data) => {

        try {

            const updated = await updateProfile(data);

            setProfile(updated);

            alert("Profil mis à jour avec succès.");

        } catch (error) {

            console.error(error);

            alert("Erreur lors de la mise à jour du profil.");

        }

    };

    const handlePassword = async (data) => {

        try {

            const response = await changePassword(data);

            alert(response.message);

        } catch (error) {

            alert(
                error.response?.data?.detail ??
                "Erreur lors du changement du mot de passe."
            );

        }

    };

    const handleImage = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            const updated = await uploadProfileImage(file);

            setProfile(updated);

            alert("Photo de profil mise à jour.");

        } catch (error) {

            console.error(error);

            alert("Erreur lors de l'envoi de la photo.");

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-80">

                <p className="text-slate-500 text-lg">

                    Chargement...

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <h1 className="text-3xl font-bold text-slate-800">

                Mon Profil

            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <ProfileCard
                    profile={profile}
                    onUploadImage={handleImage}
                />

                <div className="lg:col-span-2">

                    <PersonalInfoCard
                        profile={profile}
                        onUpdate={handleUpdate}
                    />

                </div>

            </div>

            <SecurityCard
                onChangePassword={handlePassword}
            />

        </div>

    );

}

export default Profile;