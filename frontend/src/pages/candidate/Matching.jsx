import { useEffect, useState } from "react";

import MatchingCard from "../../components/matching/MatchingCard";
import MatchingModal from "../../components/matching/MatchingModal";

import { getCandidateMatches } from "../../services/matchingService";

function Matching() {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {

        async function loadMatches() {

            try {

                const data = await getCandidateMatches();

                setMatches(data);

            } catch (error) {

                console.error("Erreur :", error);

            } finally {

                setLoading(false);

            }

        }

        loadMatches();

    }, []);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-80">

                <div className="text-lg text-slate-600">

                    Chargement des matchings...

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-4xl font-bold text-slate-900">

                    Mes Matchings

                </h1>

                <p className="text-slate-500 mt-2">

                    Découvrez les offres correspondant à votre profil grâce à
                    notre moteur de matching intelligent.

                </p>

            </div>

            {

                matches.length === 0 ?

                (

                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

                        <h2 className="text-2xl font-semibold text-slate-700">

                            Aucun matching disponible

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Déposez votre CV afin de lancer une nouvelle analyse.

                        </p>

                    </div>

                )

                :

                (

                    <div className="space-y-6">

                        {

                            matches.map((match) => (

                                <MatchingCard

                                    key={match.match_id}

                                    match={match}

                                    onDetails={setSelectedMatch}

                                />

                            ))

                        }

                    </div>

                )

            }

            <MatchingModal

                match={selectedMatch}

                onClose={() => setSelectedMatch(null)}

            />

        </div>

    );

}

export default Matching;