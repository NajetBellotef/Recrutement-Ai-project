import { UserCircle, Camera, Mail, Shield } from "lucide-react";

function ProfileCard({ profile, onUploadImage }) {

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

            <div className="flex flex-col items-center">

                {/* Photo */}

                {
                    profile?.profile_image ? (

                        <img
                            src={`http://localhost:8000/${profile.profile_image}`}
                            alt="Profil"
                            className="w-36 h-36 rounded-full object-cover border-4 border-blue-100"
                        />

                    ) : (

                        <div className="w-36 h-36 rounded-full bg-slate-100 flex items-center justify-center">

                            <UserCircle
                                size={90}
                                className="text-slate-500"
                            />

                        </div>

                    )
                }

                {/* Nom */}

                <h2 className="text-3xl font-bold text-slate-800 mt-6">

                    {profile?.full_name}

                </h2>

                {/* Rôle */}

                <div className="flex items-center gap-2 mt-3">

                    <Shield
                        size={18}
                        className="text-blue-600"
                    />

                    <span className="capitalize text-slate-600 font-medium">

                        {profile?.role}

                    </span>

                </div>

                {/* Email */}

                <div className="flex items-center gap-2 mt-3">

                    <Mail
                        size={18}
                        className="text-slate-500"
                    />

                    <span className="text-slate-500">

                        {profile?.email}

                    </span>

                </div>

                {/* Upload */}

                <label
                    htmlFor="profileImage"
                    className="mt-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition"
                >

                    <Camera size={18} />

                    Changer la photo

                </label>

                <input

                    id="profileImage"

                    type="file"

                    accept="image/*"

                    className="hidden"

                    onChange={onUploadImage}

                />

            </div>

        </div>

    );

}

export default ProfileCard;