import {
    Building2,
    MapPin,
    ArrowRight
} from "lucide-react";

import ScoreBadge from "./ScoreBadge";

function MatchingCard({ match, onDetails }) {

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-3xl font-bold text-slate-800">

                        {match.title}

                    </h2>

                    <div className="flex items-center gap-2 text-slate-600 mt-4">

                        <Building2 size={18} />

                        <span>

                            {match.company}

                        </span>

                    </div>

                    <div className="flex items-center gap-2 text-slate-500 mt-2">

                        <MapPin size={18} />

                        <span>

                            {match.location}

                        </span>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-sm text-slate-500 mb-2">

                        Score global

                    </p>

                    <ScoreBadge score={match.score} />

                </div>

            </div>

            {/* Scores */}

            <div className="grid grid-cols-3 gap-5 mt-8">

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-center">

                    <p className="text-sm text-slate-500">

                        Global

                    </p>

                    <h3 className="text-2xl font-bold text-slate-800 mt-2">

                        {match.score} %

                    </h3>

                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-center">

                    <p className="text-sm text-slate-500">

                        Embedding

                    </p>

                    <h3 className="text-2xl font-bold text-blue-600 mt-2">

                        {match.embedding_score} %

                    </h3>

                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-center">

                    <p className="text-sm text-slate-500">

                        Skills

                    </p>

                    <h3 className="text-2xl font-bold text-green-600 mt-2">

                        {match.skills_score} %

                    </h3>

                </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end mt-8">

                <button

                    onClick={() => onDetails(match)}

                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"

                >

                    Voir détails

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

}

export default MatchingCard;