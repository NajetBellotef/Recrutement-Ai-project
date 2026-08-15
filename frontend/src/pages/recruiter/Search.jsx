import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Search as SearchIcon,
    Users,
    Briefcase,
    Loader2
} from "lucide-react";

import {
    searchCandidates,
    searchJobs
} from "../../services/searchService";


function Search() {

    const navigate = useNavigate();

    const [skill, setSkill] = useState("");

    const [type, setType] = useState("candidates");

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searched, setSearched] = useState(false);

    const [error, setError] = useState("");


    // ================================
    // RECHERCHE
    // ================================

    async function handleSearch(e) {

        e.preventDefault();

        if (!skill.trim()) {

            setError("Veuillez saisir une compétence.");

            return;
        }

        setLoading(true);
        setError("");
        setSearched(true);

        try {

            let data;

            if (type === "candidates") {

                data = await searchCandidates(
                    skill.trim()
                );

            } else {

                data = await searchJobs(
                    skill.trim()
                );

            }

            setResults(data);

        } catch (err) {

            console.error(
                "Erreur recherche :",
                err
            );

            setResults([]);

            setError(
                err.response?.data?.detail ||
                "Une erreur est survenue lors de la recherche."
            );

        } finally {

            setLoading(false);

        }
    }


    // ================================
    // CHANGER DE TYPE
    // ================================

    function handleTypeChange(newType) {

        setType(newType);

        setResults([]);

        setSearched(false);

        setError("");

    }


    // ================================
    // OUVRIR LE PROFIL CANDIDAT
    // ================================

    function handleCandidateClick(userId) {

        if (!userId) {

            console.error(
                "user_id manquant pour ce candidat."
            );

            return;
        }

        navigate(
            `/recruiter/candidate/${userId}`
        );
    }


    return (

        <div className="space-y-8">


            {/* ============================= */}
            {/* HEADER */}
            {/* ============================= */}

            <div>

                <h1 className="text-4xl font-bold text-slate-800">

                    Recherche

                </h1>

                <p className="text-slate-500 mt-2">

                    Recherchez des candidats ou des offres
                    selon leurs compétences.

                </p>

            </div>


            {/* ============================= */}
            {/* SEARCH BOX */}
            {/* ============================= */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">


                {/* ============================= */}
                {/* TABS */}
                {/* ============================= */}

                <div className="flex flex-col sm:flex-row gap-3 mb-6">


                    {/* CANDIDATS */}

                    <button
                        type="button"
                        onClick={() =>
                            handleTypeChange("candidates")
                        }
                        className={`
                            flex items-center gap-2
                            px-5 py-3
                            rounded-xl
                            font-medium
                            transition
                            ${
                                type === "candidates"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }
                        `}
                    >

                        <Users size={20} />

                        Candidats

                    </button>


                    {/* OFFRES */}

                    <button
                        type="button"
                        onClick={() =>
                            handleTypeChange("jobs")
                        }
                        className={`
                            flex items-center gap-2
                            px-5 py-3
                            rounded-xl
                            font-medium
                            transition
                            ${
                                type === "jobs"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }
                        `}
                    >

                        <Briefcase size={20} />

                        Offres

                    </button>

                </div>


                {/* ============================= */}
                {/* FORMULAIRE */}
                {/* ============================= */}

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-4"
                >

                    <div className="relative flex-1">

                        <SearchIcon
                            size={20}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type="text"
                            value={skill}
                            onChange={(e) =>
                                setSkill(e.target.value)
                            }
                            placeholder={
                                type === "candidates"
                                    ? "Ex : Python, React, Machine Learning..."
                                    : "Ex : Python, FastAPI, Docker..."
                            }
                            className="
                                w-full
                                border
                                border-slate-300
                                rounded-xl
                                py-3
                                pl-12
                                pr-4
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            font-medium
                            hover:bg-blue-700
                            disabled:opacity-50
                            flex
                            items-center
                            gap-2
                        "
                    >

                        {loading ? (

                            <>

                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />

                                Recherche...

                            </>

                        ) : (

                            <>

                                <SearchIcon size={20} />

                                Rechercher

                            </>

                        )}

                    </button>

                </form>


                {/* ============================= */}
                {/* ERREUR */}
                {/* ============================= */}

                {error && (

                    <p className="mt-4 text-red-500">

                        {error}

                    </p>

                )}

            </div>


            {/* ============================= */}
            {/* RESULTS */}
            {/* ============================= */}

            {searched && !loading && (

                <div className="bg-white rounded-2xl shadow-sm border p-6">


                    {/* HEADER RESULTATS */}

                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-6
                    ">

                        <h2 className="text-xl font-bold text-slate-800">

                            {type === "candidates"
                                ? "Candidats trouvés"
                                : "Offres trouvées"
                            }

                        </h2>


                        <span className="
                            px-3
                            py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            text-sm
                            font-medium
                        ">

                            {results.length} résultat(s)

                        </span>

                    </div>


                    {/* ============================= */}
                    {/* AUCUN RESULTAT */}
                    {/* ============================= */}

                    {results.length === 0 ? (

                        <div className="
                            text-center
                            py-12
                            text-slate-500
                        ">

                            <SearchIcon
                                size={40}
                                className="
                                    mx-auto
                                    mb-3
                                    opacity-40
                                "
                            />

                            <p>

                                Aucun résultat trouvé pour :

                            </p>

                            <strong className="text-slate-700">

                                {skill}

                            </strong>

                        </div>

                    ) : (


                        /* ============================= */
                        /* CARTES */
                        /* ============================= */

                        <div className="
                            grid
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-5
                        ">


                            {results.map((item) => (

                                <div
                                    key={item.id}

                                    onClick={
                                        type === "candidates"
                                            ? () =>
                                                handleCandidateClick(
                                                    item.user_id
                                                )
                                            : undefined
                                    }

                                    className={`
                                        border
                                        rounded-xl
                                        p-5
                                        transition

                                        ${
                                            type === "candidates"
                                                ? `
                                                    cursor-pointer
                                                    hover:shadow-lg
                                                    hover:border-blue-400
                                                  `
                                                : `
                                                    hover:shadow-md
                                                  `
                                        }
                                    `}
                                >


                                    {/* ============================= */}
                                    {/* CANDIDAT */}
                                    {/* ============================= */}

                                    {type === "candidates" ? (

                                        <>

                                            <div className="
                                                w-12
                                                h-12
                                                rounded-full
                                                bg-blue-100
                                                flex
                                                items-center
                                                justify-center
                                                mb-4
                                            ">

                                                <Users
                                                    size={24}
                                                    className="text-blue-600"
                                                />

                                            </div>


                                            {/* NOM DU CANDIDAT */}

                                            <h3 className="
                                                font-semibold
                                                text-slate-800
                                                text-lg
                                            ">

                                                {item.full_name ||
                                                    "Candidat"
                                                }

                                            </h3>


                                            {/* EMAIL */}

                                            {item.email && (

                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                    mt-1
                                                ">

                                                    {item.email}

                                                </p>

                                            )}


                                            {/* NOM DU CV */}

                                            <p className="
                                                text-sm
                                                text-slate-500
                                                mt-2
                                            ">

                                                {item.filename}

                                            </p>


                                            {/* ID CV */}

                                            <p className="
                                                text-xs
                                                text-slate-400
                                                mt-1
                                            ">

                                                CV #{item.id}

                                            </p>


                                            {/* INDICATION */}

                                            <p className="
                                                text-xs
                                                text-blue-500
                                                mt-4
                                                font-medium
                                            ">

                                                Cliquer pour voir le profil →

                                            </p>

                                        </>

                                    ) : (


                                        /* ============================= */
                                        /* OFFRE */
                                        /* ============================= */

                                        <>

                                            <div className="
                                                w-12
                                                h-12
                                                rounded-full
                                                bg-green-100
                                                flex
                                                items-center
                                                justify-center
                                                mb-4
                                            ">

                                                <Briefcase
                                                    size={24}
                                                    className="text-green-600"
                                                />

                                            </div>


                                            <h3 className="
                                                font-semibold
                                                text-slate-800
                                                text-lg
                                            ">

                                                {item.title}

                                            </h3>


                                            <p className="
                                                text-sm
                                                text-slate-500
                                                mt-2
                                            ">

                                                {item.company}

                                            </p>

                                        </>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}


export default Search;