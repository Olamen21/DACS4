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
from datetime import datetime

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
        
        db.cities.create_index("name", unique=True)
        db.hotels.create_index("nameHotel")
        db.rooms.create_index([("id_hotel", 1), ("room_type", 1)])
        
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

def extract_room_type(message,db):
    rooms_collection = db['rooms']
    room_types = []
    
    for room in rooms_collection.find():
        if 'room_type' in room:
            room_types.append(room['room_type'])
            
    for room_type in room_types:
        if room_type.lower() in message.lower():
            return room_type
    return None

def find_hotels_by_location(city_name, db):
    cities_collection = db["cities"]
    hotels_collection = db["hotels"]

    city = cities_collection.find_one({"name": city_name})
    if not city:
        return f"Không có nơi'{city_name}' này. Xin vui lòng cung cấp địa điểm khác."

    hotels = hotels_collection.find({"id_city": city["_id"]}, {"nameHotel": 1, "address": 1, "contactNumber": 1})
    hotel_list = list(hotels)
    if not hotel_list:
        return f"Không có khách sạn nào tại '{city_name}'."
    
    return [
        f"{idx+1}. {hotel['nameHotel']} (Địa chỉ: {hotel.get('address', 'N/A')}). Liên hệ: {hotel.get('contactNumber', 'N/A')}."
        for idx, hotel in enumerate(hotel_list)
    ]

def find_available_rooms(hotel_name, db):
    hotels_collection   = db["hotels"]
    rooms_collection    = db["rooms"]

    hotel = hotels_collection.find_one({"nameHotel": hotel_name})
    if not hotel:
        return f"Không tìm thấy khách sạn '{hotel_name}'."

    rooms = rooms_collection.find({"id_hotel": hotel["_id"], "availability": True}, {"room_number": 1, "room_type": 1, "price_per_night": 1})
    room_list = list(rooms)

    if not room_list:
        return f"Hiện không có phòng trống tại khách sạn '{hotel_name}'."

    return [
        f"{idx+1}. Phòng {room['room_number']} ({room['room_type']}): {room['price_per_night']} $/đêm."
        for idx, room in enumerate(room_list)
    ]

#Hỏi giá phòng    
def find_room_price(hotel_name,room_type, db):
    hotels_collection = db["hotels"]
    rooms_collection  = db["rooms"]
   
    hotel = hotels_collection.find_one({"nameHotel": hotel_name})
    if not hotel:
        return f"Không tìm thấy khách sạn '{hotel_name}'."
    room = rooms_collection.find_one({"id_hotel": hotel["_id"], "room_type": room_type})
    if not room:
        return f"Không tìm thấy phòng loại '{room_type}' tại khách sạn {hotel_name}."
    
    price = room.get("price_per_night")
    if not price:
        return f"Giá phòng loại '{room_type}' tại khách sạn {hotel_name} hiện không có sẵn."

    return f"Giá phòng {room_type} tại khách sạn {hotel_name} là {price} $/đêm."

#Hỏi dịch vụ của khách sạn
def find_amenities(hotel_name, db):
    hotels_collection = db["hotels"]
    hotel = hotels_collection.find_one({"nameHotel": hotel_name})
    if not hotel:
        return f"Không tìm thấy khách sạn '{hotel_name}'."
    animaties = hotel.get("amenities")
    if not animaties:
        return f"Hiện khách sạn {hotel_name} không có dịch vụ được cập nhật."
    if isinstance(animaties, list):
        animaties_str = ", ".join(animaties)
    else:
        animaties_str = str(animaties)
    return f"Khách sạn {hotel_name} có các dịch vụ: {animaties_str}"

#Hỏi loại phòng
def find_room_type(hotel_name, db):
    hotels_collection = db["hotels"]
    hotel = hotels_collection.find_one({"nameHotel": hotel_name})
    rooms_collection  = db["rooms"]
    if not hotel:
        return f"Không tìm thấy khách sạn '{hotel_name}'."
    rooms = rooms_collection.find({"id_hotel": hotel["_id"]})
    room_types = set()
    for room in rooms:
        if "room_type" in room:
            room_types.add(room["room_type"])
    if not room_types:
        return f"Hiện khách sạn {hotel_name} không có phòng nào được cập nhật."
    room_types_str = ", ".join(sorted(room_types))
    return f"Khách sạn {hotel_name} có các loại phòng: {room_types_str}."
    

def get_response(intents_list, intents_json, message, db):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    responses = []
    hotel_name = extract_hotel_name(message,db)
    room_type = extract_room_type(message,db)
    
    for i in list_of_intents:
        if i['tag'] == tag:
            print("Intent Tag:", tag)
            if tag == "dia_diem":
                # Tìm khách sạn theo địa điểm
                city_name = extract_city_name(message, db)
                if city_name:
                    return find_hotels_by_location(city_name, db)
                return ["Vui lòng cung cấp địa điểm bạn muốn tìm kiếm."]
            elif tag == "kiem_tra_phong_trong":
                # Kiểm tra phòng trống
                if hotel_name:
                    return find_available_rooms(hotel_name, db)
                return ["Vui lòng cung cấp tên khách sạn."]
            elif tag == "hoi_gia":
                if hotel_name and room_type:
                    price = find_room_price(hotel_name,room_type,db)
                    responses = [price]
                else: 
                    responses = ["Xin vui lòng cung cấp loại phòng và tên khách sạn mà bạn muốn kiểm tra."]
            elif tag == "dich_vu_khach_san":
                if hotel_name:
                    animaties = find_amenities(hotel_name, db)
                    responses = [animaties]
                else:
                    responses = ["Xin vui lòng cung cấp tên khách sạn mà bạn muốn kiểm tra."]
            elif tag == "hoi_loai_phong":
                if hotel_name:
                    room_types = find_room_type(hotel_name,db)
                    responses = [room_types]
                else:
                    responses = ["Xin vui lòng cung cấp tên khách sạn mà bạn muốn kiểm tra."] 
            else:
                # Phản hồi mặc định từ intents.json
                responses = random.choice(i['responses'])
            break
    return responses