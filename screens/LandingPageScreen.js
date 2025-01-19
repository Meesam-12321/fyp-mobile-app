// LandingPageScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LandingPageScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#232526', '#414345'] : ['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          Welcome to Patient App
        </Text>
        <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
          Your one-stop solution for healthcare
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={() => navigateToScreen('LoginScreen')}
          >
            <Ionicons name="log-in-outline" size={24} color={isDarkMode ? '#fff' : '#6a11cb'} />
            <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={() => navigateToScreen('SignupScreen')}
          >
            <Ionicons name="person-add-outline" size={24} color={isDarkMode ? '#fff' : '#6a11cb'} />
            <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitleDark: {
    color: '#bbb',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDark: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6a11cb',
    marginLeft: 10,
  },
  buttonTextDark: {
    color: '#fff',
  },
});

export default LandingPageScreen;
