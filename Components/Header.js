// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150x50?text=My+Health+App' }}
          style={styles.logo}
        />
      </View>

      {/* Navigation Options */}
      <View style={styles.navOptions}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Appointments')}
        >
          <Icon name="event" size={28} color="#ffffff" />
          <Text style={styles.navText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Icon name="chat" size={28} color="#ffffff" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Icon name="smartphone" size={28} color="#ffffff" />
          <Text style={styles.navText}>Chatbot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person" size={28} color="#ffffff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  navOptions: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  navText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Header;
