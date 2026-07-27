from datetime import datetime

from reportlab.lib.pagesizes import A4

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable
)

from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle
)

from reportlab.lib.enums import (
    TA_CENTER,
    TA_LEFT
)

from reportlab.lib.colors import (
    HexColor,
    white,
    black
)

from reportlab.lib.units import cm
from reportlab.lib import colors


# =====================================================
# COLORS
# =====================================================

PRIMARY = HexColor("#0F4C81")
SECONDARY = HexColor("#1F618D")
LIGHT_BLUE = HexColor("#D6EAF8")
LIGHT_GREY = HexColor("#F4F6F7")
GREEN = HexColor("#27AE60")
ORANGE = HexColor("#F39C12")
RED = HexColor("#C0392B")
GREY = HexColor("#808B96")


# =====================================================
# STYLES
# =====================================================

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "TitleStyle",
    parent=styles["Title"],
    alignment=TA_CENTER,
    fontSize=26,
    textColor=PRIMARY,
    spaceAfter=12,
)

subtitle_style = ParagraphStyle(
    "SubtitleStyle",
    parent=styles["Heading2"],
    alignment=TA_CENTER,
    fontSize=14,
    textColor=GREY,
    spaceAfter=18,
)

section_style = ParagraphStyle(
    "SectionStyle",
    parent=styles["Heading2"],
    fontSize=15,
    textColor=PRIMARY,
    spaceBefore=15,
    spaceAfter=10,
)

normal_style = ParagraphStyle(
    "NormalStyle",
    parent=styles["BodyText"],
    fontSize=11,
    leading=18,
)

small_style = ParagraphStyle(
    "SmallStyle",
    parent=styles["BodyText"],
    fontSize=9,
    leading=14,
    textColor=GREY,
)

score_style = ParagraphStyle(
    "ScoreStyle",
    parent=styles["Title"],
    alignment=TA_CENTER,
    fontSize=34,
    textColor=GREEN,
)

footer_style = ParagraphStyle(
    "FooterStyle",
    parent=styles["BodyText"],
    alignment=TA_CENTER,
    fontSize=9,
    textColor=GREY,
)


# =====================================================
# HORIZONTAL LINE
# =====================================================

def separator():

    return HRFlowable(
        width="100%",
        thickness=1,
        color=LIGHT_BLUE,
        spaceBefore=8,
        spaceAfter=8
    )


# =====================================================
# HEADER
# =====================================================

def build_header(elements):

    header = Table(
        [["JOBMATCH AI"]],
        colWidths=[17 * cm]
    )

    header.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, -1), PRIMARY),

        ("TEXTCOLOR", (0, 0), (-1, -1), white),

        ("ALIGN", (0, 0), (-1, -1), "CENTER"),

        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),

        ("FONTSIZE", (0, 0), (-1, -1), 24),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),

        ("TOPPADDING", (0, 0), (-1, -1), 16),

    ]))

    elements.append(header)

    elements.append(Spacer(1, 18))

    elements.append(

        Paragraph(

            "Intelligent Recruitment Platform",

            subtitle_style

        )

    )

    elements.append(separator())


# =====================================================
# TITLE
# =====================================================

def build_title(elements):

    elements.append(

        Paragraph(

            "MATCHING REPORT",

            title_style

        )

    )

    elements.append(

        Paragraph(

            datetime.now().strftime(
                "%d/%m/%Y %H:%M"
            ),

            small_style

        )

    )

    elements.append(Spacer(1, 20))


# =====================================================
# SCORE COLOR
# =====================================================

def score_color(score):

    if score >= 80:
        return GREEN

    if score >= 60:
        return ORANGE

    return RED


# =====================================================
# SCORE BADGE
# =====================================================

def build_score(elements, score):

    color = score_color(score)

    badge = Table(

        [[
            Paragraph(

                f"<font color='{color}'><b>{score:.2f}%</b></font>",

                score_style

            )
        ]],

        colWidths=[7 * cm]

    )

    badge.setStyle(TableStyle([

        ("BOX", (0, 0), (-1, -1), 2, color),

        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREY),

        ("ALIGN", (0, 0), (-1, -1), "CENTER"),

        ("TOPPADDING", (0, 0), (-1, -1), 20),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 20),

    ]))

    elements.append(badge)

    elements.append(Spacer(1, 18))


# =====================================================
# FOOTER
# =====================================================

def build_footer(elements):

    elements.append(Spacer(1, 8))

    elements.append(

        Paragraph(

            "Generated automatically by JobMatch AI",

            footer_style

        )

    )

    elements.append(

        Paragraph(

            "© 2026 - Intelligent Recruitment Platform",

            footer_style

        )

    )

