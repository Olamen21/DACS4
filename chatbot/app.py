import logging
from flask import Flask, request, jsonify
from chatbot import predict_class, get_response, connect_db, intents

app = Flask(__name__)

# Kết nối MongoDB
db = connect_db()

logging.basicConfig(level=logging.INFO)

@app.route("/chatbot/init", methods=["GET"])
def chatbot_welcome():
    welcome_message = {
        "response": "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?"
    }
    return jsonify(welcome_message)

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    try:
        logging.info("Received chatbot request")
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"response": "No message provided"}), 400
        
        message = data['message'].strip()
        if not message:
            return jsonify({"response": "Message is empty"}), 400

        # Predict class and get response
        ints = predict_class(message)
        responses = get_response(ints, intents, message, db)
        return jsonify({"response": responses if isinstance(responses, list) else [responses]})
    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

