// AppointmentBookingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppLayout from '../Components/Layout';

const AppointmentBookingScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const handleBooking = () => {
    alert('Appointment booked successfully!');
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Book an Appointment</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={24} color="#1e88e5" />
          <TextInput
            style={styles.input}
            placeholder="Select Date (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={selectedDate}
            onChangeText={setSelectedDate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="time-outline" size={24} color="#1e88e5" />
          <TextInput
            style={styles.input}
            placeholder="Select Time (HH:MM AM/PM)"
            placeholderTextColor="#888"
            value={selectedTime}
            onChangeText={setSelectedTime}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#1e88e5" />
          <TextInput
            style={styles.input}
            placeholder="Reason for Appointment"
            placeholderTextColor="#888"
            value={reason}
            onChangeText={setReason}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Top padding for alignment
    paddingBottom: 80, // To avoid overlapping with the footer
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
});

export default AppointmentBookingScreen;
