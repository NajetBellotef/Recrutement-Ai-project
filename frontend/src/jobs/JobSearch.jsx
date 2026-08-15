import { Search } from "lucide-react";

function JobSearch({

    search,

    setSearch,

    onNewJob

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

            <div className="flex flex-col md:flex-row gap-4 justify-between">

                <div className="relative flex-1">

                    <Search

                        size={20}

                        className="absolute left-4 top-3.5 text-slate-400"

                    />

                    <input

                        type="text"

                        placeholder="Rechercher une offre, une entreprise ou une localisation..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"

                    />

                </div>

                <button

                    onClick={onNewJob}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"

                >

                    + Nouvelle offre

                </button>

            </div>

        </div>

    );

}

export default JobSearch;