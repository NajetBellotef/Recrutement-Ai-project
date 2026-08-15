import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    BrainCircuit,
    Target,
    BarChart3,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    CheckCircle2
} from "lucide-react";


function Home() {

    // ==========================
    // Images du slider
    // ==========================

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
            title: "Le recrutement devient intelligent",
            description:
                "Analysez les CV et trouvez les candidats les plus pertinents grâce à l'intelligence artificielle."
        },
        {
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
            title: "Trouvez les meilleurs talents",
            description:
                "Notre plateforme facilite la recherche et la sélection des candidats adaptés à vos offres."
        },
        {
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
            title: "Un matching CV ↔ Offre intelligent",
            description:
                "Comparez automatiquement les compétences et obtenez un score de compatibilité."
        }
    ];


    const [currentSlide, setCurrentSlide] = useState(0);


    // ==========================
    // Slider automatique
    // ==========================

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentSlide((prev) =>
                (prev + 1) % slides.length
            );

        }, 5000);

        return () => clearInterval(interval);

    }, [slides.length]);


    // ==========================
    // Slide précédent
    // ==========================

    function previousSlide() {

        setCurrentSlide((prev) =>
            prev === 0
                ? slides.length - 1
                : prev - 1
        );

    }


    // ==========================
    // Slide suivant
    // ==========================

    function nextSlide() {

        setCurrentSlide((prev) =>
            (prev + 1) % slides.length
        );

    }


    return (

        <div className="min-h-screen bg-slate-50">


            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <header className="
                fixed
                top-0
                left-0
                right-0
                z-50
                bg-white/95
                backdrop-blur-md
                border-b
                border-slate-200
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    lg:px-8
                    h-20
                    flex
                    items-center
                    justify-between
                ">


                    {/* LOGO */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            shadow-lg
                        ">

                            <BrainCircuit
                                size={25}
                                className="text-white"
                            />

                        </div>


                        <div>

                            <h1 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                Recruitment AI

                            </h1>

                            <p className="
                                text-xs
                                text-slate-400
                            ">

                                Intelligent Recruitment

                            </p>

                        </div>

                    </Link>


                    {/* MENU */}

                    <nav className="
                        hidden
                        md:flex
                        items-center
                        gap-8
                    ">

                        <a
                            href="#accueil"
                            className="
                                text-slate-600
                                hover:text-blue-600
                                transition
                            "
                        >
                            Accueil
                        </a>

                        <a
                            href="#fonctionnalites"
                            className="
                                text-slate-600
                                hover:text-blue-600
                                transition
                            "
                        >
                            Fonctionnalités
                        </a>

                        <Link
                            to="/login"
                            className="
                                text-slate-600
                                hover:text-blue-600
                                transition
                            "
                        >
                            Se connecter
                        </Link>

                        <Link
                            to="/register"
                            className="
                                px-5
                                py-2.5
                                rounded-xl
                                bg-blue-600
                                text-white
                                font-medium
                                hover:bg-blue-700
                                transition
                                shadow-md
                            "
                        >
                            S'inscrire
                        </Link>

                    </nav>

                </div>

            </header>


            {/* =====================================================
                HERO + SLIDER
            ===================================================== */}

            <section
                id="accueil"
                className="
                    pt-20
                    min-h-screen
                    flex
                    items-center
                "
            >

                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    lg:px-8
                    py-16
                    w-full
                ">

                    <div className="
                        grid
                        lg:grid-cols-2
                        gap-12
                        items-center
                    ">


                        {/* ==========================
                            TEXTE
                        ========================== */}

                        <div>

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-blue-50
                                text-blue-600
                                text-sm
                                font-medium
                                mb-6
                            ">

                                <BrainCircuit size={17} />

                                Recrutement intelligent par IA

                            </div>


                            <h1 className="
                                text-5xl
                                lg:text-6xl
                                font-bold
                                leading-tight
                                text-slate-900
                            ">

                                Le recrutement

                                <span className="
                                    text-blue-600
                                    block
                                ">

                                    devient intelligent.

                                </span>

                            </h1>


                            <p className="
                                mt-6
                                text-lg
                                leading-relaxed
                                text-slate-500
                                max-w-xl
                            ">

                                Recruitment AI vous aide à analyser les CV,
                                comparer les compétences et identifier
                                les meilleurs candidats pour chaque offre.

                            </p>


                            {/* BOUTONS */}

                            <div className="
                                mt-8
                                flex
                                flex-col
                                sm:flex-row
                                gap-4
                            ">

                                <Link
                                    to="/register"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-7
                                        py-4
                                        rounded-xl
                                        bg-blue-600
                                        text-white
                                        font-semibold
                                        hover:bg-blue-700
                                        transition
                                        shadow-lg
                                    "
                                >

                                    Commencer maintenant

                                    <ArrowRight size={20} />

                                </Link>


                                <Link
                                    to="/login"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        px-7
                                        py-4
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        text-slate-700
                                        font-semibold
                                        hover:border-blue-400
                                        hover:text-blue-600
                                        transition
                                    "
                                >

                                    Se connecter

                                </Link>

                            </div>


                            {/* POINTS */}

                            <div className="
                                mt-8
                                space-y-3
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    text-slate-500
                                ">

                                    <CheckCircle2
                                        size={18}
                                        className="text-green-500"
                                    />

                                    Analyse intelligente des CV

                                </div>


                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    text-slate-500
                                ">

                                    <CheckCircle2
                                        size={18}
                                        className="text-green-500"
                                    />

                                    Matching automatique CV / Offre

                                </div>


                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    text-slate-500
                                ">

                                    <CheckCircle2
                                        size={18}
                                        className="text-green-500"
                                    />

                                    Classement des candidats

                                </div>

                            </div>

                        </div>


                        {/* ==========================
                            SLIDER
                        ========================== */}

                        <div className="
                            relative
                            h-[500px]
                            rounded-3xl
                            overflow-hidden
                            shadow-2xl
                            group
                        ">


                            {slides.map((slide, index) => (

                                <div
                                    key={index}
                                    className={`
                                        absolute
                                        inset-0
                                        transition-opacity
                                        duration-700
                                        ${
                                            index === currentSlide
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }
                                    `}
                                >

                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />


                                    {/* OVERLAY */}

                                    <div className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-slate-950/80
                                        via-slate-950/20
                                        to-transparent
                                    " />


                                    {/* TEXTE IMAGE */}

                                    <div className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        p-8
                                        text-white
                                    ">

                                        <p className="
                                            text-blue-300
                                            text-sm
                                            font-semibold
                                            mb-2
                                        ">

                                            RECRUITMENT AI

                                        </p>


                                        <h2 className="
                                            text-3xl
                                            font-bold
                                        ">

                                            {slide.title}

                                        </h2>


                                        <p className="
                                            mt-3
                                            text-slate-200
                                            leading-relaxed
                                        ">

                                            {slide.description}

                                        </p>

                                    </div>

                                </div>

                            ))}


                            {/* PREVIOUS */}

                            <button
                                onClick={previousSlide}
                                className="
                                    absolute
                                    left-5
                                    top-1/2
                                    -translate-y-1/2
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-white/20
                                    backdrop-blur-md
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-white/40
                                    transition
                                "
                            >

                                <ChevronLeft size={24} />

                            </button>


                            {/* NEXT */}

                            <button
                                onClick={nextSlide}
                                className="
                                    absolute
                                    right-5
                                    top-1/2
                                    -translate-y-1/2
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-white/20
                                    backdrop-blur-md
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-white/40
                                    transition
                                "
                            >

                                <ChevronRight size={24} />

                            </button>


                            {/* INDICATORS */}

                            <div className="
                                absolute
                                bottom-6
                                right-8
                                flex
                                gap-2
                            ">

                                {slides.map((_, index) => (

                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentSlide(index)
                                        }
                                        className={`
                                            h-2
                                            rounded-full
                                            transition-all
                                            ${
                                                index === currentSlide
                                                    ? "w-8 bg-white"
                                                    : "w-2 bg-white/50"
                                            }
                                        `}
                                    />

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FONCTIONNALITÉS
            ===================================================== */}

            <section
                id="fonctionnalites"
                className="
                    py-24
                    bg-white
                "
            >

                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    lg:px-8
                ">


                    <div className="
                        text-center
                        max-w-2xl
                        mx-auto
                        mb-14
                    ">

                        <p className="
                            text-blue-600
                            font-semibold
                            mb-3
                        ">

                            NOS FONCTIONNALITÉS

                        </p>


                        <h2 className="
                            text-4xl
                            font-bold
                            text-slate-800
                        ">

                            Une plateforme pensée pour
                            le recrutement moderne

                        </h2>


                        <p className="
                            mt-4
                            text-slate-500
                        ">

                            Des outils intelligents pour faciliter
                            chaque étape du processus de recrutement.

                        </p>

                    </div>


                    <div className="
                        grid
                        md:grid-cols-3
                        gap-8
                    ">


                        {/* CARD 1 */}

                        <div className="
                            p-8
                            rounded-3xl
                            bg-slate-50
                            border
                            border-slate-100
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition
                        ">

                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-blue-100
                                text-blue-600
                                flex
                                items-center
                                justify-center
                                mb-6
                            ">

                                <BrainCircuit size={28} />

                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                Analyse IA

                            </h3>


                            <p className="
                                mt-3
                                text-slate-500
                                leading-relaxed
                            ">

                                Analysez automatiquement les CV
                                et identifiez les compétences
                                importantes.

                            </p>

                        </div>


                        {/* CARD 2 */}

                        <div className="
                            p-8
                            rounded-3xl
                            bg-slate-50
                            border
                            border-slate-100
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition
                        ">

                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-green-100
                                text-green-600
                                flex
                                items-center
                                justify-center
                                mb-6
                            ">

                                <Target size={28} />

                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                Matching intelligent

                            </h3>


                            <p className="
                                mt-3
                                text-slate-500
                                leading-relaxed
                            ">

                                Comparez les compétences du candidat
                                avec les exigences de chaque offre.

                            </p>

                        </div>


                        {/* CARD 3 */}

                        <div className="
                            p-8
                            rounded-3xl
                            bg-slate-50
                            border
                            border-slate-100
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition
                        ">

                            <div className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-purple-100
                                text-purple-600
                                flex
                                items-center
                                justify-center
                                mb-6
                            ">

                                <BarChart3 size={28} />

                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                Classement & Analyse

                            </h3>


                            <p className="
                                mt-3
                                text-slate-500
                                leading-relaxed
                            ">

                                Classez les candidats selon leur
                                score de compatibilité.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="
                py-20
                bg-slate-950
            ">

                <div className="
                    max-w-4xl
                    mx-auto
                    px-6
                    text-center
                ">

                    <h2 className="
                        text-4xl
                        font-bold
                        text-white
                    ">

                        Prêt à moderniser votre recrutement ?

                    </h2>


                    <p className="
                        mt-4
                        text-slate-400
                        text-lg
                    ">

                        Commencez dès maintenant avec Recruitment AI.

                    </p>


                    <Link
                        to="/register"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mt-8
                            px-7
                            py-4
                            rounded-xl
                            bg-blue-600
                            text-white
                            font-semibold
                            hover:bg-blue-700
                            transition
                        "
                    >

                        Créer un compte

                        <ArrowRight size={20} />

                    </Link>

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <footer className="
                bg-slate-950
                border-t
                border-slate-800
                py-8
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-4
                ">

                    <p className="
                        text-slate-500
                        text-sm
                    ">

                        © 2026 Recruitment AI. Tous droits réservés.

                    </p>


                    <div className="
                        flex
                        gap-6
                        text-sm
                    ">

                        <Link
                            to="/login"
                            className="text-slate-400 hover:text-white"
                        >

                            Connexion

                        </Link>


                        <Link
                            to="/register"
                            className="text-slate-400 hover:text-white"
                        >

                            Inscription

                        </Link>

                    </div>

                </div>

            </footer>

        </div>

    );

}

export default Home;