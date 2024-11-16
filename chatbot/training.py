import random
import json
import pickle
import numpy as np

from nltk.stem import WordNetLemmatizer
from pyvi import ViTokenizer

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout
from tensorflow.keras.optimizers import SGD 
from sklearn.utils import shuffle

lemmatizer = WordNetLemmatizer()

intents = json.loads(open('intents.json', encoding='utf-8').read())

words = []
classes = []
documents = []
ignore_letters = ['?','!','.',',']

for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = ViTokenizer.tokenize(pattern).split()
        word_list = [lemmatizer.lemmatize(w.lower()) for w in word_list if w not in ignore_letters]
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])
            
words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))

classes = sorted(set(classes))

pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

training_bag = []
training_output_row = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)
    training_bag.append(bag)
    
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training_output_row.append(output_row)
  
training_bag = np.array(training_bag)
training_output_row = np.array(training_output_row)

from sklearn.utils import shuffle
train_x, train_y = shuffle(training_bag, training_output_row, random_state=0)

model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),),activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64,activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

hist = model.fit(np.array(train_x), np.array(train_y), epochs=100, batch_size=5, verbose=1)
model.save('chatbotmodel.h5', hist)

print("Done")


    
