import random
import json
import pickle
import numpy as np
import re

import nltk
from nltk.stem import WordNetLemmatizer
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model

lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))
model = load_model('chatbotmodel.h5')

app = Flask(__name__)

def clean_up_sentence(sentence):
	sentence_words = nltk.word_tokenize(sentence)
	sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
	return sentence_words

def bag_of_words(sentence):
	sentence_words = clean_up_sentence(sentence)
	bag = [0] * len(words)
	for w in sentence_words:
		for i, word in enumerate(words):
			if word == w:
				bag[i] = 1
	return np.array(bag)

def predict_class(sentence):
	bow = bag_of_words(sentence)
	res = model.predict(np.array([bow]))[0]
	ERROR_THRESHOLD = 0.25
	results = [[i,r] for i,r in enumerate(res) if r > ERROR_THRESHOLD]
	results.sort(key=lambda x: x[1], reverse=True)

	return_list = []
	for r in results:
		return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})

	return return_list

def extract_location(message):
    # Định nghĩa các mẫu location hoặc tên thành phố
    locations = ["New York", "Los Angeles", "Paris", "Tokyo"]  # Thêm vào các địa điểm có thể khác
    for location in locations:
        if re.search(r'\b' + re.escape(location) + r'\b', message, re.IGNORECASE):
            return location
    return None

def get_response(intents_list, intents_json, message):
    tag = intents_list[0]['intent']
    location = extract_location(message)  # Trích xuất location từ tin nhắn
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            if location:
                result = random.choice(i['responses']).replace("{location}", location)
            else:
                result = random.choice(i['responses'])
            break
    return result

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    data = request.get_json()  # Get JSON data from the request
    message = data.get('message', '')  # Extract "message" from the JSON data
    if not message:
        return jsonify({"response": "No message provided"}), 400  # Return error if message is missing

    # Predict class and get response
    ints = predict_class(message)
    res = get_response(ints, intents, message)
    return jsonify({"response": res})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