# =====================================================
# INFORMATION CARD
# =====================================================

def build_information_card(
    elements,
    candidate,
    job,
    company
):

    data = [

        [
            Paragraph("<b>👤 Candidate</b>", normal_style),
            Paragraph(candidate, normal_style)
        ],

        [
            Paragraph("<b>💼 Position</b>", normal_style),
            Paragraph(job, normal_style)
        ],

        [
            Paragraph("<b>🏢 Company</b>", normal_style),
            Paragraph(company, normal_style)
        ],

        [
            Paragraph("<b>📅 Date</b>", normal_style),
            Paragraph(
                datetime.now().strftime("%d/%m/%Y"),
                normal_style
            )
        ]

    ]

    table = Table(
        data,
        colWidths=[5 * cm, 11 * cm]
    )

    table.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (0, -1), LIGHT_BLUE),

        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),

        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),

        ("TOPPADDING", (0, 0), (-1, -1), 10),

        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),

    ]))

    elements.append(table)

    elements.append(Spacer(1, 20))


# =====================================================
# PROGRESS BAR
# =====================================================

def build_progress_bar(
    elements,
    score
):

    width = 14 * cm

    progress = (score / 100) * width

    color = score_color(score)

    bar = Table(
        [[""]],
        colWidths=[progress]
    )

    bar.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, -1), color),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),

        ("TOPPADDING", (0, 0), (-1, -1), 6),

    ]))

    background = Table(
        [[bar]],
        colWidths=[width]
    )

    background.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREY),

        ("BOX", (0, 0), (-1, -1), 0.5, colors.grey),

    ]))

    elements.append(background)

    elements.append(Spacer(1, 20))


# =====================================================
# SCORE TABLE
# =====================================================

def build_scores_table(
    elements,
    final_score,
    embedding_score,
    skills_score
):

    elements.append(
        Paragraph(
            "Evaluation",
            section_style
        )
    )

    data = [

        [
            "<b>Criterion</b>",
            "<b>Score</b>"
        ],

        [
            "Embedding Similarity",
            f"{embedding_score:.2f}%"
        ],

        [
            "Skills Similarity",
            f"{skills_score:.2f}%"
        ],

        [
            "Final Matching Score",
            f"{final_score:.2f}%"
        ]

    ]

    table = Table(
        data,
        colWidths=[11 * cm, 5 * cm]
    )

    table.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),

        ("TEXTCOLOR", (0, 0), (-1, 0), white),

        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),

        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_GREY),

        ("ALIGN", (1, 1), (-1, -1), "CENTER"),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),

        ("TOPPADDING", (0, 0), (-1, -1), 10),

    ]))

    elements.append(table)

    elements.append(Spacer(1, 20))


# =====================================================
# SKILLS
# =====================================================

def build_skills(
    elements,
    common_skills,
    missing_skills
):

    elements.append(
        Paragraph(
            "Skills Analysis",
            section_style
        )
    )

    common = "<br/>".join(
        [f"✔ {s}" for s in common_skills]
    )

    missing = "<br/>".join(
        [f"✖ {s}" for s in missing_skills]
    )

    if not common:
        common = "No common skills"

    if not missing:
        missing = "None"

    data = [

        [

            Paragraph(
                "<b>Common Skills</b><br/><br/>" + common,
                normal_style
            ),

            Paragraph(
                "<b>Missing Skills</b><br/><br/>" + missing,
                normal_style
            )

        ]

    ]

    table = Table(
        data,
        colWidths=[8 * cm, 8 * cm]
    )

    table.setStyle(TableStyle([

        ("BOX", (0, 0), (-1, -1), 0.5, colors.grey),

        ("BACKGROUND", (0, 0), (0, 0), HexColor("#EAFAF1")),

        ("BACKGROUND", (1, 0), (1, 0), HexColor("#FDEDEC")),

        ("LEFTPADDING", (0, 0), (-1, -1), 12),

        ("RIGHTPADDING", (0, 0), (-1, -1), 12),

        ("TOPPADDING", (0, 0), (-1, -1), 12),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),

        ("VALIGN", (0, 0), (-1, -1), "TOP"),

    ]))

    elements.append(table)

    elements.append(Spacer(1, 20))
# =====================================================
# AI ANALYSIS
# =====================================================

