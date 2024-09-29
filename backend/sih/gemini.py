import google.generativeai as genai
import os
import PIL


def get_lang_full_form(lang):
    if lang == "en":
        return "English"
    elif lang == "hi":
        return "Hindi"
    elif lang == "bn":
        return "Bengali"
    elif lang == "gj":
        return "Gujarati"


def get_gemini_response(input, lang):
    lang = get_lang_full_form(lang)
    genai.configure(api_key=os.environ["GEMINI_API"])
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"You are an helpful ai chatbot expert in history and museums. If the question is related to history or museums, provide a concise and relevant answer. Do not provide any additional information for unrelated data. Kindly answer in {lang}:\n{input}"
    )
    return response.text


def get_gemini_response_file(input_file, lang):
    genai.configure(api_key=os.environ["GEMINI_API"])
    model = genai.GenerativeModel("gemini-1.5-flash")
    image = PIL.Image.open(input_file)
    lang = get_lang_full_form(lang)
    response = model.generate_content(
        [
            f"You are an helpful ai chatbot expert in history and museums. If the question is related to history or museums, provide a concise and relevant answer. Do not provide any additional information for unrelated data.Kindly answer in {lang}",
            image,
        ]
    )
    if len(response.candidates) > 0:
        return response.text
    else:
        return "The image did not met from privacy policy. Please try another image."
