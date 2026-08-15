import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    FileText,
    User,
    BriefcaseBusiness,
    Search,
    Trophy,
    ChartColumn
} from "lucide-react";

function Sidebar({ role }) {

    const candidateMenu = [
    {
        name: "Dashboard",
        path: "/candidate/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Mon CV",
        path: "/candidate/cv",
        icon: FileText
    },
    {
        name: "Matching",
        path: "/candidate/matching",
        icon: BriefcaseBusiness
    },
    {
        name: "Mon Profil",
        path: "/candidate/profile",
        icon: User
    }
];

    const recruiterMenu = [
    {
        name: "Dashboard",
        path: "/recruiter/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Offres",
        path: "/recruiter/jobs",
        icon: BriefcaseBusiness
    },
    {
        name: "Recherche",
        path: "/recruiter/search",
        icon: Search
    },
    {
        name: "Classement",
        path: "/recruiter/ranking",
        icon: Trophy
    },
    {
        name: "Rapports",
        path: "/recruiter/report",
        icon: ChartColumn
    }
];

    const menu =
        role === "candidate"
            ? candidateMenu
            : recruiterMenu;

    return (

    <aside className="w-72 bg-slate-950 text-white flex flex-col shadow-2xl">

        <div className="px-8 py-8 border-b border-slate-800">

            <h1 className="text-3xl font-bold tracking-wide">

                Recruitment AI

            </h1>

            <p className="text-slate-400 text-sm mt-2">

                Intelligent Recruitment Platform

            </p>

        </div>

        <nav className="flex-1 mt-6 px-3">

            {menu.map((item) => {

                const Icon = item.icon;

                return (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-5 py-3 mb-2 transition-all duration-200
                            ${
                                isActive
                                    ? "bg-blue-600 shadow-lg"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >

                        <Icon size={20} />

                        <span className="font-medium">

                            {item.name}

                        </span>

                    </NavLink>

                );

            })}

        </nav>

    </aside>

);

}

export default Sidebar;