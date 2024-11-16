import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('http://192.168.1.7:5000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages([...newMessages, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: Show an error message in the UI if needed
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chat with Keith</Text>
        </View>
        <View style={styles.chatContainer}>
          <FlatList
              data={messages}
              renderItem={({ item }) => (
              <Text style={item.isUser ? styles.userMessage : styles.botMessage}>
                  {item.text}
              </Text>
              )}
              keyExtractor={(_, index) => index.toString()}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message..."
          />
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="paper-plane" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCD5BE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3D7B46',
    color: 'white',
    padding: 10,
    marginVertical: 2,
    borderRadius: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: '#000',
    padding: 10,
    marginVertical: 2,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default ChatBot;