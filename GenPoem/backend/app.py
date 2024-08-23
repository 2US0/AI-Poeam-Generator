from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import google.generativeai as genai
import os
from transformers import pipeline  

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

# Configure Gemini API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Initialize the emotion analyzer pipeline
emotion_analyzer = pipeline('text-classification', model='bhadresh-savani/distilbert-base-uncased-emotion')

def generate_poem(prompt, options):
    try:
        full_prompt = "Generate a poem on " + prompt 
        # Use Gemini to generate content
        model = genai.GenerativeModel('gemini-1.0-pro-latest')
        response = model.generate_content(full_prompt)
        return response.text  # Ensure the generated poem is a string
    except Exception as e:
        return f"Error generating poem: {str(e)}"


def analyze_emotions(poem):
    try:
        # Analyze emotions in the poem
        results = emotion_analyzer(poem)
        emotions = {result['label']: result['score'] for result in results}
        return emotions
    except Exception as e:
        return {'error': str(e)}

@app.route('/generate_poem', methods=['POST'])
def generate_poem_route():
    data = request.get_json()
    prompt = data.get('prompt')
    options = data.get('options', {})
    
    # Generate poem using Gemini
    generated_poem = generate_poem(prompt, options)
    
    # Analyze emotions
    analyzed_emotions = analyze_emotions(generated_poem)
    
    return jsonify({'poem': generated_poem, 'emotions': analyzed_emotions})

@socketio.on('generate_poem')
def handle_generate_poem(data):
    prompt = data.get('prompt')
    options = data.get('options', {})
    
    # Generate poem using Gemini
    generated_poem = generate_poem(prompt, options)
    
    # Analyze emotions
    analyzed_emotions = analyze_emotions(generated_poem)
    
    # Emit the poem and emotion analysis back to the frontend
    emit('poem_response', {'poem': generated_poem, 'emotions': analyzed_emotions})

if __name__ == '__main__':
    socketio.run(app)
