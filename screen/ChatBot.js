import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { CHATBOT_SERVER_URL } from '@env';
import NetInfo from '@react-native-community/netinfo';


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setError('Không có kết nối mạng');
      } else {
        setError('');
      }
    });
    return () => unsubscribe();
  }, []);

  // Tự động gửi lời chào khi mở màn hình
  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await fetch(`${CHATBOT_SERVER_URL}/chatbot/init`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages([{ text: data.response, isUser: false }]);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
      }
    };
    fetchWelcomeMessage();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    setLoading(true);
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), text: input, isUser: true },
    ];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch(`${CHATBOT_SERVER_URL}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) {
        throw new Error(`Lỗi máy chủ: ${response.status}`);
      }
      const data = await response.json();
      const botMessages = Array.isArray(data.response)
        ? data.response
        : [data.response];
      botMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString() + index, text: msg, isUser: false },
          ]);
        }, 1000 * index);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
    marginLeft: '20%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: '#000',
    padding: 10,
    marginVertical: 2,
    marginRight: '20%',
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
