import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, toggleVisibility, isPassword }) => (
  <View style={styles.inputContainer}>
    <MaterialIcons name={icon} size={24} color="#ffffff" style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#666"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      autoCapitalize="none"
    />
    {isPassword && (
      <TouchableOpacity onPress={toggleVisibility} style={styles.visibilityIcon}>
        <MaterialIcons
          name={secureTextEntry ? 'visibility-off' : 'visibility'}
          size={24}
          color="#ffffff"
        />
      </TouchableOpacity>
    )}
  </View>
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.16.14.187:3000/api/auth/patient/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('userToken', data.token);

      // Navigate to Home screen
      navigation.replace('HomeScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <MaterialIcons name="medical-services" size={60} color="#ffffff" style={styles.logo} />
        
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your patient account</Text>

        <InputField
          icon="email"
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
        />

        <InputField
          icon="lock"
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
          secureTextEntry={!showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          isPassword
        />

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => Alert.alert('Reset Password', 'Please contact support to reset your password.')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text 
            style={styles.signupLink} 
            onPress={() => navigation.navigate('SignupScreen')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  visibilityIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
