import {

    Briefcase,

    Building2,

    MapPin

} from "lucide-react";

function JobStats({ jobs }) {

    const companies = new Set(

        jobs.map(job => job.company)

    ).size;

    const locations = new Set(

        jobs.map(job => job.location)

    ).size;

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-slate-500">

                            Offres

                        </p>

                        <h2 className="text-3xl font-bold">

                            {jobs.length}

                        </h2>

                    </div>

                    <div className="bg-blue-100 p-4 rounded-xl">

                        <Briefcase

                            className="text-blue-600"

                        />

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-slate-500">

                            Entreprises

                        </p>

                        <h2 className="text-3xl font-bold">

                            {companies}

                        </h2>

                    </div>

                    <div className="bg-green-100 p-4 rounded-xl">

                        <Building2

                            className="text-green-600"

                        />

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-slate-500">

                            Localisations

                        </p>

                        <h2 className="text-3xl font-bold">

                            {locations}

                        </h2>

                    </div>

                    <div className="bg-purple-100 p-4 rounded-xl">

                        <MapPin

                            className="text-purple-600"

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobStats;