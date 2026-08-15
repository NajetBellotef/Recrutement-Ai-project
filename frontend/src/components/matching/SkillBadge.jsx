function SkillBadge({ skill, type = "success" }) {

    const colors = {

        success: "bg-blue-100 text-blue-700",

        danger: "bg-red-100 text-red-700"

    };

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${colors[type]}`}
        >

            {skill}

        </span>

    );

}

export default SkillBadge;