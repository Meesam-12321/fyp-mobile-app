import React, { useState } from 'react';
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
import HealthInsightsScreen from '../screens/AIHealth';
import AddReadingScreen from '../screens/AddReadingScreen';
import HealthTrendsScreen from '../screens/HealthTrendsScreen';
import AnomaliesScreen from '../screens/AnomaliesScreen';
import AIHealthSummaryScreen from '../screens/AIHealthSummaryScreen';
import HealthReportsScreen from '../screens/HealthReportsScreen';




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Wrapper for LoginScreen to handle login success
  const LoginScreenWrapper = ({ navigation }) => (
    <LoginScreen 
      navigation={navigation} 
      onLoginSuccess={() => setIsLoggedIn(true)} 
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HealthReportsScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HealthInsightsScreen" component={HealthInsightsScreen} />
        <Stack.Screen name="LandingPageScreen" component={LandingPageScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreenWrapper} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} />
        <Stack.Screen name="AppointmentBookingScreen" component={AppointmentBookingScreen} />
        <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} />
        <Stack.Screen name="DoctorSearchScreen" component={DoctorSearchScreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
        <Stack.Screen name="AddReadingScreen" component={AddReadingScreen} />
        <Stack.Screen name="HealthTrendsScreen" component={HealthTrendsScreen} />
        <Stack.Screen name="AnomaliesScreen" component={AnomaliesScreen} />
        <Stack.Screen name="AIHealthSummaryScreen" component={AIHealthSummaryScreen} />
        <Stack.Screen name="HealthReportsScreen" component={HealthReportsScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;