import { LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    }

    return (

        <header className="bg-white border-b border-slate-200 px-8 py-4">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Recruitment AI

                    </h2>

                    <p className="text-slate-500">

                        Intelligent Recruitment Platform

                    </p>

                </div>

                <div className="flex items-center gap-8">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">

                            <UserCircle
                                size={34}
                                className="text-slate-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Connecté en tant que

                            </p>

                            <p className="text-xl font-semibold capitalize text-slate-900">

                                {role}

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all duration-300"
                    >

                        <LogOut size={18} />

                        Déconnexion

                    </button>

                </div>

            </div>

        </header>

    );

}

export default Navbar;