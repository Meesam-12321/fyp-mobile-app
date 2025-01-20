import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import io from 'socket.io-client';

// WebSocket URL (Localhost for now, adjust as needed for production)
const SOCKET_URL = 'http://localhost:3000'; // Update to your production server URL

const ConversationScreen = ({ navigation, route }) => {
  const { name, avatar, senderId, receiverId } = route.params || { name: 'John Doe', avatar: 'https://i.pravatar.cc/150' };
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;
  const socket = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socket.current = io(SOCKET_URL);

    // Join the socket room for the current conversation
    socket.current.emit('join', senderId);

    // Listen for incoming messages
    socket.current.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch previous messages
    fetchMessages();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/chat/messages/{senderId}/{receiverId}`);
      setMessages(response.data.data);
      flatListRef.current?.scrollToEnd();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const currentTime = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });

    const messageData = {
      senderId,
      receiverId,
      message: newMessage,
      senderModel: "Patient", // Adjust based on your logic (sender model)
      receiverModel: "Doctor", // Adjust based on your logic (receiver model)
    };

    try {
      // Send the message to the backend via API
      await axios.post('http://localhost:3000/api/chat/send-message', messageData);

      // Emit the message via WebSocket
      socket.current.emit('sendMessage', messageData);

      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          id: Date.now().toString(),
          text: newMessage, 
          sender: 'me',
          time: currentTime
        },
      ]);
      setNewMessage('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Simulate typing indication for response
    simulateTypingResponse();
  };

  const simulateTypingResponse = () => {
    Animated.sequence([
      Animated.timing(typingAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(typingAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Simulate backend response (optional for chat simulation)
      const currentTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      });

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Thanks for your message! I will get back to you shortly.",
          sender: 'other',
          time: currentTime
        }]);
        
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 500);
    });
  };

  const renderMessage = ({ item, index }) => (
    <View style={styles.messageWrapper}>
      {item.sender === 'other' && (
        <Image 
          source={{ uri: avatar }}
          style={styles.messageAvatar}
        />
      )}
      <View
        style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
          <Image source={{ uri: avatar }} style={styles.headerAvatar} />
          <Text style={styles.headerTitle}>{name}</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Typing Indicator */}
      <Animated.View style={[styles.typingIndicator, { opacity: typingAnimation }]}>
        <Text style={styles.typingText}>Dr. {name} is typing...</Text>
      </Animated.View>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#666"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingTop: Platform.OS === 'ios' ? 50 : 0, // Ensures proper spacing for iPhone notch
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#1E1E1E',
      borderBottomWidth: 1,
      borderBottomColor: '#2A2A2A',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    headerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginHorizontal: 12,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerSubtitle: {
      fontSize: 12,
      color: '#4CAF50',
      marginTop: 2,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      marginLeft: 20,
    },
    messageList: {
      padding: 15,
      flex: 1, // Ensures FlatList takes the available vertical space
    },
    messageWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginVertical: 4,
    },
    messageAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 8,
    },
    messageContainer: {
      maxWidth: '75%',
      padding: 12,
      borderRadius: 20,
      marginVertical: 2,
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#4CAF50',
      borderTopRightRadius: 4,
      marginLeft: 40,
    },
    otherMessage: {
      backgroundColor: '#292929',
      borderTopLeftRadius: 4,
      marginRight: 40,
    },
    messageText: {
      fontSize: 15,
      color: '#fff',
      lineHeight: 20,
    },
    messageTime: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.6)',
      alignSelf: 'flex-end',
      marginTop: 4,
    },
    lastMessage: {
      marginBottom: 15,
    },
    typingIndicator: {
      padding: 8,
      marginHorizontal: 15,
      marginBottom: 5,
    },
    typingText: {
      color: '#666',
      fontSize: 12,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#1E1E1E',
      borderTopWidth: 1,
      borderTopColor: '#2A2A2A',
      paddingBottom: Platform.OS === 'ios' ? 25 : 10, // Add padding for safe area on iOS
    },
    inputIcon: {
      padding: 8,
    },
    input: {
      flex: 1,
      marginHorizontal: 8,
      paddingHorizontal: 15,
      paddingVertical: 8,
      backgroundColor: '#292929',
      borderRadius: 20,
      color: '#fff',
      fontSize: 15,
      maxHeight: 100,
    },
    inputRightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sendButton: {
      backgroundColor: '#4CAF50',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
  });
  

export default ConversationScreen;