import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function CandidateLayout() {

    return (

        <div className="flex h-screen bg-slate-100 overflow-hidden">

            <Sidebar role="candidate" />

            <div className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 overflow-auto bg-slate-100 p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default CandidateLayout;