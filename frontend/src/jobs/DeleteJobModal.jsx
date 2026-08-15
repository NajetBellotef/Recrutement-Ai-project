import { TriangleAlert } from "lucide-react";

function DeleteJobModal({

    isOpen,

    onClose,

    onConfirm,

    job

}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[500px]">

                <div className="p-8">

                    <div className="flex justify-center mb-6">

                        <div className="bg-red-100 p-4 rounded-full">

                            <TriangleAlert
                                size={40}
                                className="text-red-600"
                            />

                        </div>

                    </div>

                    <h2 className="text-2xl font-bold text-center">

                        Supprimer cette offre ?

                    </h2>

                    <p className="text-slate-500 text-center mt-4">

                        Vous êtes sur le point de supprimer définitivement :

                    </p>

                    <div className="mt-5 bg-slate-100 rounded-xl p-4">

                        <h3 className="font-bold text-lg">

                            {job?.title}

                        </h3>

                        <p className="text-slate-600">

                            {job?.company}

                        </p>

                    </div>

                    <div className="flex justify-end gap-4 mt-8">

                        <button

                            onClick={onClose}

                            className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"

                        >

                            Annuler

                        </button>

                        <button

                            onClick={onConfirm}

                            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"

                        >

                            Supprimer

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteJobModal;