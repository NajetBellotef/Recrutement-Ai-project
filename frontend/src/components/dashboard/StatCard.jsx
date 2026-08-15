function StatCard({
    title,
    value,
    icon,
    color = "bg-blue-600"
}) {

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-slate-500 text-sm font-medium">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold text-slate-800 mt-3">

                        {value}

                    </h2>

                </div>

                <div className={`${color} w-20 h-20 rounded-2xl flex items-center justify-center text-white`}>

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default StatCard;