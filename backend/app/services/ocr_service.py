import easyocr

reader = easyocr.Reader(
    ['fr', 'en'],
    gpu=False
)


def extract_text_from_image(image_path: str) -> str:
    """
    Extrait le texte d'une image (JPG, PNG...)
    """

    result = reader.readtext(image_path)

    text = "\n".join(
        [item[1] for item in result]
    )

    return text