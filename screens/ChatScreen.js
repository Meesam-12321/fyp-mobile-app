import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useColorScheme,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppLayout from '../Components/Layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ChatScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Extract token from navigation params
  const { token } = route.params || {};
  console.log('Token received:', token);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        // Decode token to get userId
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const userId = decoded?.id;
        console.log('User ID:', userId);

        if (!userId) {
          setError('Invalid token or no userId found');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/chat/conversations/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('API response:', response.data);
        if (response.data?.data) {
          setChatData(response.data.data);
        } else {
          setChatData([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        if (err.response?.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Failed to load conversations');
        }
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token]);

  const handleChatPress = (chat) => {
    navigation.navigate('ConversationScreen', {
      chatId: chat.id,
      name: chat.name,
      avatar: chat.avatar,
      token: token, // Pass token to conversation screen
    });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatItem, isDarkMode && styles.chatItemDark]}
      onPress={() => handleChatPress(item)}
    >
      <Image 
        source={{ uri: item.avatar }} 
        style={styles.avatar}
      />
      <View style={styles.chatDetails}>
        <Text style={[styles.chatName, isDarkMode && styles.chatNameDark]}>
          {item.name}
        </Text>
        <Text 
          style={[styles.chatMessage, isDarkMode && styles.chatMessageDark]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.lastMessage}
        </Text>
      </View>
      <Text style={[styles.chatTime, isDarkMode && styles.chatTimeDark]}>
        {item.time}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <AppLayout>
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
          <Text style={[styles.messageText, isDarkMode && styles.messageTextDark]}>
            Loading conversations...
          </Text>
        </View>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
          <Text style={[styles.messageText, isDarkMode && styles.messageTextDark]}>
            {error}
          </Text>
        </View>
      </AppLayout>
    );
  }

  console.log('Chat data before rendering:', chatData);
  chatData.forEach((chat, index) => {
    if (!chat.name) {
      console.warn(`Chat item at index ${index} has no name property:`, chat);
    }
  });

  return (
    <AppLayout>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, isDarkMode && styles.headerDark]}>
            Chats
          </Text>
        </View>
        
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={isDarkMode ? '#aaa' : '#555'}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchBar, isDarkMode && styles.searchBarDark]}
            placeholder="Search chats..."
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={chatData.filter((chat) => {
            if (!chat.name) {
              console.warn('Encountered chat item without name property:', chat);
              return false;
            }
            return chat.name.toLowerCase().includes(searchQuery.toLowerCase());
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChatItem}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={
            <Text style={[styles.messageText, isDarkMode && styles.messageTextDark]}>
              No conversations found
            </Text>
          }
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerDark: {
    color: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    color: '#000',
  },
  searchBarDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  chatList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  chatItemDark: {
    backgroundColor: '#1e1e1e',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  chatNameDark: {
    color: '#fff',
  },
  chatMessage: {
    fontSize: 14,
    color: '#555',
  },
  chatMessageDark: {
    color: '#aaa',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 10,
  },
  chatTimeDark: {
    color: '#666',
  },
  messageText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    padding: 20,
  },
  messageTextDark: {
    color: '#fff',
  },
});

export default ChatScreen;