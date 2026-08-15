import { useEffect, useState } from "react";
import { getMyCV, uploadCV } from "../../services/cvService";

function CV() {

    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const loadCV = async () => {

        try {

            const data = await getMyCV();
            setCv(data);

        } catch (error) {

            console.error(error);
            setCv(null);

        } finally {

            setLoading(false);

        }

    };

   useEffect(() => {

    const fetchCV = async () => {
        await loadCV();
    };

    fetchCV();

}, []);
    const handleUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            setUploading(true);

            await uploadCV(file);

            await loadCV();

            alert("CV enregistré avec succès.");

        } catch (error) {

            console.error(error);
            alert("Erreur lors de l'upload.");

        } finally {

            setUploading(false);

        }

    };

    if (loading) {

        return (
            <div className="p-8 text-xl">
                Chargement...
            </div>
        );

    }

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-4xl font-bold">
                Mon CV
            </h1>

            {/* Input caché */}
            <input
                id="cv-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleUpload}
                className="hidden"
            />

            {/* Aucun CV */}
            {!cv && (

                <div className="bg-white rounded-xl shadow-md p-8 text-center">

                    <p className="text-xl text-gray-600 mb-6">
                        Aucun CV trouvé.
                    </p>

                    <button
                        onClick={() =>
                            document
                                .getElementById("cv-upload")
                                .click()
                        }
                        disabled={uploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        {uploading ? "Upload..." : "Téléverser un CV"}
                    </button>

                </div>

            )}

            {/* Affichage du CV */}
            {cv && (

                <>

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            📄 Informations
                        </h2>

                        <p>
                            <strong>Nom :</strong> {cv.filename}
                        </p>

                        <p>
                            <strong>Date :</strong>{" "}
                            {new Date(
                                cv.created_at
                            ).toLocaleString()}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            🛠 Compétences détectées
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {cv.skills.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            🤖 Analyse IA
                        </h2>

                        <div className="bg-gray-100 rounded-lg p-6 whitespace-pre-line leading-8">

                            {cv.analysis}

                        </div>

                    </div>

                    <div className="flex justify-end">

                        <button
                            onClick={() =>
                                document
                                    .getElementById("cv-upload")
                                    .click()
                            }
                            disabled={uploading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            {uploading
                                ? "Remplacement..."
                                : "Remplacer le CV"}
                        </button>

                    </div>

                </>

            )}

        </div>

    );

}

export default CV;