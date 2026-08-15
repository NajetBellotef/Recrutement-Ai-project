import { useEffect, useState } from "react";

import {
    Award,
    FileText,
    BriefcaseBusiness,
    CheckCircle,
    UserRound
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();

                setDashboard(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadDashboard();

    }, []);

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-5xl font-bold text-slate-900">

                    Dashboard

                </h1>

                <p className="text-lg text-slate-500 mt-2">

                    Bienvenue sur votre espace candidat. Consultez vos statistiques et vos activités.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                    title="Score Matching"
                    value={`${dashboard?.matching_score ?? 0}%`}
                    icon={<Award size={34} />}
                    color="bg-blue-600"
                />

                <StatCard
                    title="CV"
                    value={dashboard?.cv_uploaded ? "Déposé" : "Aucun CV"}
                    icon={<FileText size={34} />}
                    color="bg-green-600"
                />

                <StatCard
                    title="Candidatures"
                    value={dashboard?.applications ?? 0}
                    icon={<BriefcaseBusiness size={34} />}
                    color="bg-orange-500"
                />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                    <h2 className="text-3xl font-bold text-slate-900 mb-6">

                        Activité récente

                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">

                            <CheckCircle
                                size={24}
                                className="text-green-600"
                            />

                            <span className="text-lg text-slate-700">

                                CV {dashboard?.cv_uploaded ? "déposé" : "non déposé"}

                            </span>

                        </div>

                        <div className="flex items-center gap-4">

                            <CheckCircle
                                size={24}
                                className="text-blue-600"
                            />

                            <span className="text-lg text-slate-700">

                                Matching disponible

                            </span>

                        </div>

                        <div className="flex items-center gap-4">

                            <CheckCircle
                                size={24}
                                className="text-orange-500"
                            />

                            <span className="text-lg text-slate-700">

                                {dashboard?.applications ?? 0} candidatures enregistrées

                            </span>

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                    <h2 className="text-3xl font-bold text-slate-900 mb-6">

                        Conseils

                    </h2>

                    <div className="space-y-5">

                        <div className="flex gap-4">

                            <UserRound
                                size={24}
                                className="text-blue-600 mt-1"
                            />

                            <p className="text-lg text-slate-700">

                                Complétez votre profil afin d'améliorer votre visibilité auprès des recruteurs.

                            </p>

                        </div>

                        <div className="flex gap-4">

                            <FileText
                                size={24}
                                className="text-green-600 mt-1"
                            />

                            <p className="text-lg text-slate-700">

                                Mettez régulièrement votre CV à jour afin d'obtenir des résultats de matching plus précis.

                            </p>

                        </div>

                        <div className="flex gap-4">

                            <Award
                                size={24}
                                className="text-orange-500 mt-1"
                            />

                            <p className="text-lg text-slate-700">

                                Consultez vos résultats de matching pour identifier les compétences à renforcer.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;