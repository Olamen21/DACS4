import random
import json
import pickle
import numpy as np
import re
import os
from nltk.stem import WordNetLemmatizer
from pyvi import ViTokenizer
from pymongo import MongoClient
from dotenv import load_dotenv
from tensorflow.keras.models import load_model

# Khởi tạo
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json', encoding='utf-8').read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbotmodel.h5')
load_dotenv("python.env")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_URI = f"mongodb+srv://BookingHotel:{os.environ['MONGO_PASSWORD']}@bookinghotel.dsvue.mongodb.net/"

# Kết nối MongoDB
def connect_db():
    try:
        client = MongoClient(MONGO_URI)
        db = client["DACS4"]
        return db
    except Exception as e:
        print("Kết nối thất bại:", e)
        return None

def clean_up_sentence(sentence):
    sentence_words = ViTokenizer.tokenize(sentence).split()
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
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)

    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})

    return return_list

def extract_city_name(message, db):
    city_collection = db['cities']
    names = []

    for city in city_collection.find():
        if 'name' in city:
            names.append(city['name'])

    for name in names:
        if name.lower() in message.lower():
            return name
    return None

def extract_hotel_name(message, db):
    hotels_collection = db['hotels']
    hotel_names = []

    for hotel in hotels_collection.find():
        if 'nameHotel' in hotel:
            hotel_names.append(hotel['nameHotel'])

    for hotel_name in hotel_names:
        if hotel_name.lower() in message.lower():
            return hotel_name

    return None

#Lấy số lượng người
def extract_number_of_people(message):
    match = re.search(r'(\d+)\s*(người|người lớn|trẻ em|khách)', message, re.IGNORECASE)
    
    if match: 
        return int(match.group(1))
    else: 
        return None

def find_hotels_by_location(city_name, db):
    cities_collection = db["cities"]
    hotels_collection = db["hotels"]

    city = cities_collection.find_one({"name": city_name})
    if not city:
        return f"Không có khách sạn nào tại '{city_name}'."

    hotels = hotels_collection.find({"id_city": city["_id"]})
    return [
        {
            "nameHotel"         : hotel.get("nameHotel", "N/A"),
            "address"           : hotel.get("address", "N/A"),
            "contactNumber"     : hotel.get("contactNumber", "N/A")
        }
        for hotel in hotels
    ] or f"Không có khách sạn nào tại '{city_name}'."

def find_available_rooms(hotel_name, db):
    hotels_collection   = db["hotels"]
    rooms_collection    = db["rooms"]

    hotel = hotels_collection.find_one({"nameHotel": hotel_name})
    if not hotel:
        return f"Không tìm thấy khách sạn '{hotel_name}'."

    rooms = rooms_collection.find({"id_hotel": hotel["_id"], "availability": True})
    return [
        {
            "room_number"       : room.get("room_number", "N/A"),
            "room_type"         : room.get("room_type", "N/A"),
            "price_per_night"   : room.get("price_per_night", "N/A")
        }
        for room in rooms
    ] or f"Không còn phòng trống tại {hotel_name}."


def get_response(intents_list, intents_json, message, db):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    responses = []
    
    for i in list_of_intents:
        if i['tag'] == tag:
            if tag == "dia_diem":
                # Tìm khách sạn theo địa điểm
                location = extract_city_name(message, db)
                if location:
                    hotels = find_hotels_by_location(location, db)
                    if hotels:
                        responses.append(f"Tôi đã tìm thấy các khách sạn tại {location}:")
                        for idx, hotel in enumerate(hotels, start=1):
                            response = f"{idx}. {hotel['nameHotel']} (Địa chỉ: {hotel['address']}). Liên hệ: {hotel['contactNumber']}."
                            responses.append(response)
                    else:
                        responses = [f"Không có khách sạn nào tại {location}."]
                else:
                    responses = ["Xin vui lòng cung cấp địa điểm bạn muốn tìm kiếm."]
            elif tag == "kiem_tra_phong_trong":
                # Kiểm tra phòng trống
                hotel_name = extract_hotel_name(message, db)
                number_of_people = extract_number_of_people(message)
                
                if hotel_name:
                    rooms = find_available_rooms(hotel_name, db)
                    if isinstance(rooms, str):  
                        response = rooms
                    else:
                        responses.append(f"Các phòng trống tại {hotel_name}:")
                        for index, room in enumerate(rooms, start=1):
                            response = f"{index}. {room['room_type']}: {room['room_number']}. Giá: {room['price_per_night']} $."
                            responses.append(response)
                else:
                    responses = ["Xin vui lòng cung cấp tên khách sạn bạn muốn kiểm tra."]
            else:
                # Phản hồi mặc định từ intents.json
                responses = random.choice(i['responses'])
            break
    return responses