import { useState } from "react";
import {
    Lock,
    Eye,
    EyeOff,
    Save
} from "lucide-react";

function SecurityCard({ onChangePassword }) {

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    });

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        if (
            form.new_password !== form.confirm_password
        ) {

            alert("Les mots de passe ne correspondent pas.");

            return;

        }

        onChangePassword({

            current_password: form.current_password,

            new_password: form.new_password

        });

        setForm({

            current_password: "",

            new_password: "",

            confirm_password: ""

        });

    }

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-8">

                Sécurité

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Mot de passe actuel */}

                <div>

                    <label className="block text-sm font-medium text-slate-600 mb-2">

                        Mot de passe actuel

                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type={showCurrent ? "text" : "password"}
                            name="current_password"
                            value={form.current_password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-4 top-3 text-slate-500"
                        >
                            {
                                showCurrent
                                    ? <EyeOff size={20}/>
                                    : <Eye size={20}/>
                            }
                        </button>

                    </div>

                </div>

                {/* Nouveau mot de passe */}

                <div>

                    <label className="block text-sm font-medium text-slate-600 mb-2">

                        Nouveau mot de passe

                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type={showNew ? "text" : "password"}
                            name="new_password"
                            value={form.new_password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-3 text-slate-500"
                        >
                            {
                                showNew
                                    ? <EyeOff size={20}/>
                                    : <Eye size={20}/>
                            }
                        </button>

                    </div>

                </div>

                {/* Confirmation */}

                <div>

                    <label className="block text-sm font-medium text-slate-600 mb-2">

                        Confirmer le mot de passe

                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirm_password"
                            value={form.confirm_password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-3 text-slate-500"
                        >
                            {
                                showConfirm
                                    ? <EyeOff size={20}/>
                                    : <Eye size={20}/>
                            }
                        </button>

                    </div>

                </div>

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
                    >

                        <Save size={18}/>

                        Changer le mot de passe

                    </button>

                </div>

            </form>

        </div>

    );

}

export default SecurityCard;