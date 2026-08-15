import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { login } from "../../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        console.log("Bouton cliqué");

        try {

            // Appel du backend
            const data = await login(email, password);

            console.log("Réponse login :", data);

            // Vérifier que le backend a bien renvoyé un token
            if (!data.access_token) {

                console.error("Token absent dans la réponse.");

                return;
            }

            // Sauvegarder le token
            localStorage.setItem(
                "token",
                data.access_token
            );

            // Sauvegarder le rôle
            localStorage.setItem(
                "role",
                data.role
            );

            console.log("Rôle connecté :", data.role);

            // ==========================
            // REDIRECTION SELON LE RÔLE
            // ==========================

            if (data.role === "admin") {

                navigate("/admin/dashboard");

            } else if (data.role === "candidate") {

                navigate("/candidate/dashboard");

            } else if (data.role === "recruiter") {

                navigate("/recruiter/dashboard");

            } else {

                console.error(
                    "Rôle inconnu :",
                    data.role
                );

            }

        } catch (error) {

            console.error(
                "Erreur de connexion :",
                error
            );

            alert(
                error.response?.data?.detail ||
                "Email ou mot de passe incorrect."
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">

                <h1 className="text-4xl font-bold text-blue-700 text-center mb-2">

                    Recruitment AI

                </h1>

                <p className="text-center text-gray-500 mb-8">

                    Connexion

                </p>

                <Input
                    label="Email"
                    type="email"
                    placeholder="Entrer votre email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="Entrer votre mot de passe"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <Button onClick={handleLogin}>

                    Se connecter

                </Button>

            </div>

        </div>
    );
}

export default Login;