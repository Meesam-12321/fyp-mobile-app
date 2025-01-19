import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          medicalHistory: formData.medicalHistory,
          allergies: formData.allergies,
          medications: formData.medications,
          emergencyContact: formData.emergencyContact,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      Alert.alert('Success', 'Registration successful!');
      // Handle successful registration (e.g., navigation, token storage)
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Patient Account</Text>
        <Text style={styles.subtitle}>Complete your medical profile</Text>

        <InputField
          icon="person"
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <InputField
          icon="email"
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <InputField
          icon="lock"
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={!showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          isPassword
        />

        <InputField
          icon="lock"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry={!showConfirmPassword}
          toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          isPassword
        />

        <InputField
          icon="history"
          placeholder="Medical History"
          value={formData.medicalHistory}
          onChangeText={(text) => setFormData({ ...formData, medicalHistory: text })}
        />

        <InputField
          icon="warning"
          placeholder="Allergies"
          value={formData.allergies}
          onChangeText={(text) => setFormData({ ...formData, allergies: text })}
        />

        <InputField
          icon="medical-services"
          placeholder="Current Medications"
          value={formData.medications}
          onChangeText={(text) => setFormData({ ...formData, medications: text })}
        />

        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        
        <InputField
          icon="person-outline"
          placeholder="Emergency Contact Name"
          value={formData.emergencyContact.name}
          onChangeText={(text) => setFormData({
            ...formData,
            emergencyContact: { ...formData.emergencyContact, name: text }
          })}
        />

        <InputField
          icon="phone"
          placeholder="Emergency Contact Phone"
          value={formData.emergencyContact.phone}
          onChangeText={(text) => setFormData({
            ...formData,
            emergencyContact: { ...formData.emergencyContact, phone: text }
          })}
        />

        <InputField
          icon="people"
          placeholder="Relationship to Patient"
          value={formData.emergencyContact.relationship}
          onChangeText={(text) => setFormData({
            ...formData,
            emergencyContact: { ...formData.emergencyContact, relationship: text }
          })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => alert('Go to Login')}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 15,
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
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default SignupScreen;