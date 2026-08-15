import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role  }) {

    // Récupérer le token
    const token = localStorage.getItem("token");

     // Récupérer le rôle
    const userRole = localStorage.getItem("role");


    // Pas de token -> retour à la page Login
    if (!token) {
        return <Navigate to="/" replace />;
    }
    // Mauvais rôle
    if (role && userRole !== role) {
        return <Navigate to="/" replace />;
    }
    // Token présent -> afficher la page demandée
    return children;
}

export default ProtectedRoute;