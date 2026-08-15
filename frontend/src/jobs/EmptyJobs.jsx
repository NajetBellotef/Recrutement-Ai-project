import { Briefcase } from "lucide-react";

function EmptyJobs() {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">

            <div className="flex justify-center">

                <div className="bg-slate-100 p-6 rounded-full">

                    <Briefcase

                        size={50}

                        className="text-slate-500"

                    />

                </div>

            </div>

            <h2 className="text-2xl font-bold mt-6">

                Aucune offre d'emploi

            </h2>

            <p className="text-slate-500 mt-3">

                Commencez par créer votre première offre de recrutement.

            </p>

        </div>

    );

}

export default EmptyJobs;