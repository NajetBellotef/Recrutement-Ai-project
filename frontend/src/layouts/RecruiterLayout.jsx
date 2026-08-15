import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function RecruiterLayout() {

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar role="recruiter" />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="flex-1 p-8 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default RecruiterLayout;