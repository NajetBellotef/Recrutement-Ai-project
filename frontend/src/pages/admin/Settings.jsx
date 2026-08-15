import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

function Settings() {
    // =========================================================
    // ÉTATS
    // =========================================================

    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
    });

    const [password, setPassword] = useState({
        current_password: "",
        new_password: "",
    });

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const [profileMessage, setProfileMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [errorProfile, setErrorProfile] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [notifications, setNotifications] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    // =========================================================
    // TOKEN
    // =========================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };

    // =========================================================
    // CHARGER LE PROFIL ADMIN
    // =========================================================

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            try {
                const token = getToken();

                if (!token) {
                    setErrorProfile("Vous devez être connecté.");
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (cancelled) return;

                setProfile({
                    full_name: response.data.full_name || "",
                    email: response.data.email || "",
                });

            } catch (error) {
                if (cancelled) return;

                console.error(
                    "Erreur chargement profil :",
                    error
                );

                setErrorProfile(
                    error.response?.data?.detail ||
                    "Impossible de charger le profil."
                );
            }
        };

        loadProfile();

        return () => {
            cancelled = true;
        };
    }, []);

    // =========================================================
    // MODIFICATION PROFIL
    // =========================================================

    const handleProfileChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        setLoadingProfile(true);
        setProfileMessage("");
        setErrorProfile("");

        try {
            const token = getToken();

            if (!token) {
                setErrorProfile("Vous devez être connecté.");
                return;
            }

            const response = await axios.put(
                `${API_URL}/admin/settings/profile`,
                {
                    full_name: profile.full_name,
                    email: profile.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setProfileMessage(
                response.data.message ||
                "Profil modifié avec succès."
            );

            // Mettre à jour les données affichées
            if (response.data.user) {
                setProfile({
                    full_name: response.data.user.full_name,
                    email: response.data.user.email,
                });
            }

        } catch (error) {
            console.error(
                "Erreur modification profil :",
                error
            );

            setErrorProfile(
                error.response?.data?.detail ||
                "Erreur lors de la modification du profil."
            );

        } finally {
            setLoadingProfile(false);
        }
    };

    // =========================================================
    // MODIFICATION MOT DE PASSE
    // =========================================================

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        setLoadingPassword(true);
        setPasswordMessage("");
        setErrorPassword("");

        try {
            const token = getToken();

            if (!token) {
                setErrorPassword("Vous devez être connecté.");
                return;
            }

            const response = await axios.put(
                `${API_URL}/admin/settings/password`,
                {
                    current_password: password.current_password,
                    new_password: password.new_password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setPasswordMessage(
                response.data.message ||
                "Mot de passe modifié avec succès."
            );

            // Vider les champs après succès
            setPassword({
                current_password: "",
                new_password: "",
            });

        } catch (error) {
            console.error(
                "Erreur modification mot de passe :",
                error
            );

            setErrorPassword(
                error.response?.data?.detail ||
                "Erreur lors de la modification du mot de passe."
            );

        } finally {
            setLoadingPassword(false);
        }
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f4f7fb",
                padding: "40px",
            }}
        >

            {/* ================================================= */}
            {/* TITRE */}
            {/* ================================================= */}

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto 30px",
                }}
            >
                <h1
                    style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#0b1f3a",
                        marginBottom: "8px",
                    }}
                >
                    Paramètres
                </h1>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#6380a5",
                    }}
                >
                    Gérez votre profil administrateur et vos préférences.
                </p>
            </div>

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}
            >

                {/* ================================================= */}
                {/* PROFIL ADMIN */}
                {/* ================================================= */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "22px",
                        padding: "35px",
                        marginBottom: "30px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                >
                    <h2
                        style={{
                            color: "#0b1f3a",
                            marginBottom: "8px",
                        }}
                    >
                        Profil administrateur
                    </h2>

                    <p
                        style={{
                            color: "#6380a5",
                            marginBottom: "25px",
                        }}
                    >
                        Modifiez vos informations personnelles.
                    </p>

                    <form onSubmit={handleProfileSubmit}>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "1fr 1fr",
                                gap: "25px",
                            }}
                        >

                            <div>
                                <label>
                                    Nom complet
                                </label>

                                <input
                                    type="text"
                                    name="full_name"
                                    value={profile.full_name}
                                    onChange={handleProfileChange}
                                    placeholder="Nom complet"
                                    required
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    placeholder="admin@example.com"
                                    required
                                    style={inputStyle}
                                />
                            </div>

                        </div>

                        {errorProfile && (
                            <div style={errorStyle}>
                                {errorProfile}
                            </div>
                        )}

                        {profileMessage && (
                            <div style={successStyle}>
                                {profileMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loadingProfile}
                            style={buttonStyle}
                        >
                            {loadingProfile
                                ? "Modification..."
                                : "Enregistrer les modifications"}
                        </button>

                    </form>
                </div>

                {/* ================================================= */}
                {/* MOT DE PASSE */}
                {/* ================================================= */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "22px",
                        padding: "35px",
                        marginBottom: "30px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                >

                    <h2
                        style={{
                            color: "#0b1f3a",
                            marginBottom: "8px",
                        }}
                    >
                        Sécurité
                    </h2>

                    <p
                        style={{
                            color: "#6380a5",
                            marginBottom: "25px",
                        }}
                    >
                        Modifiez votre mot de passe administrateur.
                    </p>

                    <form onSubmit={handlePasswordSubmit}>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "1fr 1fr",
                                gap: "25px",
                            }}
                        >

                            <div>
                                <label>
                                    Mot de passe actuel
                                </label>

                                <input
                                    type="password"
                                    name="current_password"
                                    value={
                                        password.current_password
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    placeholder="Mot de passe actuel"
                                    required
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label>
                                    Nouveau mot de passe
                                </label>

                                <input
                                    type="password"
                                    name="new_password"
                                    value={
                                        password.new_password
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    placeholder="Nouveau mot de passe"
                                    minLength={8}
                                    required
                                    style={inputStyle}
                                />
                            </div>

                        </div>

                        {errorPassword && (
                            <div style={errorStyle}>
                                {errorPassword}
                            </div>
                        )}

                        {passwordMessage && (
                            <div style={successStyle}>
                                {passwordMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loadingPassword}
                            style={buttonStyle}
                        >
                            {loadingPassword
                                ? "Modification..."
                                : "Modifier le mot de passe"}
                        </button>

                    </form>
                </div>

                {/* ================================================= */}
                {/* NOTIFICATIONS */}
                {/* ================================================= */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "22px",
                        padding: "35px",
                        marginBottom: "30px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                >

                    <h2
                        style={{
                            color: "#0b1f3a",
                        }}
                    >
                        🔔 Notifications
                    </h2>

                    <p
                        style={{
                            color: "#6380a5",
                            marginBottom: "25px",
                        }}
                    >
                        Configurez vos préférences de notification.
                    </p>

                    <SettingRow
                        title="Notifications système"
                        description="Recevoir les notifications importantes de la plateforme."
                        checked={notifications}
                        onChange={() =>
                            setNotifications(!notifications)
                        }
                    />

                    <SettingRow
                        title="Notifications par email"
                        description="Recevoir les informations importantes par email."
                        checked={emailNotifications}
                        onChange={() =>
                            setEmailNotifications(
                                !emailNotifications
                            )
                        }
                    />

                </div>

                {/* ================================================= */}
                {/* APPARENCE */}
                {/* ================================================= */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "22px",
                        padding: "35px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                >

                    <h2
                        style={{
                            color: "#0b1f3a",
                        }}
                    >
                        🎨 Apparence
                    </h2>

                    <p
                        style={{
                            color: "#6380a5",
                            marginBottom: "25px",
                        }}
                    >
                        Interface actuelle de Recruitment AI.
                    </p>

                    <div
                        style={{
                            padding: "20px",
                            background: "#f6f9fd",
                            borderRadius: "15px",
                            color: "#0b1f3a",
                            fontSize: "18px",
                        }}
                    >
                        ✓ Thème clair activé
                    </div>

                </div>

            </div>
        </div>
    );
}

// =============================================================
// COMPOSANT SWITCH
// =============================================================

function SettingRow({
    title,
    description,
    checked,
    onChange,
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 0",
                borderTop: "1px solid #e5ebf3",
            }}
        >

            <div>
                <h3
                    style={{
                        margin: "0 0 8px",
                        color: "#0b1f3a",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        margin: 0,
                        color: "#6380a5",
                    }}
                >
                    {description}
                </p>
            </div>

            <button
                type="button"
                onClick={onChange}
                style={{
                    width: "70px",
                    height: "38px",
                    border: "none",
                    borderRadius: "25px",
                    background: checked
                        ? "#2166ff"
                        : "#cbd5e1",
                    cursor: "pointer",
                    position: "relative",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        top: "4px",
                        left: checked
                            ? "36px"
                            : "4px",
                        width: "30px",
                        height: "30px",
                        background: "white",
                        borderRadius: "50%",
                        transition: "0.2s",
                    }}
                />
            </button>

        </div>
    );
}

// =============================================================
// STYLES
// =============================================================

const inputStyle = {
    width: "100%",
    padding: "16px",
    marginTop: "8px",
    border: "1px solid #cbd8e8",
    borderRadius: "12px",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
};

const buttonStyle = {
    marginTop: "25px",
    padding: "15px 25px",
    border: "none",
    borderRadius: "12px",
    background: "#2166ff",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
};

const successStyle = {
    marginTop: "20px",
    padding: "12px 15px",
    background: "#dcfce7",
    color: "#15803d",
    borderRadius: "10px",
};

const errorStyle = {
    marginTop: "20px",
    padding: "12px 15px",
    background: "#fee2e2",
    color: "#dc2626",
    borderRadius: "10px",
};

export default Settings;