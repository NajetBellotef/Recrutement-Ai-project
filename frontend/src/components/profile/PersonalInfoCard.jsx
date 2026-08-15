import { useState } from "react";
import {
    User,
    Phone,
    MapPin,
    Globe,
    Mail,
    Save
} from "lucide-react";

function PersonalInfoCard({ profile, onUpdate }) {

    const [form, setForm] = useState(() => ({
        full_name: profile?.full_name ?? "",
        phone: profile?.phone ?? "",
        city: profile?.city ?? "",
        country: profile?.country ?? ""
    }));

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onUpdate(form);

    };

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-8">
                Informations personnelles
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Nom */}

                <div>

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Nom complet
                    </label>

                    <div className="relative">

                        <User
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />

                    </div>

                </div>

                {/* Email */}

                <div>

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Email
                    </label>

                    <div className="relative">

                        <Mail
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type="email"
                            value={profile?.email ?? ""}
                            disabled
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-500"
                        />

                    </div>

                </div>

                {/* Téléphone */}

                <div>

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Téléphone
                    </label>

                    <div className="relative">

                        <Phone
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />

                    </div>

                </div>

                {/* Ville + Pays */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Ville
                        </label>

                        <div className="relative">

                            <MapPin
                                size={18}
                                className="absolute left-4 top-4 text-slate-400"
                            />

                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Pays
                        </label>

                        <div className="relative">

                            <Globe
                                size={18}
                                className="absolute left-4 top-4 text-slate-400"
                            />

                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />

                        </div>

                    </div>

                </div>

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
                    >

                        <Save size={18} />

                        Enregistrer

                    </button>

                </div>

            </form>

        </div>

    );

}

export default PersonalInfoCard;