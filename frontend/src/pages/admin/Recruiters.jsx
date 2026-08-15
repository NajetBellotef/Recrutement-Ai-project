import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    UserPlus,
    Trash2,
    Mail,
    User,
    ShieldCheck,
    RefreshCw,
    X,
    CheckCircle,
    AlertCircle
} from "lucide-react";

import api from "../../services/api";


function Recruiters() {

    // =====================================================
    // ÉTATS
    // =====================================================

    const [recruiters, setRecruiters] = useState([]);

    const [loading, setLoading] = useState(true);

    const [creating, setCreating] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    // Message de succès
    const [successMessage, setSuccessMessage] = useState("");

    // Message d'erreur
    const [errorMessage, setErrorMessage] = useState("");

    // Modal suppression
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        userId: null,
        fullName: ""
    });


    // =====================================================
    // CHARGER LES RECRUTEURS
    // =====================================================

    async function loadRecruiters() {

        try {

            setLoading(true);

            setErrorMessage("");

            const response = await api.get("/admin/users");

            const users = response.data;

            // Garder uniquement les utilisateurs
            // ayant le rôle recruiter
            const recruiterUsers = users.filter(
                (user) => user.role === "recruiter"
            );

            setRecruiters(recruiterUsers);

        } catch (error) {

            console.error(
                "Erreur chargement recruteurs :",
                error
            );

            setErrorMessage(
                error.response?.data?.detail ||
                "Impossible de charger les recruteurs."
            );

        } finally {

            setLoading(false);

        }

    }


    // =====================================================
    // PREMIER CHARGEMENT
    // =====================================================

    useEffect(() => {
    let cancelled = false;

    const fetchRecruiters = async () => {
        try {
            setLoading(true);
            setErrorMessage("");

            const response = await api.get("/admin/users");

            if (cancelled) return;

            const users = response.data;

            const recruiterUsers = users.filter(
                (user) => user.role === "recruiter"
            );

            setRecruiters(recruiterUsers);

        } catch (error) {
            if (cancelled) return;

            console.error(
                "Erreur chargement recruteurs :",
                error
            );

            setErrorMessage(
                error.response?.data?.detail ||
                "Impossible de charger les recruteurs."
            );

        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    };

    fetchRecruiters();

    return () => {
        cancelled = true;
    };
}, []);


    // =====================================================
    // MODIFIER LE FORMULAIRE
    // =====================================================

    function handleChange(e) {

        const {
            name,
            value
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

    }


    // =====================================================
    // CRÉER UN RECRUTEUR
    // =====================================================

    async function handleCreate(e) {

        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");


        // Vérification des champs

        if (
            !form.full_name ||
            !form.email ||
            !form.password
        ) {

            setErrorMessage(
                "Veuillez remplir tous les champs."
            );

            return;

        }


        try {

            setCreating(true);


            // Appel API

            await api.post(
                "/admin/recruiters",
                form
            );


            // Message succès

            setSuccessMessage(
                "Le recruteur a été créé avec succès."
            );


            // Réinitialiser le formulaire

            setForm({
                full_name: "",
                email: "",
                password: ""
            });


            // Recharger la liste

            await loadRecruiters();


            // Faire disparaître le message

            setTimeout(() => {

                setSuccessMessage("");

            }, 4000);


        } catch (error) {

            console.error(
                "Erreur création recruteur :",
                error
            );


            setErrorMessage(
                error.response?.data?.detail ||
                "Erreur lors de la création du recruteur."
            );


        } finally {

            setCreating(false);

        }

    }


    // =====================================================
    // OUVRIR MODAL DE SUPPRESSION
    // =====================================================

    function handleDelete(
        userId,
        fullName
    ) {

        setDeleteModal({
            open: true,
            userId: userId,
            fullName: fullName
        });

    }


    // =====================================================
    // FERMER MODAL
    // =====================================================

    function closeDeleteModal() {

        if (deleting) {
            return;
        }

        setDeleteModal({
            open: false,
            userId: null,
            fullName: ""
        });

    }


    // =====================================================
    // CONFIRMER SUPPRESSION
    // =====================================================

    async function confirmDelete() {

        try {

            setDeleting(true);

            setSuccessMessage("");
            setErrorMessage("");


            // Appel API DELETE

            await api.delete(
                `/admin/users/${deleteModal.userId}`
            );


            // Fermer la modal

            setDeleteModal({
                open: false,
                userId: null,
                fullName: ""
            });


            // Message de succès

            setSuccessMessage(
                "Le recruteur a été supprimé avec succès."
            );


            // Recharger la liste

            await loadRecruiters();


            // Faire disparaître le message

            setTimeout(() => {

                setSuccessMessage("");

            }, 4000);


        } catch (error) {

            console.error(
                "Erreur suppression recruteur :",
                error
            );


            setErrorMessage(
                error.response?.data?.detail ||
                "Erreur lors de la suppression."
            );


            // Fermer la modal

            setDeleteModal({
                open: false,
                userId: null,
                fullName: ""
            });


            setTimeout(() => {

                setErrorMessage("");

            }, 4000);


        } finally {

            setDeleting(false);

        }

    }


    // =====================================================
    // INTERFACE
    // =====================================================

    return (

        <div className="space-y-8">


            {/* =====================================================
                MODAL CONFIRMATION SUPPRESSION
            ===================================================== */}

            {deleteModal.open && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-slate-900/50
                        backdrop-blur-sm
                        p-4
                    "
                    onClick={closeDeleteModal}
                >

                    <div
                        className="
                            bg-white
                            w-full
                            max-w-md
                            rounded-2xl
                            shadow-2xl
                            p-7
                        "
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Bouton fermer */}

                        <div className="flex justify-end">

                            <button
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="
                                    p-2
                                    rounded-lg
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                    transition
                                "
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* Icône */}

                        <div className="flex justify-center mb-5">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    bg-red-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <Trash2
                                    size={28}
                                    className="text-red-600"
                                />

                            </div>

                        </div>


                        {/* Titre */}

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-slate-800
                                text-center
                            "
                        >

                            Supprimer le recruteur ?

                        </h2>


                        {/* Description */}

                        <p
                            className="
                                text-center
                                text-slate-500
                                mt-3
                                leading-relaxed
                            "
                        >

                            Voulez-vous vraiment supprimer
                            le compte de{" "}

                            <span
                                className="
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                {deleteModal.fullName}
                            </span>
                            ?

                        </p>


                        {/* Avertissement */}

                        <div
                            className="
                                mt-4
                                bg-red-50
                                border
                                border-red-100
                                rounded-xl
                                px-4
                                py-3
                                text-center
                                text-sm
                                text-red-600
                            "
                        >

                            Cette action est irréversible.

                        </div>


                        {/* Boutons */}

                        <div
                            className="
                                flex
                                gap-3
                                mt-7
                            "
                        >

                            <button
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="
                                    flex-1
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    text-slate-700
                                    font-medium
                                    hover:bg-slate-50
                                    transition
                                    disabled:opacity-50
                                "
                            >

                                Annuler

                            </button>


                            <button
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="
                                    flex-1
                                    px-4
                                    py-3
                                    rounded-xl
                                    bg-red-600
                                    hover:bg-red-700
                                    text-white
                                    font-medium
                                    transition
                                    disabled:opacity-50
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                <Trash2 size={18} />

                                {deleting
                                    ? "Suppression..."
                                    : "Supprimer"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================================
                MESSAGE SUCCÈS
            ===================================================== */}

            {successMessage && (

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        bg-green-50
                        border
                        border-green-200
                        text-green-700
                        px-5
                        py-4
                        rounded-xl
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <CheckCircle
                            size={22}
                            className="text-green-600"
                        />

                        <span className="font-medium">

                            {successMessage}

                        </span>

                    </div>


                    <button
                        onClick={() => setSuccessMessage("")}
                        className="
                            text-green-600
                            hover:text-green-800
                        "
                    >

                        <X size={20} />

                    </button>

                </div>

            )}


            {/* =====================================================
                MESSAGE ERREUR
            ===================================================== */}

            {errorMessage && (

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        bg-red-50
                        border
                        border-red-200
                        text-red-700
                        px-5
                        py-4
                        rounded-xl
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <AlertCircle
                            size={22}
                            className="text-red-600"
                        />

                        <span className="font-medium">

                            {errorMessage}

                        </span>

                    </div>


                    <button
                        onClick={() => setErrorMessage("")}
                        className="
                            text-red-600
                            hover:text-red-800
                        "
                    >

                        <X size={20} />

                    </button>

                </div>

            )}


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
            >
                <button
        onClick={() => navigate("/admin/dashboard")}
        className="
            flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            font-medium
            hover:bg-slate-50
            hover:text-blue-600
            transition
        "
    >
        ← Retour
    </button>

                <div>
                    
                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-800
                        "
                    >

                        Gestion des recruteurs

                    </h1>


                    <p
                        className="
                            text-slate-500
                            mt-2
                        "
                    >

                        Créer et gérer les comptes
                        des recruteurs.

                    </p>

                </div>


                {/* Bouton actualiser */}

                <button
                    onClick={loadRecruiters}
                    disabled={loading}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-xl
                        bg-slate-100
                        hover:bg-slate-200
                        text-slate-700
                        font-medium
                        transition
                        disabled:opacity-50
                    "
                >

                    <RefreshCw
                        size={18}
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Actualiser

                </button>

            </div>


            {/* =====================================================
                CRÉATION RECRUTEUR
            ===================================================== */}

            <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                "
            >

                {/* Header section */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        mb-6
                    "
                >

                    <div
                        className="
                            w-11
                            h-11
                            rounded-xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <UserPlus
                            size={22}
                            className="text-blue-600"
                        />

                    </div>


                    <div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-slate-800
                            "
                        >

                            Créer un recruteur

                        </h2>


                        <p
                            className="
                                text-sm
                                text-slate-500
                            "
                        >

                            Le compte sera créé
                            par l'administrateur.

                        </p>

                    </div>

                </div>


                {/* Formulaire */}

                <form
                    onSubmit={handleCreate}
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                    "
                >

                    {/* Nom */}

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                text-slate-600
                                mb-2
                            "
                        >

                            Nom complet

                        </label>


                        <div className="relative">

                            <User
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-3.5
                                    text-slate-400
                                "
                            />


                            <input
                                type="text"
                                name="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                                placeholder="Nom du recruteur"
                                className="
                                    w-full
                                    pl-11
                                    pr-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    outline-none
                                "
                            />

                        </div>

                    </div>


                    {/* Email */}

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                text-slate-600
                                mb-2
                            "
                        >

                            Email

                        </label>


                        <div className="relative">

                            <Mail
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-3.5
                                    text-slate-400
                                "
                            />


                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="recruteur@example.com"
                                className="
                                    w-full
                                    pl-11
                                    pr-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    outline-none
                                "
                            />

                        </div>

                    </div>


                    {/* Mot de passe */}

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                text-slate-600
                                mb-2
                            "
                        >

                            Mot de passe temporaire

                        </label>


                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-slate-300
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-blue-500
                                outline-none
                            "
                        />

                    </div>


                    {/* Bouton */}

                    <div className="flex items-end">

                        <button
                            type="submit"
                            disabled={creating}
                            className="
                                w-full
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:bg-blue-300
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-2
                                transition
                                font-medium
                            "
                        >

                            <UserPlus size={18} />

                            {creating
                                ? "Création..."
                                : "Créer le recruteur"
                            }

                        </button>

                    </div>

                </form>

            </div>


            {/* =====================================================
                LISTE DES RECRUTEURS
            ===================================================== */}

            <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    overflow-hidden
                "
            >

                {/* Header */}

                <div
                    className="
                        px-8
                        py-6
                        border-b
                        border-slate-200
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-slate-800
                        "
                    >

                        Recruteurs

                    </h2>


                    <p
                        className="
                            text-sm
                            text-slate-500
                            mt-1
                        "
                    >

                        {recruiters.length} recruteur(s)

                    </p>

                </div>


                {/* Loading */}

                {loading ? (

                    <div
                        className="
                            py-16
                            text-center
                            text-slate-500
                        "
                    >

                        <RefreshCw
                            size={30}
                            className="
                                mx-auto
                                mb-3
                                animate-spin
                                text-blue-500
                            "
                        />

                        Chargement des recruteurs...

                    </div>


                ) : recruiters.length === 0 ? (

                    /* Aucun recruteur */

                    <div
                        className="
                            py-16
                            text-center
                        "
                    >

                        <User
                            size={45}
                            className="
                                mx-auto
                                text-slate-300
                                mb-4
                            "
                        />


                        <p
                            className="
                                text-slate-500
                            "
                        >

                            Aucun recruteur trouvé.

                        </p>

                    </div>


                ) : (

                    /* Liste */

                    <div
                        className="
                            divide-y
                            divide-slate-100
                        "
                    >

                        {recruiters.map(
                            (recruiter) => (

                                <div
                                    key={recruiter.id}
                                    className="
                                        px-8
                                        py-5
                                        flex
                                        flex-col
                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                        gap-4
                                        hover:bg-slate-50
                                        transition
                                    "
                                >

                                    {/* Informations */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        <div
                                            className="
                                                w-12
                                                h-12
                                                rounded-full
                                                bg-blue-100
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <User
                                                size={22}
                                                className="text-blue-600"
                                            />

                                        </div>


                                        <div>

                                            <h3
                                                className="
                                                    font-semibold
                                                    text-slate-800
                                                "
                                            >

                                                {
                                                    recruiter.full_name
                                                }

                                            </h3>


                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-slate-500
                                                    mt-1
                                                "
                                            >

                                                <Mail size={15} />

                                                {
                                                    recruiter.email
                                                }

                                            </div>

                                        </div>

                                    </div>


                                    {/* Actions */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        {/* Statut */}

                                        <span
                                            className={`
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                font-medium
                                                flex
                                                items-center
                                                gap-1

                                                ${
                                                    recruiter.is_active

                                                        ? "bg-green-100 text-green-700"

                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >

                                            <ShieldCheck
                                                size={15}
                                            />

                                            {
                                                recruiter.is_active
                                                    ? "Actif"
                                                    : "Inactif"
                                            }

                                        </span>


                                        {/* Supprimer */}

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    recruiter.id,
                                                    recruiter.full_name
                                                )
                                            }
                                            className="
                                                p-2.5
                                                rounded-lg
                                                text-red-500
                                                hover:bg-red-50
                                                hover:text-red-600
                                                transition
                                            "
                                            title="Supprimer"
                                        >

                                            <Trash2
                                                size={19}
                                            />

                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}


export default Recruiters;