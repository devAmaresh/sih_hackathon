import google.generativeai as genai
import os
import PIL


def get_gemini_response(input):
    genai.configure(api_key=os.environ["GEMINI_API"])
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"You are an helpful ai chatbot expert in history and museums. If the question is related to history or museums, provide a concise and relevant answer. Do not provide any additional information for unrelated data:\n{input}"
    )
    return response.text


def get_gemini_response_file(input_file):
    genai.configure(api_key=os.environ["GEMINI_API"])
    model = genai.GenerativeModel("gemini-1.5-flash")
    image = PIL.Image.open(input_file)
    response = model.generate_content(
        [
            "You are an helpful ai chatbot expert in history and museums. If the question is related to history or museums, provide a concise and relevant answer. Do not provide any additional information for unrelated data:",
            image,
        ]
    )
    if len(response.candidates) > 0:
        return response.text
    else:
        return "The image did not met from privacy policy. Please try another image."
