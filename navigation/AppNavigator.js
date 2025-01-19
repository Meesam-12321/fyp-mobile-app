import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPageScreen from '../screens/LandingPageScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import DoctorSearchScreen from '../screens/DoctorSearchScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import ChatScreen from '../screens/ChatScreen';
import ConversationScreen from '../screens/ConversationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Create a wrapper component for LoginScreen that includes the onLoginSuccess prop
  const LoginScreenWrapper = ({ navigation }) => (
    <LoginScreen 
      navigation={navigation} 
      onLoginSuccess={() => setIsLoggedIn(true)} 
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "HomeScreen" : "LandingPageScreen"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LandingPageScreen" component={LandingPageScreen} />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreenWrapper}
        />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} />
        <Stack.Screen name="AppointmentBookingScreen" component={AppointmentBookingScreen} />
        <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} />
        <Stack.Screen name="DoctorSearchScreen" component={DoctorSearchScreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;