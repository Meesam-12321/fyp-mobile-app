import React, { useState } from 'react';
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

const ChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const chatData = [
    {
      id: '1',
      name: 'Dr. John Doe',
      lastMessage: 'How can I assist you today?',
      avatar: 'https://i.pravatar.cc/150?img=1',
      time: '10:30 AM',
    },
    {
      id: '2',
      name: 'Dr. Jane Smith',
      lastMessage: 'Your appointment is confirmed.',
      avatar: 'https://i.pravatar.cc/150?img=2',
      time: '9:15 AM',
    },
    {
      id: '3',
      name: 'Support',
      lastMessage: 'Feel free to ask any questions!',
      avatar: 'https://i.pravatar.cc/150?img=3',
      time: 'Yesterday',
    },
  ];

  const handleChatPress = (chat) => {
    navigation.navigate('ConversationScreen', {
      chatId: chat.id,
      name: chat.name,
      avatar: chat.avatar
    });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.chatItem, isDarkMode && styles.chatItemDark]}
      onPress={() => handleChatPress(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={[styles.chatName, isDarkMode && styles.chatNameDark]}>{item.name}</Text>
        <Text style={[styles.chatMessage, isDarkMode && styles.chatMessageDark]}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={[styles.chatTime, isDarkMode && styles.chatTimeDark]}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <AppLayout>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, isDarkMode && styles.headerDark]}>Chats</Text>
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
          data={chatData.filter((chat) =>
            chat.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          contentContainerStyle={styles.chatList}
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  },
  chatNameDark: {
    color: '#fff',
  },
  chatMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  chatMessageDark: {
    color: '#aaa',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
  },
  chatTimeDark: {
    color: '#666',
  },
});

export default ChatScreen;