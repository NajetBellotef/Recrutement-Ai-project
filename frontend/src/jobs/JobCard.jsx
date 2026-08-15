import {
    Building2,
    MapPin,
    CalendarDays,
    Pencil,
    Trash2,
    Eye
} from "lucide-react";

function JobCard({

    job,

    onEdit,

    onDelete,

    onView

}) {

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

            {/* Header */}

            <div className="p-6">

                <div className="flex justify-between items-start">

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">

                            {job.title}

                        </h2>

                        <div className="flex items-center gap-2 mt-3 text-slate-600">

                            <Building2 size={18} />

                            {job.company}

                        </div>

                        <div className="flex items-center gap-2 mt-2 text-slate-500">

                            <MapPin size={18} />

                            {job.location}

                        </div>

                    </div>

                </div>

                <div className="mt-6">

                    <p className="text-sm font-semibold text-slate-600 mb-2">

                        Compétences recherchées

                    </p>

                    <div className="flex flex-wrap gap-2">

                        {

                            job.required_skills

                                ?.split(",")

                                .map((skill, index) => (

                                    <span

                                        key={index}

                                        className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"

                                    >

                                        {skill.trim()}

                                    </span>

                                ))

                        }

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-slate-200 px-6 py-4 flex justify-between items-center">

                <div className="flex items-center gap-2 text-slate-500 text-sm">

                    <CalendarDays size={16} />

                    {

                        new Date(job.created_at)

                            .toLocaleDateString("fr-FR")

                    }

                </div>

                <div className="flex gap-3">

                    <button

                        onClick={() => onView(job)}

                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"

                    >

                        <Eye size={18} />

                    </button>

                    <button

                        onClick={() => onEdit(job)}

                        className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"

                    >

                        <Pencil size={18} />

                    </button>

                    <button

                        onClick={() => onDelete(job)}

                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"

                    >

                        <Trash2 size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default JobCard;