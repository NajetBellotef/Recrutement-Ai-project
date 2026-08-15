import {
    X,
    Building2,
    MapPin,
    FileText,
    Brain
} from "lucide-react";

function JobDetailsModal({

    isOpen,

    onClose,

    job

}) {

    if (!isOpen || !job) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center border-b p-6">

                    <h2 className="text-3xl font-bold">

                        Détails de l'offre

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-slate-500 hover:text-red-500"

                    >

                        <X size={28} />

                    </button>

                </div>

                <div className="p-8 space-y-8">

                    <div>

                        <h3 className="text-3xl font-bold text-slate-800">

                            {job.title}

                        </h3>

                        <div className="flex gap-8 mt-4">

                            <div className="flex items-center gap-2 text-slate-600">

                                <Building2 size={18} />

                                {job.company}

                            </div>

                            <div className="flex items-center gap-2 text-slate-600">

                                <MapPin size={18} />

                                {job.location}

                            </div>

                        </div>

                    </div>

                    <div>

                        <div className="flex items-center gap-2 mb-3">

                            <FileText size={20} />

                            <h3 className="text-xl font-bold">

                                Description

                            </h3>

                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 whitespace-pre-line">

                            {job.description}

                        </div>

                    </div>

                    <div>

                        <h3 className="text-xl font-bold mb-3">

                            Compétences recherchées

                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {

                                job.required_skills

                                    ?.split(",")

                                    .map((skill, index) => (

                                        <span

                                            key={index}

                                            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700"

                                        >

                                            {skill.trim()}

                                        </span>

                                    ))

                            }

                        </div>

                    </div>

                    <div>

                        <div className="flex items-center gap-2 mb-3">

                            <Brain size={20} />

                            <h3 className="text-xl font-bold">

                                Analyse IA (Gemini)

                            </h3>

                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 whitespace-pre-line">

                            {job.analysis}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobDetailsModal;