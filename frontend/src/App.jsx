import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
// ==========================
// AUTH
// ==========================

import Login from "./pages/auth/Login";

// ==========================
// CANDIDATE
// ==========================

import CandidateDashboard from "./pages/candidate/Dashboard";
import CV from "./pages/candidate/CV";
import Matching from "./pages/candidate/Matching";
import Profile from "./pages/candidate/Profile";

// ==========================
// RECRUITER
// ==========================

import RecruiterDashboard from "./pages/recruiter/Dashboard";
import Jobs from "./pages/recruiter/Jobs";
import Ranking from "./pages/recruiter/Ranking";
import Search from "./pages/recruiter/Search";
import Report from "./pages/recruiter/Report";

// ==========================
// ADMIN
// ==========================

import AdminDashboard from "./pages/admin/Dashboard";
import Recruiters from "./pages/admin/Recruiters";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";

// ==========================
// LAYOUTS
// ==========================

import CandidateLayout from "./layouts/CandidateLayout";
import RecruiterLayout from "./layouts/RecruiterLayout";

// ==========================
// PROTECTED ROUTE
// ==========================

import ProtectedRoute from "./components/ProtectedRoute";

import CandidateProfile from "./pages/recruiter/CandidateProfile";
function App() {

    return (

        <BrowserRouter>

            <Routes>

    {/* ==========================
        ACCUEIL
    ========================== */}

    <Route
        path="/"
        element={<Home />}
    />


    {/* ==========================
        LOGIN
    ========================== */}

    <Route
        path="/login"
        element={<Login />}
    />
    {/* ==========================
        Registre
    ========================== */}
    <Route
    path="/register"
    element={<Register />}
/>


                {/* ==========================
                    ADMIN
                ========================== */}

                <Route
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                </Route>


                <Route
                    path="/admin/recruiters"
                    element={
                        <ProtectedRoute role="admin">
                            <Recruiters />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute role="admin">
                            <Users />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute role="admin">
                            <Settings />
                        </ProtectedRoute>
                    }
                />


                {/* ==========================
                    CANDIDATE
                ========================== */}

                <Route
                    element={
                        <ProtectedRoute role="candidate">
                            <CandidateLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/candidate/dashboard"
                        element={<CandidateDashboard />}
                    />

                    <Route
                        path="/candidate/cv"
                        element={<CV />}
                    />

                    <Route
                        path="/candidate/matching"
                        element={<Matching />}
                    />

                    <Route
                        path="/candidate/profile"
                        element={<Profile />}
                    />

                </Route>


                {/* ==========================
                    RECRUITER
                ========================== */}

                <Route
                    element={
                        <ProtectedRoute role="recruiter">
                            <RecruiterLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/recruiter/dashboard"
                        element={<RecruiterDashboard />}
                    />

                    <Route
                        path="/recruiter/jobs"
                        element={<Jobs />}
                    />

                    <Route
                        path="/recruiter/search"
                        element={<Search />}
                    />

                    <Route
                        path="/recruiter/ranking"
                        element={<Ranking />}
                    />

                    <Route
                        path="/recruiter/report"
                        element={<Report />}
                    />
                    <Route
                         path="/recruiter/candidate/:userId"
                          element={<CandidateProfile />}
/>
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;