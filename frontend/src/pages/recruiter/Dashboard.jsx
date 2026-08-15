import { useEffect, useState } from "react";

import {
    Users,
    FileText,
    BriefcaseBusiness,
    GitCompare,
    TrendingUp,
    Trophy,
    Code,
    RefreshCw
} from "lucide-react";

import api from "../../services/api";


function RecruiterDashboard() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    // =====================================
    // Charger les statistiques
    // =====================================

    async function loadDashboard() {

        try {

            setLoading(true);
            setError(null);

            const response = await api.get("/dashboard/stats");

            console.log(
                "Statistiques Dashboard :",
                response.data
            );

            setStats(response.data);

        } catch (error) {

            console.error(
                "Erreur Dashboard :",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Impossible de charger les statistiques."
            );

        } finally {

            setLoading(false);

        }
    }


    // =====================================
    // useEffect
    // =====================================

    useEffect(() => {
    let isMounted = true;

    const load = async () => {
        try {
            await loadDashboard();
        } catch (error) {
            if (isMounted) {
                console.error("Erreur lors du chargement :", error);
            }
        }
    };

    load();

    return () => {
        isMounted = false;
    };
}, []);


    // =====================================
    // Chargement
    // =====================================

    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-[500px]">

                <div className="text-center">

                    <RefreshCw
                        size={40}
                        className="mx-auto text-blue-600 animate-spin"
                    />

                    <p className="mt-4 text-slate-500 text-lg">

                        Chargement du dashboard...

                    </p>

                </div>

            </div>

        );

    }


    // =====================================
    // Erreur
    // =====================================

    if (error) {

        return (

            <div className="p-8">

                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

                    <h2 className="text-xl font-semibold text-red-700">

                        Erreur

                    </h2>

                    <p className="mt-2 text-red-600">

                        {error}

                    </p>


                    <button
                        onClick={loadDashboard}
                        className="
                            mt-5
                            px-5
                            py-2
                            rounded-xl
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            transition
                        "
                    >

                        Réessayer

                    </button>

                </div>

            </div>

        );

    }


    if (!stats) {

        return null;

    }


    // =====================================
    // Cartes statistiques
    // =====================================

    const cards = [

        {
            title: "Utilisateurs",
            value: stats.users,
            icon: Users,
            description: "Utilisateurs inscrits"
        },

        {
            title: "CV enregistrés",
            value: stats.cvs,
            icon: FileText,
            description: "CV disponibles"
        },

        {
            title: "Offres d'emploi",
            value: stats.jobs,
            icon: BriefcaseBusiness,
            description: "Offres disponibles"
        },

        {
            title: "Matchings",
            value: stats.matches,
            icon: GitCompare,
            description: "Correspondances réalisées"
        }

    ];


    return (

        <div className="space-y-8">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Dashboard Recruteur

                    </h1>

                    <p className="mt-2 text-slate-500 text-lg">

                        Vue globale de votre activité de recrutement

                    </p>

                </div>


                <button
                    onClick={loadDashboard}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        bg-white
                        border
                        border-slate-200
                        text-slate-700
                        hover:bg-slate-50
                        shadow-sm
                        transition
                    "
                >

                    <RefreshCw size={18} />

                    Actualiser

                </button>

            </div>


            {/* =====================================
                STATISTIQUES
            ===================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className="
                                bg-white
                                rounded-2xl
                                p-6
                                shadow-sm
                                border
                                border-slate-200
                                hover:shadow-md
                                transition
                            "
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-slate-500 font-medium">

                                        {card.title}

                                    </p>

                                    <p className="mt-3 text-4xl font-bold text-slate-900">

                                        {card.value}

                                    </p>

                                    <p className="mt-2 text-sm text-slate-400">

                                        {card.description}

                                    </p>

                                </div>


                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                                    <Icon
                                        size={24}
                                        className="text-blue-600"
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>


            {/* =====================================
                ANALYSE DES MATCHINGS
            ===================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                {/* SCORE MOYEN */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        p-8
                        shadow-sm
                        border
                        border-slate-200
                    "
                >

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

                            <TrendingUp
                                size={25}
                                className="text-green-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-slate-800">

                                Score moyen

                            </h2>

                            <p className="text-sm text-slate-500">

                                Performance globale des matchings

                            </p>

                        </div>

                    </div>


                    <div className="mt-8">

                        <div className="flex items-end gap-2">

                            <span className="text-5xl font-bold text-slate-900">

                                {stats.average_score}

                            </span>

                            <span className="text-2xl text-slate-400 mb-1">

                                %

                            </span>

                        </div>


                        <div className="mt-5 w-full h-3 bg-slate-100 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-700"
                                style={{
                                    width: `${Math.min(
                                        Math.max(stats.average_score, 0),
                                        100
                                    )}%`
                                }}
                            />

                        </div>

                    </div>

                </div>


                {/* MEILLEUR MATCH */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        p-8
                        shadow-sm
                        border
                        border-slate-200
                    "
                >

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">

                            <Trophy
                                size={25}
                                className="text-yellow-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-slate-800">

                                Meilleur matching

                            </h2>

                            <p className="text-sm text-slate-500">

                                Score de correspondance maximal

                            </p>

                        </div>

                    </div>


                    <div className="mt-8 flex items-end gap-2">

                        <span className="text-5xl font-bold text-slate-900">

                            {stats.best_match}

                        </span>

                        <span className="text-2xl text-slate-400 mb-1">

                            %

                        </span>

                    </div>

                </div>

            </div>


            {/* =====================================
                COMPETENCE PRINCIPALE
            ===================================== */}

            <div
                className="
                    bg-white
                    rounded-2xl
                    p-8
                    shadow-sm
                    border
                    border-slate-200
                "
            >

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                        <Code
                            size={28}
                            className="text-purple-600"
                        />

                    </div>


                    <div>

                        <p className="text-sm text-slate-500">

                            Compétence la plus fréquente

                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-1">

                            {stats.top_skill}

                        </h2>

                    </div>

                </div>

            </div>


            {/* =====================================
                RESUME
            ===================================== */}

            <div
                className="
                    bg-slate-950
                    rounded-2xl
                    p-8
                    text-white
                    shadow-lg
                "
            >

                <div className="flex items-center gap-3 mb-6">

                    <Trophy
                        size={24}
                        className="text-blue-400"
                    />

                    <h2 className="text-xl font-bold">

                        Résumé du recrutement

                    </h2>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div>

                        <p className="text-slate-400 text-sm">

                            CV analysés

                        </p>

                        <p className="text-3xl font-bold mt-1">

                            {stats.cvs}

                        </p>

                    </div>


                    <div>

                        <p className="text-slate-400 text-sm">

                            Matchings effectués

                        </p>

                        <p className="text-3xl font-bold mt-1">

                            {stats.matches}

                        </p>

                    </div>


                    <div>

                        <p className="text-slate-400 text-sm">

                            Meilleur score

                        </p>

                        <p className="text-3xl font-bold mt-1">

                            {stats.best_match}%

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default RecruiterDashboard;