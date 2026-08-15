import { useEffect, useMemo, useState } from "react";

import {
    getJobs,
    createJob,
    updateJob,
    deleteJob
} from "../../services/jobService";
import JobDetailsModal from "../../jobs/JobDetailsModal";
import JobCard from "../../jobs/JobCard";
import JobFormModal from "../../jobs/JobFormModal";
import DeleteJobModal from "../../jobs/DeleteJobModal";
import JobSearch from "../../jobs/JobSearch";
import JobStats from "../../jobs/JobStats";
import EmptyJobs from "../../jobs/EmptyJobs";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingJob, setEditingJob] = useState(null);

    const [showDelete, setShowDelete] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [selectedDetails, setSelectedDetails] = useState(null);

    useEffect(() => {

        loadJobs();

    }, []);

    async function loadJobs() {

        try {

            const data = await getJobs();

            setJobs(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleSave(form) {

        try {

            if (editingJob) {

                await updateJob(

                    editingJob.id,

                    form

                );

            }

            else {

                await createJob(form);

            }

            await loadJobs();

            setShowForm(false);

            setEditingJob(null);

        }

        catch (error) {

            console.error(error);

            alert("Erreur.");

        }

    }

    function handleEdit(job) {

        setEditingJob(job);

        setShowForm(true);

    }

    function handleNewJob() {

        setEditingJob(null);

        setShowForm(true);

    }

    function handleDelete(job) {

        setSelectedJob(job);

        setShowDelete(true);

    }

    async function confirmDelete() {

        try {

            await deleteJob(

                selectedJob.id

            );

            await loadJobs();

            setShowDelete(false);

            setSelectedJob(null);

        }

        catch (error) {

            console.error(error);

        }

    }
function handleView(job) {

    setSelectedDetails(job);

    setShowDetails(true);

}

    const filteredJobs = useMemo(() => {

        return jobs.filter(job =>

            job.title

                .toLowerCase()

                .includes(search.toLowerCase())

            ||

            job.company

                .toLowerCase()

                .includes(search.toLowerCase())

            ||

            job.location

                .toLowerCase()

                .includes(search.toLowerCase())

        );

    }, [jobs, search]);

    if (loading) {

        return (

            <div className="text-center text-xl">

                Chargement...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-slate-800">

                    Gestion des Offres

                </h1>

                <p className="text-slate-500 mt-2">

                    Créez, modifiez et gérez vos offres de recrutement.

                </p>

            </div>

            <JobStats jobs={jobs} />

            <JobSearch

                search={search}

                setSearch={setSearch}

                onNewJob={handleNewJob}

            />

            {

                filteredJobs.length === 0

                    ?

                    <EmptyJobs />

                    :

                    <div className="grid lg:grid-cols-2 gap-6">

                        {

                            filteredJobs.map(job => (

                                <JobCard

                                    key={job.id}

                                    job={job}

                                    onEdit={handleEdit}

                                    onDelete={handleDelete}

                                    onView={handleView}

                                />

                            ))

                        }

                    </div>

            }

            <JobFormModal

                isOpen={showForm}

                onClose={() => {

                    setShowForm(false);

                    setEditingJob(null);

                }}

                onSubmit={handleSave}

                editingJob={editingJob}

            />

            <DeleteJobModal

                isOpen={showDelete}

                onClose={() => setShowDelete(false)}

                onConfirm={confirmDelete}

                job={selectedJob}

            />
            <JobDetailsModal

               isOpen={showDetails}

               onClose={() => setShowDetails(false)}

               job={selectedDetails}
            />
        </div>

    );

}

export default Jobs;