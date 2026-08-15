import { useEffect, useState } from "react";
import { FileText, Trophy, Eye, User } from "lucide-react";

import api from "../../services/api";

function Ranking() {

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [ranking, setRanking] = useState([]);

    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingRanking, setLoadingRanking] = useState(false);

    const [error, setError] = useState(null);


    // ==========================
    // Charger les offres
    // ==========================

    useEffect(() => {

        async function loadJobs() {

            try {

                setLoadingJobs(true);
                setError(null);

                const response = await api.get("/jobs");

                setJobs(response.data);

            } catch (error) {

                console.error(
                    "Erreur lors du chargement des offres :",
                    error
                );

                setError(
                    error.response?.data?.detail ||
                    "Impossible de charger les offres."
                );

            } finally {

                setLoadingJobs(false);

            }
        }

        loadJobs();

    }, []);


    // ==========================
    // Charger le classement
    // ==========================

    useEffect(() => {

        async function loadRanking() {

            if (!selectedJob) {
                setRanking([]);
                return;
            }

            try {

                setLoadingRanking(true);
                setError(null);

                const response = await api.get(
                    `/jobs/${selectedJob}/ranking`
                );

                console.log(
                    "Classement reçu :",
                    response.data
                );

                setRanking(response.data);

            } catch (error) {

                console.error(
                    "Erreur lors du chargement du classement :",
                    error
                );

                setError(
                    error.response?.data?.detail ||
                    "Impossible de charger le classement."
                );

                setRanking([]);

            } finally {

                setLoadingRanking(false);

            }
        }

        loadRanking();

    }, [selectedJob]);


    // ==========================
    // Affichage
    // ==========================

    return (

        <div className="space-y-8">


            {/* ==========================
                TITRE
            ========================== */}

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Classement des candidats
                </h1>

                <p className="mt-2 text-slate-500">
                    Consultez les candidats classés selon leur score
                    de matching avec l'offre sélectionnée.
                </p>

            </div>


            {/* ==========================
                SELECTION OFFRE
            ========================== */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

                <label className="block text-lg font-semibold text-slate-800 mb-3">

                    Sélectionner une offre

                </label>


                {loadingJobs ? (

                    <p className="text-slate-500">
                        Chargement des offres...
                    </p>

                ) : (

                    <select
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        className="
                            w-full
                            px-5
                            py-4
                            border
                            border-slate-300
                            rounded-2xl
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            text-slate-700
                        "
                    >

                        <option value="">
                            -- Sélectionner une offre --
                        </option>


                        {jobs.map((job) => (

                            <option
                                key={job.id}
                                value={job.id}
                            >

                                {job.title}

                            </option>

                        ))}

                    </select>

                )}

            </div>


            {/* ==========================
                ERREUR
            ========================== */}

            {error && (

                <div className="
                    bg-red-50
                    border
                    border-red-200
                    text-red-600
                    rounded-2xl
                    p-5
                ">

                    {error}

                </div>

            )}


            {/* ==========================
                CLASSEMENT
            ========================== */}

            {selectedJob && (

                <div className="bg-white rounded-3xl shadow-lg p-8">


                    {/* TITRE */}

                    <div className="flex items-center gap-3 mb-8">

                        <Trophy
                            size={30}
                            className="text-blue-600"
                        />

                        <div>

                            <h2 className="text-2xl font-bold text-slate-800">
                                Classement
                            </h2>

                            <p className="text-slate-500 mt-1">
                                Les candidats sont classés par score
                                de matching.
                            </p>

                        </div>

                    </div>


                    {/* CHARGEMENT */}

                    {loadingRanking ? (

                        <div className="flex justify-center py-12">

                            <p className="text-slate-500 text-lg">
                                Chargement du classement...
                            </p>

                        </div>

                    ) : ranking.length === 0 ? (

                        <div className="
                            text-center
                            py-12
                            text-slate-500
                        ">

                            <FileText
                                size={45}
                                className="mx-auto mb-4 text-slate-300"
                            />

                            <p className="text-lg">
                                Aucun candidat trouvé pour cette offre.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">


                            {ranking.map((candidate, index) => (

                                <div
                                    key={candidate.cv_id}
                                    className="
                                        border
                                        border-slate-200
                                        rounded-2xl
                                        p-5
                                        flex
                                        items-center
                                        justify-between
                                        gap-6
                                        hover:shadow-md
                                        hover:border-blue-300
                                        transition
                                    "
                                >


                                    {/* ==========================
                                        GAUCHE
                                    ========================== */}

                                    <div className="flex items-center gap-5">


                                        {/* POSITION */}

                                        <div className="
                                            w-12
                                            h-12
                                            rounded-full
                                            bg-blue-50
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                            text-blue-600
                                            text-lg
                                        ">

                                            {index + 1}

                                        </div>


                                        {/* PHOTO */}

                                        <div className="
                                            w-14
                                            h-14
                                            rounded-full
                                            bg-blue-100
                                            overflow-hidden
                                            flex
                                            items-center
                                            justify-center
                                        ">

                                            {candidate.profile_image ? (

                                                <img
                                                    src={`http://localhost:8000/${candidate.profile_image}`}
                                                    alt={candidate.candidate}
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                    "
                                                />

                                            ) : (

                                                <User
                                                    size={28}
                                                    className="text-blue-600"
                                                />

                                            )}

                                        </div>


                                        {/* INFORMATIONS */}

                                        <div>

                                            <h3 className="
                                                text-lg
                                                font-bold
                                                text-slate-800
                                            ">

                                                {candidate.candidate}

                                            </h3>


                                            {candidate.email && (

                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                    mt-1
                                                ">

                                                    {candidate.email}

                                                </p>

                                            )}


                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                mt-2
                                                text-sm
                                                text-slate-500
                                            ">

                                                <FileText size={16} />

                                                {candidate.filename}

                                            </div>

                                        </div>

                                    </div>


                                    {/* ==========================
                                        DROITE
                                    ========================== */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-6
                                    ">


                                        {/* SCORE */}

                                        <div className="text-right">

                                            <p className="
                                                text-3xl
                                                font-bold
                                                text-blue-600
                                            ">

                                                {candidate.score}%

                                            </p>

                                            <p className="
                                                text-sm
                                                text-slate-400
                                            ">

                                                Score de matching

                                            </p>

                                        </div>


                                        {/* VOIR CV */}

                                        <a
                                            href={`http://localhost:8000/${candidate.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                px-5
                                                py-3
                                                rounded-xl
                                                bg-blue-600
                                                text-white
                                                hover:bg-blue-700
                                                transition
                                                font-medium
                                            "
                                        >

                                            <Eye size={20} />

                                            Voir

                                        </a>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}

export default Ranking;