import {
    useCallback,
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
    Users as UsersIcon,
    User,
    Mail,
    ShieldCheck,
    Shield,
    Trash2,
    RefreshCw,
    ArrowLeft,
    AlertCircle,
    CheckCircle,
    X,
    AlertTriangle
} from "lucide-react";

import api from "../../services/api";


function Users() {

    const navigate = useNavigate();

    // ==========================================
    // ÉTATS
    // ==========================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState(null);

    const [selectedUser, setSelectedUser] = useState(null);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


  // ==========================================
// CHARGER LES UTILISATEURS
// ==========================================

const fetchUsers = useCallback(async () => {
    const response = await api.get("/admin/users");

    console.log(
        "Utilisateurs reçus :",
        response.data
    );

    return response.data;
}, []);


// ==========================================
// ACTUALISER LES UTILISATEURS
// ==========================================

const loadUsers = useCallback(async () => {
    try {
        setLoading(true);
        setError("");

        const data = await fetchUsers();

        setUsers(data);

    } catch (err) {
        console.error(
            "Erreur lors du chargement des utilisateurs :",
            err
        );

        if (err.response?.status === 401) {
            setError(
                "Votre session a expiré. Veuillez vous reconnecter."
            );

        } else if (err.response?.status === 403) {
            setError(
                "Accès refusé. Cette page est réservée à l'administrateur."
            );

        } else {
            setError(
                "Impossible de charger les utilisateurs."
            );
        }

    } finally {
        setLoading(false);
    }
}, [fetchUsers]);


// ==========================================
// BOUTON ACTUALISER
// ==========================================

const handleRefresh = async () => {
    setError("");
    setSuccess("");

    await loadUsers();
};


// ==========================================
// PREMIER CHARGEMENT
// ==========================================

useEffect(() => {
    let cancelled = false;

    fetchUsers()
        .then((data) => {
            if (cancelled) {
                return;
            }

            setUsers(data);
            setError("");
            setLoading(false);
        })
        .catch((err) => {
            if (cancelled) {
                return;
            }

            console.error(
                "Erreur lors du chargement des utilisateurs :",
                err
            );

            if (err.response?.status === 401) {
                setError(
                    "Votre session a expiré. Veuillez vous reconnecter."
                );
            } else if (err.response?.status === 403) {
                setError(
                    "Accès refusé. Cette page est réservée à l'administrateur."
                );
            } else {
                setError(
                    "Impossible de charger les utilisateurs."
                );
            }

            setLoading(false);
        });

    return () => {
        cancelled = true;
    };
}, [fetchUsers]);
    // ==========================================
    // OUVRIR CONFIRMATION SUPPRESSION
    // ==========================================

    const handleDeleteClick = (user) => {

        setError("");

        setSuccess("");

        setSelectedUser(user);

    };


    // ==========================================
    // ANNULER SUPPRESSION
    // ==========================================

    const handleCancelDelete = () => {

        if (deletingId !== null) {
            return;
        }

        setSelectedUser(null);

    };


    // ==========================================
    // CONFIRMER SUPPRESSION
    // ==========================================

    const handleConfirmDelete = async () => {

        if (!selectedUser) {
            return;
        }

        const user = selectedUser;

        try {

            setDeletingId(user.id);

            setError("");

            setSuccess("");

            console.log(
                "Suppression utilisateur :",
                user.id
            );

            await api.delete(
                `/admin/users/${user.id}`
            );


            // Retirer immédiatement
            // l'utilisateur de la liste

            setUsers((currentUsers) =>

                currentUsers.filter(
                    (item) => item.id !== user.id
                )

            );


            setSelectedUser(null);


            setSuccess(
                `Le compte de ${user.full_name} a été supprimé avec succès.`
            );


        } catch (err) {

            console.error(
                "Erreur lors de la suppression :",
                err
            );


            if (err.response?.status === 404) {

                setError(
                    "Utilisateur introuvable."
                );

            } else if (err.response?.status === 401) {

                setError(
                    "Votre session a expiré. Veuillez vous reconnecter."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "Vous n'avez pas l'autorisation de supprimer cet utilisateur."
                );

            } else {

                setError(
                    "Impossible de supprimer cet utilisateur."
                );
            }

        } finally {

            setDeletingId(null);

        }

    };


    // ==========================================
    // RÔLE
    // ==========================================

    const getRoleLabel = (role) => {

        switch (role) {

            case "admin":
                return "Administrateur";

            case "recruiter":
                return "Recruteur";

            case "candidate":
                return "Candidat";

            default:
                return role;

        }

    };


    // ==========================================
    // STYLE DU RÔLE
    // ==========================================

    const getRoleStyle = (role) => {

        switch (role) {

            case "admin":

                return "bg-amber-100 text-amber-700";

            case "recruiter":

                return "bg-purple-100 text-purple-700";

            case "candidate":

                return "bg-blue-100 text-blue-700";

            default:

                return "bg-gray-100 text-gray-700";

        }

    };


    // ==========================================
    // ICÔNE DU RÔLE
    // ==========================================

    const getRoleIcon = (role) => {

        switch (role) {

            case "admin":

                return <ShieldCheck size={16} />;

            case "recruiter":

                return <Shield size={16} />;

            default:

                return <User size={16} />;

        }

    };


    // ==========================================
    // RETOUR DASHBOARD
    // ==========================================

    const handleBack = () => {

        navigate("/admin/dashboard");

    };


    // ==========================================
    // INTERFACE
    // ==========================================

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-7xl mx-auto">


                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="flex items-center justify-between mb-8">

                    <div className="flex items-center gap-5">

                        <button
                            onClick={handleBack}
                            className="
                                flex items-center gap-2
                                px-5 py-3
                                bg-white
                                border border-slate-200
                                rounded-xl
                                text-slate-700
                                font-medium
                                hover:bg-slate-50
                                hover:border-blue-300
                                transition
                                shadow-sm
                            "
                        >

                            <ArrowLeft size={20} />

                            Retour

                        </button>


                        <div>

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        w-12 h-12
                                        rounded-xl
                                        bg-blue-100
                                        flex items-center justify-center
                                        text-blue-600
                                    "
                                >

                                    <UsersIcon size={26} />

                                </div>


                                <div>

                                    <h1
                                        className="
                                            text-3xl
                                            font-bold
                                            text-slate-900
                                        "
                                    >
                                        Gestion des utilisateurs
                                    </h1>


                                    <p className="text-slate-500 mt-1">

                                        Consulter et gérer les comptes
                                        de la plateforme.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ======================================
                        ACTUALISER
                    ====================================== */}

                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="
                            flex items-center gap-2
                            px-5 py-3
                            bg-white
                            border border-slate-200
                            rounded-xl
                            text-slate-700
                            font-medium
                            hover:bg-slate-50
                            transition
                            shadow-sm
                            disabled:opacity-50
                        "
                    >

                        <RefreshCw
                            size={20}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Actualiser

                    </button>

                </div>


                {/* ======================================
                    MESSAGE ERREUR
                ====================================== */}

                {error && (

                    <div
                        className="
                            mb-6
                            flex items-center gap-3
                            p-4
                            bg-red-50
                            border border-red-200
                            text-red-700
                            rounded-xl
                        "
                    >

                        <AlertCircle size={22} />

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* ======================================
                    MESSAGE SUCCÈS
                ====================================== */}

                {success && (

                    <div
                        className="
                            mb-6
                            flex items-center gap-3
                            p-4
                            bg-green-50
                            border border-green-200
                            text-green-700
                            rounded-xl
                        "
                    >

                        <CheckCircle size={22} />

                        <span>
                            {success}
                        </span>

                    </div>

                )}


                {/* ======================================
                    STATISTIQUE
                ====================================== */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        border border-slate-200
                        shadow-sm
                        p-6
                        mb-6
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500 text-sm">
                                Utilisateurs enregistrés
                            </p>

                            <p
                                className="
                                    text-4xl
                                    font-bold
                                    text-slate-900
                                    mt-1
                                "
                            >
                                {users.length}
                            </p>

                        </div>


                        <div
                            className="
                                w-14 h-14
                                rounded-xl
                                bg-blue-100
                                flex items-center justify-center
                                text-blue-600
                            "
                        >

                            <UsersIcon size={28} />

                        </div>

                    </div>

                </div>


                {/* ======================================
                    LISTE DES UTILISATEURS
                ====================================== */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        border border-slate-200
                        shadow-sm
                        overflow-hidden
                    "
                >

                    {/* HEADER */}

                    <div
                        className="
                            px-6 py-5
                            border-b border-slate-200
                            flex items-center justify-between
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Tous les utilisateurs
                            </h2>

                            <p className="text-slate-500 mt-1">

                                Liste des comptes enregistrés
                                sur Recruitment AI.

                            </p>

                        </div>

                    </div>


                    {/* CHARGEMENT */}

                    {loading && (

                        <div
                            className="
                                py-20
                                flex flex-col
                                items-center
                                justify-center
                                text-slate-500
                            "
                        >

                            <RefreshCw
                                size={35}
                                className="
                                    animate-spin
                                    text-blue-600
                                    mb-4
                                "
                            />

                            <p>
                                Chargement des utilisateurs...
                            </p>

                        </div>

                    )}


                    {/* AUCUN UTILISATEUR */}

                    {!loading &&
                        users.length === 0 &&
                        !error && (

                            <div
                                className="
                                    py-20
                                    text-center
                                    text-slate-500
                                "
                            >

                                <UsersIcon
                                    size={50}
                                    className="
                                        mx-auto
                                        mb-4
                                        text-slate-300
                                    "
                                />

                                <p className="text-lg font-medium">

                                    Aucun utilisateur trouvé.

                                </p>

                            </div>

                        )}


                    {/* LISTE */}

                    {!loading && users.length > 0 && (

                        <div>

                            {users.map((user, index) => (

                                <div
                                    key={user.id}
                                    className={`
                                        px-6 py-5
                                        flex items-center justify-between
                                        gap-6
                                        hover:bg-slate-50
                                        transition

                                        ${
                                            index !== users.length - 1
                                                ? "border-b border-slate-100"
                                                : ""
                                        }
                                    `}
                                >


                                    {/* INFORMATIONS */}

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                                w-12 h-12
                                                rounded-full
                                                bg-blue-100
                                                flex items-center justify-center
                                                text-blue-600
                                                flex-shrink-0
                                            "
                                        >

                                            <User size={24} />

                                        </div>


                                        <div>

                                            <h3
                                                className="
                                                    font-semibold
                                                    text-slate-900
                                                    text-lg
                                                "
                                            >

                                                {user.full_name}

                                            </h3>


                                            <div
                                                className="
                                                    flex items-center gap-2
                                                    text-slate-500
                                                    mt-1
                                                "
                                            >

                                                <Mail size={16} />

                                                <span>
                                                    {user.email}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* RÔLE */}

                                    <div
                                        className={`
                                            flex items-center gap-2
                                            px-4 py-2
                                            rounded-full
                                            text-sm
                                            font-medium
                                            ${getRoleStyle(user.role)}
                                        `}
                                    >

                                        {getRoleIcon(user.role)}

                                        {getRoleLabel(user.role)}

                                    </div>


                                    {/* STATUT */}

                                    <div>

                                        {user.is_active ? (

                                            <span
                                                className="
                                                    inline-flex
                                                    items-center gap-2
                                                    px-4 py-2
                                                    rounded-full
                                                    bg-green-100
                                                    text-green-700
                                                    text-sm
                                                    font-medium
                                                "
                                            >

                                                <span
                                                    className="
                                                        w-2 h-2
                                                        rounded-full
                                                        bg-green-500
                                                    "
                                                />

                                                Actif

                                            </span>

                                        ) : (

                                            <span
                                                className="
                                                    inline-flex
                                                    items-center gap-2
                                                    px-4 py-2
                                                    rounded-full
                                                    bg-red-100
                                                    text-red-700
                                                    text-sm
                                                    font-medium
                                                "
                                            >

                                                <span
                                                    className="
                                                        w-2 h-2
                                                        rounded-full
                                                        bg-red-500
                                                    "
                                                />

                                                Inactif

                                            </span>

                                        )}

                                    </div>


                                    {/* SUPPRESSION */}

                                    <button
                                        onClick={() =>
                                            handleDeleteClick(user)
                                        }
                                        disabled={
                                            deletingId === user.id
                                        }
                                        title="Supprimer l'utilisateur"
                                        className="
                                            w-11 h-11
                                            flex items-center justify-center
                                            rounded-xl
                                            text-red-500
                                            hover:bg-red-50
                                            hover:text-red-600
                                            transition
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                        "
                                    >

                                        {deletingId === user.id ? (

                                            <RefreshCw
                                                size={20}
                                                className="animate-spin"
                                            />

                                        ) : (

                                            <Trash2 size={20} />

                                        )}

                                    </button>


                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* ==========================================
                MODAL CONFIRMATION SUPPRESSION
            ========================================== */}

            {selectedUser && (

                <div
                    className="
                        fixed inset-0
                        z-50
                        flex items-center justify-center
                        bg-black/50
                        backdrop-blur-sm
                        p-4
                    "
                >

                    <div
                        className="
                            bg-white
                            w-full
                            max-w-md
                            rounded-2xl
                            shadow-2xl
                            overflow-hidden
                        "
                    >

                        {/* HEADER MODAL */}

                        <div
                            className="
                                flex items-center justify-between
                                px-6 py-5
                                border-b border-slate-200
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        w-11 h-11
                                        rounded-full
                                        bg-red-100
                                        text-red-600
                                        flex items-center justify-center
                                    "
                                >

                                    <AlertTriangle size={22} />

                                </div>


                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    Confirmer la suppression
                                </h2>

                            </div>


                            <button
                                onClick={handleCancelDelete}
                                disabled={deletingId !== null}
                                className="
                                    w-9 h-9
                                    rounded-lg
                                    flex items-center justify-center
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-600
                                    transition
                                    disabled:opacity-50
                                "
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* CONTENU */}

                        <div className="px-6 py-6">

                            <p className="text-slate-600 leading-relaxed">

                                Voulez-vous vraiment supprimer le compte
                                de{" "}

                                <strong className="text-slate-900">

                                    {selectedUser.full_name}

                                </strong>

                                {" "}?

                            </p>


                            <div
                                className="
                                    mt-4
                                    p-4
                                    bg-red-50
                                    border border-red-100
                                    rounded-xl
                                "
                            >

                                <div className="flex items-start gap-3">

                                    <AlertTriangle
                                        size={20}
                                        className="text-red-500 mt-0.5"
                                    />

                                    <p
                                        className="
                                            text-sm
                                            text-red-700
                                        "
                                    >

                                        Cette action est irréversible.
                                        Le compte sera définitivement
                                        supprimé de la plateforme.

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* BOUTONS */}

                        <div
                            className="
                                px-6 py-5
                                bg-slate-50
                                border-t border-slate-200
                                flex justify-end gap-3
                            "
                        >

                            <button
                                onClick={handleCancelDelete}
                                disabled={deletingId !== null}
                                className="
                                    px-5 py-3
                                    rounded-xl
                                    border border-slate-300
                                    bg-white
                                    text-slate-700
                                    font-medium
                                    hover:bg-slate-100
                                    transition
                                    disabled:opacity-50
                                "
                            >

                                Annuler

                            </button>


                            <button
                                onClick={handleConfirmDelete}
                                disabled={deletingId !== null}
                                className="
                                    px-5 py-3
                                    rounded-xl
                                    bg-red-600
                                    text-white
                                    font-medium
                                    flex items-center gap-2
                                    hover:bg-red-700
                                    transition
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {deletingId !== null ? (

                                    <>
                                        <RefreshCw
                                            size={18}
                                            className="animate-spin"
                                        />

                                        Suppression...

                                    </>

                                ) : (

                                    <>
                                        <Trash2 size={18} />

                                        Supprimer

                                    </>

                                )}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default Users;