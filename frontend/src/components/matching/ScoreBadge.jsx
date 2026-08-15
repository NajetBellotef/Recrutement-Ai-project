function ScoreBadge({ score }) {

    let color = "bg-red-500";

    if (score >= 80) {
        color = "bg-green-600";
    } else if (score >= 60) {
        color = "bg-yellow-500";
    }

    return (

        <span
            className={`${color} text-white font-bold px-4 py-2 rounded-full`}
        >
            {score} %
        </span>

    );

}

export default ScoreBadge;