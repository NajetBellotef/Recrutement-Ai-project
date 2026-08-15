import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    UserPlus,
    BrainCircuit,
    Eye,
    EyeOff
} from "lucide-react";

import api from "../../services/api";


function Register() {

    const navigate = useNavigate();


    // ==========================
    // FORMULAIRE
    // ==========================

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        
    });


    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ==========================
    // CHANGEMENT DES CHAMPS
    // ==========================

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    }


    // ==========================
    // INSCRIPTION
    // ==========================

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Vérification simple

        if (
            !formData.full_name ||
            !formData.email ||
            !formData.password
        ) {

            setError(
                "Veuillez remplir tous les champs obligatoires."
            );

            return;
        }


        if (formData.password.length < 6) {

            setError(
                "Le mot de passe doit contenir au moins 6 caractères."
            );

            return;
        }


        try {

            setLoading(true);


            console.log(
                "Données envoyées au backend :",
                formData
            );


            // ==========================
            // APPEL FASTAPI
            // ==========================

            const response = await api.post(
                "/auth/register",
                formData
            );


            console.log(
                "Réponse inscription :",
                response.data
            );


            setSuccess(
                "Votre compte a été créé avec succès !"
            );


            // Redirection vers Login

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (err) {

            console.error(
                "Erreur inscription :",
                err
            );


            // Erreur FastAPI

            const detail =
                err.response?.data?.detail;


            if (Array.isArray(detail)) {

                setError(
                    detail
                        .map((item) => item.msg)
                        .join(", ")
                );

            } else {

                setError(
                    detail ||
                    "Impossible de créer le compte."
                );

            }

        } finally {

            setLoading(false);

        }

    }


    return (

        <div className="
            min-h-screen
            bg-slate-50
            flex
            items-center
            justify-center
            px-4
            py-10
        ">


            {/* ==========================
                CONTAINER
            ========================== */}

            <div className="
                w-full
                max-w-5xl
                bg-white
                rounded-3xl
                shadow-2xl
                overflow-hidden
                grid
                md:grid-cols-2
            ">


                {/* ==========================
                    PARTIE GAUCHE
                ========================== */}

                <div className="
                    hidden
                    md:flex
                    flex-col
                    justify-center
                    p-12
                    bg-blue-600
                    text-white
                ">

                    <div className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-white/20
                        flex
                        items-center
                        justify-center
                        mb-8
                    ">

                        <BrainCircuit size={32} />

                    </div>


                    <h1 className="
                        text-4xl
                        font-bold
                        leading-tight
                    ">

                        Rejoignez
                        <span className="block">
                            Recruitment AI
                        </span>

                    </h1>


                    <p className="
                        mt-6
                        text-blue-100
                        leading-relaxed
                        text-lg
                    ">

                        Une plateforme intelligente pour
                        connecter les talents et les
                        opportunités grâce à l'intelligence
                        artificielle.

                    </p>


                    <div className="
                        mt-8
                        space-y-4
                        text-blue-50
                    ">

                        <p>
                            ✓ Analyse intelligente des CV
                        </p>

                        <p>
                            ✓ Matching CV / offres
                        </p>

                        <p>
                            ✓ Classement des candidats
                        </p>

                    </div>

                </div>


                {/* ==========================
                    FORMULAIRE
                ========================== */}

                <div className="p-8 md:p-12">


                    {/* TITRE */}

                    <div className="mb-8">

                        <div className="
                            md:hidden
                            w-12
                            h-12
                            rounded-xl
                            bg-blue-600
                            text-white
                            flex
                            items-center
                            justify-center
                            mb-5
                        ">

                            <BrainCircuit size={25} />

                        </div>


                        <h2 className="
                            text-3xl
                            font-bold
                            text-slate-800
                        ">

                            Créer un compte

                        </h2>


                        <p className="
                            mt-2
                            text-slate-500
                        ">

                            Commencez votre expérience
                            avec Recruitment AI.

                        </p>

                    </div>


                    {/* ==========================
                        ERREUR
                    ========================== */}

                    {error && (

                        <div className="
                            mb-5
                            p-4
                            rounded-xl
                            bg-red-50
                            border
                            border-red-200
                            text-red-600
                            text-sm
                        ">

                            {error}

                        </div>

                    )}


                    {/* ==========================
                        SUCCÈS
                    ========================== */}

                    {success && (

                        <div className="
                            mb-5
                            p-4
                            rounded-xl
                            bg-green-50
                            border
                            border-green-200
                            text-green-600
                            text-sm
                        ">

                            {success}

                        </div>

                    )}


                    {/* ==========================
                        FORM
                    ========================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* NOM */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">

                                Nom complet

                            </label>


                            <div className="relative">

                                <User
                                    size={19}
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
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="Votre nom complet"
                                    className="
                                        w-full
                                        pl-11
                                        pr-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-200
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                        transition
                                    "
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">

                                Adresse email

                            </label>


                            <div className="relative">

                                <Mail
                                    size={19}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="exemple@email.com"
                                    className="
                                        w-full
                                        pl-11
                                        pr-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-200
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                        transition
                                    "
                                />

                            </div>

                        </div>


                        {/* MOT DE PASSE */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">

                                Mot de passe

                            </label>


                            <div className="relative">

                                <Lock
                                    size={19}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="
                                        w-full
                                        pl-11
                                        pr-12
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-200
                                        outline-none
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                        transition
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                    "
                                >

                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* ==========================
                            BOUTON
                        ========================== */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                py-3.5
                                rounded-xl
                                bg-blue-600
                                text-white
                                font-semibold
                                hover:bg-blue-700
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                                transition
                                shadow-lg
                            "
                        >

                            <UserPlus size={20} />

                            {loading
                                ? "Création du compte..."
                                : "Créer mon compte"
                            }

                        </button>

                    </form>


                    {/* ==========================
                        LOGIN
                    ========================== */}

                    <p className="
                        mt-7
                        text-center
                        text-sm
                        text-slate-500
                    ">

                        Vous avez déjà un compte ?

                        {" "}

                        <Link
                            to="/login"
                            className="
                                text-blue-600
                                font-semibold
                                hover:text-blue-700
                            "
                        >

                            Se connecter

                        </Link>

                    </p>


                    {/* RETOUR */}

                    <div className="
                        mt-5
                        text-center
                    ">

                        <Link
                            to="/"
                            className="
                                text-sm
                                text-slate-400
                                hover:text-blue-600
                            "
                        >

                            ← Retour à l'accueil

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}
export default Register;