import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    FileText
} from "lucide-react";

import api from "../../services/api";


function CandidateProfile() {

    const { userId } = useParams();

    const navigate = useNavigate();

    const [candidate, setCandidate] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

   
    // ==========================
    // Charger le profil
    // ==========================

    useEffect(() => {

        async function loadCandidate() {

            if (!userId) {
                setError("Identifiant du candidat manquant.");
                setLoading(false);
                return;
            }

            try {

                setLoading(true);
                setError(null);

                const response = await api.get(
                    `/users/${userId}`
                );

                console.log(
                    "Profil candidat reçu :",
                    response.data
                );

                setCandidate(response.data);

            } catch (error) {

                console.error(
                    "Erreur lors du chargement du candidat :",
                    error
                );

                setError(
                    error.response?.data?.detail ||
                    "Impossible de récupérer le profil du candidat."
                );

            } finally {

                setLoading(false);

            }
        }

        loadCandidate();

    }, [userId]);


    // ==========================
    // Chargement
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center min-h-[400px]">

                <p className="text-lg text-slate-500">

                    Chargement du profil...

                </p>

            </div>

        );

    }


    // ==========================
    // Erreur
    // ==========================

    if (error) {

        return (

            <div className="p-8">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-blue-600 mb-6"
                >

                    <ArrowLeft size={20} />

                    Retour

                </button>


                <div className="bg-red-50 text-red-600 rounded-xl p-6">

                    {error}

                </div>

            </div>

        );

    }


    // ==========================
    // Aucun candidat
    // ==========================

    if (!candidate) {

        return (

            <div className="p-8">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-blue-600"
                >

                    <ArrowLeft size={20} />

                    Retour

                </button>

                <p className="mt-6 text-slate-500">

                    Candidat introuvable.

                </p>

            </div>

        );

    }


    // ==========================
    // Interface
    // ==========================

    return (

        <div className="space-y-8">

            {/* ==========================
                RETOUR
            ========================== */}

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
            >

                <ArrowLeft size={20} />

                Retour à la recherche

            </button>


            {/* ==========================
                PROFIL
            ========================== */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">


                    {/* ==========================
                        PHOTO
                    ========================== */}

                    <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">

                        {candidate.profile_image ? (

                            <img
                                src={`http://localhost:8000/${candidate.profile_image}`}
                                alt={candidate.full_name}
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <User
                                size={50}
                                className="text-blue-600"
                            />

                        )}

                    </div>


                    {/* ==========================
                        INFORMATIONS
                    ========================== */}

                    <div className="flex-1 text-center md:text-left">

                        <h1 className="text-3xl font-bold text-slate-800">

                            {candidate.full_name}

                        </h1>


                        <div className="mt-4 space-y-2 text-slate-500">


                            {/* EMAIL */}

                            <p className="flex items-center justify-center md:justify-start gap-2">

                                <Mail size={18} />

                                {candidate.email}

                            </p>


                            {/* TELEPHONE */}

                            {candidate.phone && (

                                <p className="flex items-center justify-center md:justify-start gap-2">

                                    <Phone size={18} />

                                    {candidate.phone}

                                </p>

                            )}


                            {/* LOCALISATION */}

                            {(candidate.city || candidate.country) && (

                                <p className="flex items-center justify-center md:justify-start gap-2">

                                    <MapPin size={18} />

                                    {candidate.city}

                                    {candidate.city && candidate.country
                                        ? ", "
                                        : ""}

                                    {candidate.country}

                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* ==========================
                CV
            ========================== */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-6">

                    <FileText
                        className="text-blue-600"
                        size={25}
                    />

                    <h2 className="text-2xl font-bold text-slate-800">

                        CV du candidat

                    </h2>

                </div>


                {/* ==========================
                    CV UNIQUE
                ========================== */}

                {candidate.cvs && candidate.cvs.length > 0 ? (

                    <div className="space-y-4">

                        {candidate.cvs.map((cv) => (

                            <div
    key={cv.id}
    className="
        border
        rounded-2xl
        p-5
        flex
        items-center
        justify-between
        hover:shadow-md
        hover:border-blue-400
        transition
    "
>

    <div>

        <p className="font-medium text-slate-800">
            {cv.filename}
        </p>

        <p className="text-sm text-slate-500 mt-1">
            CV #{cv.id}
        </p>

    </div>


    <div className="flex items-center gap-3">

        {/* VOIR */}
        <a
            href={`http://localhost:8000/${cv.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
                px-4
                py-2
                rounded-xl
                bg-blue-100
                text-blue-600
                hover:bg-blue-200
                transition
            "
        >
            Voir
        </a>


        

    </div>

</div>

                        ))}

                    </div>

                ) : (

                    <p className="text-slate-500">

                        Aucun CV disponible.

                    </p>

                )}

            </div>

        </div>

    );

}


export default CandidateProfile;