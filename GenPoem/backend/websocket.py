from flask_socketio import SocketIO
from emotion_analysis import analyze_emotions
from app import generate_poem
socketio = SocketIO()

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('generate_poem')
def handle_generate_poem(data):
    prompt = data.get('prompt')
    options = data.get('options', {})
    
    generated_poem = generate_poem(prompt, options)
    analyzed_emotions = analyze_emotions(generated_poem)
    
    socketio.emit('poem_response', {'poem': generated_poem, 'emotions': analyzed_emotions})
