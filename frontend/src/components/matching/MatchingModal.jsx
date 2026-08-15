import {
    X,
    Building2,
    MapPin,
    Sparkles,
    CheckCircle2,
    CircleX
} from "lucide-react";

import SkillBadge from "./SkillBadge";

function MatchingModal({ match, onClose }) {

    if (!match) return null;

    const commonSkills = match.common_skills
        ? match.common_skills.split(",").map(skill => skill.trim())
        : [];

    const missingSkills = match.missing_skills
        ? match.missing_skills.split(",").map(skill => skill.trim())
        : [];

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-start border-b border-slate-200 p-8">

                    <div>

                        <h2 className="text-4xl font-bold text-slate-800">

                            {match.title}

                        </h2>

                        <div className="flex items-center gap-2 text-slate-600 mt-4">

                            <Building2 size={18} />

                            <span>{match.company}</span>

                        </div>

                        <div className="flex items-center gap-2 text-slate-500 mt-2">

                            <MapPin size={18} />

                            <span>{match.location}</span>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="p-2 rounded-lg hover:bg-slate-100"

                    >

                        <X size={28} />

                    </button>

                </div>

                {/* Scores */}

                <div className="grid grid-cols-3 gap-6 p-8">

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">

                        <p className="text-slate-500">

                            Score Global

                        </p>

                        <h3 className="text-4xl font-bold text-blue-600 mt-3">

                            {match.score} %

                        </h3>

                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">

                        <p className="text-slate-500">

                            Embedding

                        </p>

                        <h3 className="text-4xl font-bold text-green-600 mt-3">

                            {match.embedding_score} %

                        </h3>

                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">

                        <p className="text-slate-500">

                            Skills

                        </p>

                        <h3 className="text-4xl font-bold text-orange-500 mt-3">

                            {match.skills_score} %

                        </h3>

                    </div>

                </div>

                {/* Skills */}

                <div className="px-8 pb-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="bg-white border border-slate-200 rounded-2xl p-6">

                            <div className="flex items-center gap-2 mb-5">

                                <CheckCircle2 className="text-green-600" />

                                <h3 className="text-xl font-bold">

                                    Compétences communes

                                </h3>

                            </div>

                            <div className="flex flex-wrap gap-3">

                                {

                                    commonSkills.length > 0 ?

                                    commonSkills.map((skill, index) => (

                                        <SkillBadge

                                            key={index}

                                            skill={skill}

                                            type="success"

                                        />

                                    ))

                                    :

                                    <p className="text-slate-500">

                                        Aucune compétence.

                                    </p>

                                }

                            </div>

                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6">

                            <div className="flex items-center gap-2 mb-5">

                                <CircleX className="text-red-600" />

                                <h3 className="text-xl font-bold">

                                    Compétences manquantes

                                </h3>

                            </div>

                            <div className="flex flex-wrap gap-3">

                                {

                                    missingSkills.length > 0 ?

                                    missingSkills.map((skill, index) => (

                                        <SkillBadge

                                            key={index}

                                            skill={skill}

                                            type="danger"

                                        />

                                    ))

                                    :

                                    <p className="text-slate-500">

                                        Aucune compétence.

                                    </p>

                                }

                            </div>

                        </div>

                    </div>

                </div>

                {/* Analyse IA */}

                <div className="px-8 pb-8">

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

                        <div className="flex items-center gap-3 mb-4">

                            <Sparkles className="text-blue-600" />

                            <h3 className="text-2xl font-bold">

                                Analyse IA

                            </h3>

                        </div>

                        <p className="text-slate-700 whitespace-pre-line leading-8">

                            {match.comment}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default MatchingModal;