def build_ai_analysis(
    elements,
    comment
):

    elements.append(
        Paragraph(
            "Artificial Intelligence Analysis",
            section_style
        )
    )

    if not comment or comment.strip() == "":
        comment = "No AI analysis available."

    analysis = Table(
        [
            [
                Paragraph(
                    comment.replace("\n", "<br/>"),
                    normal_style
                )
            ]
        ],
        colWidths=[16 * cm]
    )

    analysis.setStyle(
        TableStyle([

            ("BACKGROUND", (0, 0), (-1, -1), HexColor("#F8F9F9")),

            ("BOX", (0, 0), (-1, -1), 1, HexColor("#D5D8DC")),

            ("LEFTPADDING", (0, 0), (-1, -1), 15),

            ("RIGHTPADDING", (0, 0), (-1, -1), 15),

            ("TOPPADDING", (0, 0), (-1, -1), 15),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 15),

            ("VALIGN", (0, 0), (-1, -1), "TOP"),

        ])
    )

    elements.append(analysis)

    elements.append(Spacer(1, 20))


# =====================================================
# DECISION
# =====================================================

def get_decision(score):

    if score >= 80:
        return (
            "✔ Excellent Match",
            GREEN
        )

    elif score >= 65:
        return (
            "✔ Strong Match",
            GREEN
        )

    elif score >= 50:
        return (
            "🟡 Fair Match",
            ORANGE
        )

    elif score >= 35:
        return (
            "🟠 Limited Match",
            ORANGE
        )

    else:
        return (
            "✖ Poor Match",
            RED
        )
# =====================================================
# HR RECOMMENDATION
# =====================================================

def build_recommendation(
    elements,
    score
):

    elements.append(
        Paragraph(
            "HR Recommendation",
            section_style
        )
    )

    decision, color = get_decision(score)

    if score >= 80:

     recommendation = """
The candidate demonstrates an excellent alignment with the position.

It is highly recommended to proceed directly to a technical interview.
"""

    elif score >= 65:

     recommendation = """
The candidate satisfies most of the required competencies.

A technical interview is recommended.
"""

    elif score >= 50:

     recommendation = """
The candidate meets several important requirements.

An interview can be considered to further evaluate technical skills.
"""

    elif score >= 35:

     recommendation = """
The candidate partially matches the job requirements.

Additional evaluation is recommended before making a recruitment decision.
"""

    else:

     recommendation = """
The candidate currently does not satisfy the essential requirements.

Additional training or experience is recommended before reconsideration.
"""

    card = Table(
        [[

            Paragraph(
                f"""
                <font color="{color}">
                <b>{decision}</b>
                </font>

                <br/><br/>

                {recommendation}
                """,
                normal_style
            )

        ]],
        colWidths=[16 * cm]
    )

    card.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREY),

        ("BOX", (0, 0), (-1, -1), 2, color),

        ("LEFTPADDING", (0, 0), (-1, -1), 15),

        ("RIGHTPADDING", (0, 0), (-1, -1), 15),

        ("TOPPADDING", (0, 0), (-1, -1), 15),

        ("BOTTOMPADDING", (0, 0), (-1, -1), 15),

    ]))

    elements.append(card)

    elements.append(Spacer(1, 20))
# =====================================================
# MAIN FUNCTION
# =====================================================

def generate_matching_report(
    filename,
    candidate,
    job,
    company,
    final_score,
    embedding_score,
    skills_score,
    common_skills,
    missing_skills,
    ai_analysis
):
    if final_score >= 80:
       verdict = "🟢 EXCELLENT MATCH"
    elif final_score >= 60:
       verdict = "🟡 GOOD MATCH"
    elif final_score >= 40:
       verdict = "🟠 FAIR MATCH"
    else:
       verdict = "🔴 WEAK MATCH"
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5 * cm,
        leftMargin=1.5 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.5 * cm
    )

    elements = []

    # ==============================================
    # HEADER
    # ==============================================

    build_header(elements)

    # ==============================================
    # TITLE
    # ==============================================

    build_title(elements)

    # ==============================================
    # SCORE
    # ==============================================

    build_score(
        elements,
        final_score
    )

    build_progress_bar(
        elements,
        final_score
    )

    # ==============================================
    # INFORMATIONS
    # ==============================================

    build_information_card(
        elements,
        candidate,
        job,
        company
    )
    elements.append(
    Paragraph(
        f"<b>{verdict}</b>",
        subtitle_style
    )
    )
    elements.append(
    Paragraph(
        f"""
Candidate matches <b>{final_score:.2f}%</b> of the job requirements.
Embedding similarity is <b>{embedding_score:.2f}%</b>.
Skills similarity is <b>{skills_score:.2f}%</b>.
""",
        normal_style
    )
)
    
    build_scores_table(
    elements,
    final_score,
    embedding_score,
    skills_score
)

    build_skills(
    elements,
    common_skills,
    missing_skills
)

    build_ai_analysis(
    elements,
    ai_analysis
)

    build_recommendation(
    elements,
    final_score
)

    build_footer(elements)

    doc.build(elements)

    return filename