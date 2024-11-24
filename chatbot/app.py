from flask import Flask, request, jsonify
from chatbot import predict_class, get_response, connect_db, intents

app = Flask(__name__)

# Kết nối MongoDB
db = connect_db()

@app.route("/chatbot/init", methods=["GET"])
def chatbot_welcome():
    welcome_message = {
        "response": "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?"
    }
    return jsonify(welcome_message)

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    data = request.get_json()  # Get JSON data from the request
    message = data.get('message', '')  # Extract "message" from the JSON data
    if not message:
        return jsonify({"response": "No message provided"}), 400  # Return error if message is missing

    # Predict class and get response
    ints = predict_class(message)
    res = get_response(ints, intents, message, db)
    return jsonify({"response": res})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

