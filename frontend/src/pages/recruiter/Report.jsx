import { useEffect, useState } from "react";

import {
    FileText,
    Trophy,
    Eye,
    User,
    Mail,
    Loader2,
    BarChart3
} from "lucide-react";

import api from "../../services/api";


function Report() {

    // ==========================
    // STATES
    // ==========================

    const [jobs, setJobs] = useState([]);

    const [selectedJob, setSelectedJob] = useState("");

    const [candidates, setCandidates] = useState([]);

    const [loadingJobs, setLoadingJobs] = useState(true);

    const [loadingCandidates, setLoadingCandidates] = useState(false);

    const [generatingReport, setGeneratingReport] = useState(null);

    const [error, setError] = useState(null);


    // ==========================
    // CHARGER LES OFFRES
    // ==========================

    useEffect(() => {

        async function loadJobs() {

            try {

                setLoadingJobs(true);
                setError(null);

                const response = await api.get("/jobs");

                console.log(
                    "Offres reçues :",
                    response.data
                );

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
    // CHARGER LE CLASSEMENT
    // ==========================

    useEffect(() => {

        async function loadCandidates() {

            if (!selectedJob) {

                setCandidates([]);

                return;

            }

            try {

                setLoadingCandidates(true);
                setError(null);

                const response = await api.get(
                    `/jobs/${selectedJob}/ranking`
                );

                console.log(
                    "Classement reçu :",
                    response.data
                );

                setCandidates(response.data);

            } catch (error) {

                console.error(
                    "Erreur lors du chargement du classement :",
                    error
                );

                setError(
                    error.response?.data?.detail ||
                    "Impossible de charger les candidats."
                );

                setCandidates([]);

            } finally {

                setLoadingCandidates(false);

            }
        }

        loadCandidates();

    }, [selectedJob]);


    // ==========================
    // GÉNÉRER LE RAPPORT PDF
    // ==========================

    async function generateReport(candidate) {

    console.log("Candidat sélectionné pour le rapport :", candidate);

    const matchId = candidate?.match_id;

    console.log("Match ID :", matchId);

    if (!matchId) {

        console.error(
            "match_id absent dans le candidat :",
            candidate
        );

        alert(
            "Le matching de ce candidat est introuvable."
        );

        return;
    }

    try {

        setGeneratingReport(matchId);

        const response = await api.get(
            `/reports/match/${matchId}`,
            {
                responseType: "blob"
            }
        );

        console.log(
            "Rapport PDF reçu pour le match :",
            matchId
        );

        const blob = new Blob(
            [response.data],
            {
                type: "application/pdf"
            }
        );

        const url = window.URL.createObjectURL(blob);

        // Ouvrir le PDF dans un nouvel onglet
        window.open(url, "_blank");

        // Libérer l'URL après quelques secondes
        setTimeout(() => {

            window.URL.revokeObjectURL(url);

        }, 10000);

    } catch (error) {

        console.error(
            "Erreur lors de la génération du rapport :",
            error
        );

        alert(
            error.response?.data?.detail ||
            "Impossible de générer le rapport."
        );

    } finally {

        setGeneratingReport(null);

    }
}


    // ==========================
    // SCORE
    // ==========================

    function getScoreClass(score) {

        if (score >= 80) {

            return "text-green-600";

        }

        if (score >= 60) {

            return "text-blue-600";

        }

        if (score >= 40) {

            return "text-orange-500";

        }

        return "text-red-500";

    }


    // ==========================
    // LOADING OFFRES
    // ==========================

    if (loadingJobs) {

        return (

            <div className="
                flex
                justify-center
                items-center
                min-h-[400px]
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    text-slate-500
                ">

                    <Loader2
                        size={24}
                        className="animate-spin"
                    />

                    <span>
                        Chargement des offres...
                    </span>

                </div>

            </div>

        );

    }


    // ==========================
    // INTERFACE
    // ==========================

    return (

        <div className="space-y-8">


            {/* ==========================
                TITRE
            ========================== */}

            <div>

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <BarChart3
                        size={32}
                        className="text-blue-600"
                    />

                    <h1 className="
                        text-3xl
                        font-bold
                        text-slate-800
                    ">

                        Rapports

                    </h1>

                </div>


                <p className="
                    mt-2
                    text-slate-500
                ">

                    Générez et consultez les rapports
                    détaillés des candidats.

                </p>

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
                SÉLECTION OFFRE
            ========================== */}

            <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
            ">

                <label className="
                    block
                    text-lg
                    font-semibold
                    text-slate-800
                    mb-3
                ">

                    Sélectionner une offre

                </label>


                <select
                    value={selectedJob}
                    onChange={(e) => {
                        setSelectedJob(e.target.value);
                        setError(null);
                    }}
                    className="
                        w-full
                        px-5
                        py-4
                        border
                        border-slate-300
                        rounded-2xl
                        bg-white
                        text-slate-700
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
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

                            {job.company
                                ? ` - ${job.company}`
                                : ""
                            }

                        </option>

                    ))}

                </select>

            </div>


            {/* ==========================
                CLASSEMENT / CANDIDATS
            ========================== */}

            {selectedJob && (

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-8
                ">


                    {/* ==========================
                        HEADER
                    ========================== */}

                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-8
                    ">

                        <Trophy
                            size={30}
                            className="text-blue-600"
                        />

                        <div>

                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">

                                Rapports des candidats

                            </h2>

                            <p className="
                                text-slate-500
                                mt-1
                            ">

                                Consultez les candidats et générez
                                leur rapport de matching.

                            </p>

                        </div>

                    </div>


                    {/* ==========================
                        LOADING
                    ========================== */}

                    {loadingCandidates ? (

                        <div className="
                            flex
                            justify-center
                            items-center
                            py-16
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                text-slate-500
                            ">

                                <Loader2
                                    size={25}
                                    className="animate-spin"
                                />

                                <span>
                                    Chargement des candidats...
                                </span>

                            </div>

                        </div>

                    ) : candidates.length === 0 ? (

                        <div className="
                            text-center
                            py-16
                            text-slate-500
                        ">

                            <FileText
                                size={50}
                                className="
                                    mx-auto
                                    mb-4
                                    text-slate-300
                                "
                            />

                            <p className="text-lg">

                                Aucun candidat trouvé
                                pour cette offre.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">


                            {/* ==========================
                                CANDIDATS
                            ========================== */}

                            {candidates.map(
                                (candidate, index) => (

                                    <div
                                        key={
                                            candidate.match_id ||
                                            candidate.cv_id
                                        }
                                        className="
                                            border
                                            border-slate-200
                                            rounded-2xl
                                            p-5
                                            hover:border-blue-300
                                            hover:shadow-md
                                            transition
                                        "
                                    >

                                        <div className="
                                            flex
                                            flex-col
                                            lg:flex-row
                                            lg:items-center
                                            lg:justify-between
                                            gap-6
                                        ">


                                            {/* ==========================
                                                INFORMATIONS CANDIDAT
                                            ========================== */}

                                            <div className="
                                                flex
                                                items-center
                                                gap-5
                                            ">


                                                {/* POSITION */}

                                                <div className="
                                                    w-11
                                                    h-11
                                                    rounded-full
                                                    bg-blue-50
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-blue-600
                                                    font-bold
                                                    text-lg
                                                    shrink-0
                                                ">

                                                    {index + 1}

                                                </div>


                                                {/* PHOTO */}

                                                <div className="
                                                    w-16
                                                    h-16
                                                    rounded-full
                                                    bg-blue-100
                                                    overflow-hidden
                                                    flex
                                                    items-center
                                                    justify-center
                                                    shrink-0
                                                ">

                                                    {candidate.profile_image ? (

                                                        <img
                                                            src={`http://localhost:8000/${candidate.profile_image}`}
                                                            alt={
                                                                candidate.candidate ||
                                                                "Candidat"
                                                            }
                                                            className="
                                                                w-full
                                                                h-full
                                                                object-cover
                                                            "
                                                        />

                                                    ) : (

                                                        <User
                                                            size={30}
                                                            className="
                                                                text-blue-600
                                                            "
                                                        />

                                                    )}

                                                </div>


                                                {/* NOM + EMAIL */}

                                                <div>

                                                    <h3 className="
                                                        text-xl
                                                        font-bold
                                                        text-slate-800
                                                    ">

                                                        {
                                                            candidate.candidate ||
                                                            "Candidat"
                                                        }

                                                    </h3>


                                                    {candidate.email && (

                                                        <p className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-sm
                                                            text-slate-500
                                                            mt-1
                                                        ">

                                                            <Mail size={16} />

                                                            {candidate.email}

                                                        </p>

                                                    )}


                                                    <p className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-slate-500
                                                        mt-2
                                                    ">

                                                        <FileText
                                                            size={16}
                                                        />

                                                        {candidate.filename}

                                                    </p>

                                                </div>

                                            </div>


                                            {/* ==========================
                                                SCORE + ACTIONS
                                            ========================== */}

                                            <div className="
                                                flex
                                                flex-col
                                                sm:flex-row
                                                items-start
                                                sm:items-center
                                                gap-4
                                            ">


                                                {/* SCORE */}

                                                <div className="
                                                    text-left
                                                    sm:text-right
                                                    min-w-[130px]
                                                ">

                                                    <p className={`
                                                        text-3xl
                                                        font-bold
                                                        ${getScoreClass(
                                                            candidate.score
                                                        )}
                                                    `}>

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

                                                {candidate.file_path && (

                                                    <a
                                                        href={`http://localhost:8000/${candidate.file_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="
                                                            flex
                                                            items-center
                                                            justify-center
                                                            gap-2
                                                            px-5
                                                            py-3
                                                            rounded-xl
                                                            bg-blue-100
                                                            text-blue-700
                                                            hover:bg-blue-200
                                                            transition
                                                            font-medium
                                                        "
                                                    >

                                                        <Eye size={20} />

                                                        Voir CV

                                                    </a>

                                                )}


                                                {/* RAPPORT */}

                                                <button
                                                    onClick={() =>
                                                        generateReport(candidate)
                                                    }
                                                    disabled={
                                                        generatingReport ===
                                                        candidate.match_id
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        px-5
                                                        py-3
                                                        rounded-xl
                                                        bg-blue-600
                                                        text-white
                                                        hover:bg-blue-700
                                                        disabled:opacity-60
                                                        disabled:cursor-not-allowed
                                                        transition
                                                        font-medium
                                                    "
                                                >

                                                    {generatingReport ===
                                                    candidate.match_id ? (

                                                        <>

                                                            <Loader2
                                                                size={20}
                                                                className="
                                                                    animate-spin
                                                                "
                                                            />

                                                            Génération...

                                                        </>

                                                    ) : (

                                                        <>

                                                            <FileText
                                                                size={20}
                                                            />

                                                            Générer rapport

                                                        </>

                                                    )}

                                                </button>

                                            </div>

                                        </div>


                                        {/* ==========================
                                            COMMENTAIRE IA
                                        ========================== */}

                                        {candidate.comment && (

                                            <div className="
                                                mt-5
                                                pt-5
                                                border-t
                                                border-slate-100
                                            ">

                                                <p className="
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    mb-2
                                                ">

                                                    Analyse du matching

                                                </p>

                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                    leading-relaxed
                                                ">

                                                    {candidate.comment}

                                                </p>

                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}


export default Report;