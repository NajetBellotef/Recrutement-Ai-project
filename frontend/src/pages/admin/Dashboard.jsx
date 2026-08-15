import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    UserRoundCog,
    UserCheck,
    ShieldCheck,
    RefreshCw,
    LogOut,
    Settings,
    ArrowRight,
} from "lucide-react";

import { getDashboardStats } from "../../services/adminService";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        total_users: 0,
        total_candidates: 0,
        total_recruiters: 0,
        total_admins: 0,
    });

    const [loading, setLoading] = useState(true);

    // ==========================
    // Charger les statistiques
    // ==========================

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const data = await getDashboardStats();

            console.log("Dashboard Admin :", data);

            setStats(data);

        } catch (error) {

            console.error(
                "Erreur lors du chargement du dashboard :",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
    const fetchDashboard = async () => {
        await loadDashboard();
    };

    fetchDashboard();
}, []);

    // ==========================
    // Déconnexion
    // ==========================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside className="w-72 bg-slate-950 text-white flex flex-col">

                {/* Logo */}

                <div className="px-7 py-8 border-b border-slate-800">

                    <h1 className="text-2xl font-bold text-white">
                        Recruitment AI
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        Administration Platform
                    </p>

                </div>


                {/* Navigation */}

                <nav className="flex-1 p-5">

                    {/* Dashboard */}

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-blue-600 text-white mb-3"
                    >

                        <LayoutDashboard size={21} />

                        <span className="font-medium">
                            Dashboard
                        </span>

                    </button>


                    {/* Gestion utilisateurs */}

                    <button
                        onClick={() => navigate("/admin/users")}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition mb-2"
                    >

                        <Users size={21} />

                        <span>
                            Gestion des utilisateurs
                        </span>

                    </button>


                    {/* Gestion recruteurs */}

                    <button
                        onClick={() => navigate("/admin/recruiters")}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition mb-2"
                    >

                        <UserRoundCog size={21} />

                        <span>
                            Gestion des recruteurs
                        </span>

                    </button>


                    {/* Settings */}

                    <button
                        onClick={() => navigate("/admin/settings")}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >

                        <Settings size={21} />

                        <span>
                            Paramètres
                        </span>

                    </button>

                </nav>


                {/* Déconnexion */}

                <div className="p-5 border-t border-slate-800">

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
                    >

                        <LogOut size={21} />

                        <span>
                            Déconnexion
                        </span>

                    </button>

                </div>

            </aside>


            {/* =====================================================
                CONTENU PRINCIPAL
            ===================================================== */}

            <main className="flex-1 min-w-0">

                {/* Header */}

                <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">

                    <div>

                        <p className="text-sm text-slate-500">
                            Administration
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900">
                            Tableau de bord
                        </h2>

                    </div>


                    <div className="flex items-center gap-4">

                        <button
                            onClick={loadDashboard}
                            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition"
                        >

                            <RefreshCw
                                size={18}
                                className={loading ? "animate-spin" : ""}
                            />

                            Actualiser

                        </button>


                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">

                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                                <ShieldCheck
                                    size={21}
                                    className="text-blue-600"
                                />

                            </div>

                            <div>

                                <p className="text-sm font-semibold text-slate-800">
                                    Administrateur
                                </p>

                                <p className="text-xs text-slate-500">
                                    Gestionnaire système
                                </p>

                            </div>

                        </div>

                    </div>

                </header>


                {/* Contenu */}

                <div className="p-8">

                    {/* Bienvenue */}

                    <div className="mb-8">

                        <h3 className="text-3xl font-bold text-slate-900">
                            Bonjour, Administrateur 
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Voici un aperçu de votre plateforme Recruitment AI.
                        </p>

                    </div>


                    {/* =================================================
                        STATISTIQUES
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">


                        {/* Utilisateurs */}

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Total utilisateurs
                                    </p>

                                    <p className="text-3xl font-bold text-slate-900 mt-2">
                                        {loading ? "..." : stats.total_users}
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                                    <Users
                                        size={24}
                                        className="text-blue-600"
                                    />

                                </div>

                            </div>

                            <p className="text-xs text-slate-400 mt-4">
                                Tous les comptes enregistrés
                            </p>

                        </div>


                        {/* Candidats */}

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Candidats
                                    </p>

                                    <p className="text-3xl font-bold text-slate-900 mt-2">
                                        {loading ? "..." : stats.total_candidates}
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

                                    <UserCheck
                                        size={24}
                                        className="text-emerald-600"
                                    />

                                </div>

                            </div>

                            <p className="text-xs text-slate-400 mt-4">
                                Candidats inscrits
                            </p>

                        </div>


                        {/* Recruteurs */}

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Recruteurs
                                    </p>

                                    <p className="text-3xl font-bold text-slate-900 mt-2">
                                        {loading ? "..." : stats.total_recruiters}
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">

                                    <UserRoundCog
                                        size={24}
                                        className="text-violet-600"
                                    />

                                </div>

                            </div>

                            <p className="text-xs text-slate-400 mt-4">
                                Recruteurs actifs
                            </p>

                        </div>


                        {/* Administrateurs */}

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Administrateurs
                                    </p>

                                    <p className="text-3xl font-bold text-slate-900 mt-2">
                                        {loading ? "..." : stats.total_admins}
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">

                                    <ShieldCheck
                                        size={24}
                                        className="text-amber-600"
                                    />

                                </div>

                            </div>

                            <p className="text-xs text-slate-400 mt-4">
                                Administrateurs système
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        GESTION
                    ================================================= */}

                    <h3 className="text-xl font-bold text-slate-900 mb-5">
                        Gestion de la plateforme
                    </h3>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                        {/* Gestion utilisateurs */}

                        <button
                            onClick={() => navigate("/admin/users")}
                            className="group text-left bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition"
                        >

                            <div className="flex items-start justify-between">

                                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                                    <Users
                                        size={28}
                                        className="text-blue-600"
                                    />

                                </div>

                                <ArrowRight
                                    size={22}
                                    className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                                />

                            </div>


                            <h4 className="text-xl font-bold text-slate-900 mt-5">
                                Gestion des utilisateurs
                            </h4>

                            <p className="text-slate-500 mt-2">
                                Consulter, gérer et supprimer les utilisateurs
                                de la plateforme.
                            </p>

                            <div className="mt-5 text-blue-600 font-medium">
                                Accéder à la gestion →
                            </div>

                        </button>


                        {/* Gestion recruteurs */}

                        <button
                            onClick={() => navigate("/admin/recruiters")}
                            className="group text-left bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-violet-300 transition"
                        >

                            <div className="flex items-start justify-between">

                                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                                    <UserRoundCog
                                        size={28}
                                        className="text-violet-600"
                                    />

                                </div>

                                <ArrowRight
                                    size={22}
                                    className="text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition"
                                />

                            </div>


                            <h4 className="text-xl font-bold text-slate-900 mt-5">
                                Gestion des recruteurs
                            </h4>

                            <p className="text-slate-500 mt-2">
                                Ajouter de nouveaux recruteurs et gérer
                                les comptes recruteurs.
                            </p>

                            <div className="mt-5 text-violet-600 font-medium">
                                Accéder à la gestion →
                            </div>

                        </button>

                    </div>


                    {/* =================================================
                        INFO
                    ================================================= */}

                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-7 text-white">

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-xl font-bold">
                                    Recruitment AI
                                </h3>

                                <p className="text-blue-100 mt-1">
                                    Plateforme intelligente de recrutement
                                    basée sur l'intelligence artificielle.
                                </p>

                            </div>

                            <ShieldCheck
                                size={45}
                                className="text-white/80"
                            />

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;