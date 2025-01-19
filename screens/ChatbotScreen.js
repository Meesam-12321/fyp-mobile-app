import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${Date.now()}`, text: input, sender: 'user' },
        { id: `${Date.now() + 1}`, text: 'I’m here to help!', sender: 'bot' },
      ]);
      setInput('');
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.botMessageText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top bar with previous conversations icon */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="chatbox-ellipses-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Welcome text and logo */}
      <View style={styles.centerContent}>
        <MaterialIcons name="chat-bubble-outline" size={60} color="#fff" />
        <Text style={styles.welcomeText}>Welcome to your Assistant</Text>
      </View>

      {/* Chat messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
        />
        {/* Input bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Solid dark background
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Subtle separator
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerContent: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e1e1e', // Dark gray for user messages
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#333', // Slightly lighter gray for bot messages
  },
  messageText: {
    fontSize: 14,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1e1e1e', // Input background matches theme
    borderTopWidth: 1,
    borderTopColor: '#333',
    borderRadius: 20,
    marginHorizontal: 15,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    color: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 20,
  },
});

export default ChatbotScreen;
