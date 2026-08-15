import { useState } from "react";
import { X } from "lucide-react";

function JobFormModal({
    isOpen,
    onClose,
    onSubmit,
    editingJob
}) {

    // =========================================================
    // FORMULAIRE
    // =========================================================

    const [form, setForm] = useState(() => ({
        title: editingJob?.title ?? "",
        company: editingJob?.company ?? "",
        location: editingJob?.location ?? "",
        description: editingJob?.description ?? "",
        required_skills: editingJob?.required_skills ?? ""
    }));

    const [saving, setSaving] = useState(false);


    // =========================================================
    // GESTION DES CHAMPS
    // =========================================================

    function handleChange(e) {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    }


    // =========================================================
    // SOUMISSION
    // =========================================================

    async function handleSubmit(e) {

        e.preventDefault();

        if (saving) {
            return;
        }

        try {

            setSaving(true);

            await onSubmit(form);

        } catch (error) {

            console.error(
                "Erreur lors de l'enregistrement :",
                error
            );

        } finally {

            setSaving(false);

        }

    }


    // =========================================================
    // FERMER LE MODAL
    // =========================================================

    if (!isOpen) {
        return null;
    }


    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/40
                flex
                items-center
                justify-center
                p-4
                overflow-y-auto
            "
        >

            {/* =====================================================
                MODAL
            ===================================================== */}

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    w-full
                    max-w-3xl
                    max-h-[90vh]
                    flex
                    flex-col
                    overflow-hidden
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        border-b
                        px-6
                        sm:px-8
                        py-5
                        flex-shrink-0
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                text-slate-800
                            "
                        >

                            {editingJob
                                ? "Modifier une offre"
                                : "Nouvelle offre"
                            }

                        </h2>

                        <p
                            className="
                                text-sm
                                text-slate-500
                                mt-1
                            "
                        >

                            {editingJob
                                ? "Modifiez les informations de cette offre."
                                : "Ajoutez une nouvelle offre de recrutement."
                            }

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex-shrink-0
                            ml-4
                            p-2
                            rounded-lg
                            text-slate-500
                            hover:text-red-500
                            hover:bg-red-50
                            transition
                        "
                        aria-label="Fermer"
                    >

                        <X size={24} />

                    </button>

                </div>


                {/* =================================================
                    FORMULAIRE
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        flex
                        flex-col
                        flex-1
                        min-h-0
                    "
                >

                    {/* =============================================
                        CORPS SCROLLABLE
                    ============================================= */}

                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            px-6
                            sm:px-8
                            py-6
                            space-y-5
                        "
                    >

                        {/* =========================================
                            TITRE
                        ========================================= */}

                        <div>

                            <label
                                htmlFor="title"
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                "
                            >
                                Titre du poste
                            </label>

                            <input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Ex : Développeur Backend Python / FastAPI"
                                value={form.title}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-xl
                                    p-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    transition
                                    box-border
                                "
                                required
                            />

                        </div>


                        {/* =========================================
                            ENTREPRISE
                        ========================================= */}

                        <div>

                            <label
                                htmlFor="company"
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                "
                            >
                                Entreprise
                            </label>

                            <input
                                id="company"
                                type="text"
                                name="company"
                                placeholder="Ex : TechVision Tunisia"
                                value={form.company}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-xl
                                    p-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    transition
                                    box-border
                                "
                                required
                            />

                        </div>


                        {/* =========================================
                            LOCALISATION
                        ========================================= */}

                        <div>

                            <label
                                htmlFor="location"
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                "
                            >
                                Localisation
                            </label>

                            <input
                                id="location"
                                type="text"
                                name="location"
                                placeholder="Ex : Tunis, Tunisie – Hybride"
                                value={form.location}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-xl
                                    p-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    transition
                                    box-border
                                "
                            />

                        </div>


                        {/* =========================================
                            DESCRIPTION
                        ========================================= */}

                        <div>

                            <label
                                htmlFor="description"
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                "
                            >
                                Description complète
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                rows={6}
                                placeholder="Décrivez le poste, les missions, le profil recherché..."
                                value={form.description}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-xl
                                    p-3
                                    outline-none
                                    resize-y
                                    min-h-[150px]
                                    max-h-[350px]
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    transition
                                    box-border
                                "
                                required
                            />

                        </div>


                        {/* =========================================
                            COMPÉTENCES
                        ========================================= */}

                        <div>

                            <label
                                htmlFor="required_skills"
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                "
                            >
                                Compétences requises
                            </label>

                            <textarea
                                id="required_skills"
                                name="required_skills"
                                rows={3}
                                placeholder="Python, FastAPI, PostgreSQL, Docker, Git..."
                                value={form.required_skills}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-xl
                                    p-3
                                    outline-none
                                    resize-y
                                    min-h-[100px]
                                    max-h-[220px]
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    transition
                                    box-border
                                "
                            />

                        </div>

                    </div>


                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div
                        className="
                            flex-shrink-0
                            border-t
                            bg-white
                            px-6
                            sm:px-8
                            py-4
                            flex
                            flex-col-reverse
                            sm:flex-row
                            justify-end
                            gap-3
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="
                                w-full
                                sm:w-auto
                                px-6
                                py-3
                                rounded-xl
                                bg-slate-200
                                text-slate-700
                                font-medium
                                hover:bg-slate-300
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >

                            Annuler

                        </button>


                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                w-full
                                sm:w-auto
                                px-6
                                py-3
                                rounded-xl
                                bg-blue-600
                                text-white
                                font-medium
                                hover:bg-blue-700
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >

                            {saving
                                ? "Enregistrement..."
                                : editingJob
                                    ? "Enregistrer"
                                    : "Créer"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default JobFormModal;