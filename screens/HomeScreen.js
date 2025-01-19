import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppLayout from '../Components/Layout';

const HomeScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');

  const appointments = [
    { id: '1', doctor: 'Dr. Sarah Johnson', time: 'Tomorrow, 10:30 AM', type: 'Online' },
    { id: '2', doctor: 'Dr. Mark Lee', time: 'Jan 17, 3:00 PM', type: 'In-person' },
  ];

  const quickLinks = [
    { 
      id: '1', 
      title: 'Book Appointment', 
      icon: 'event-available',
      screen: 'AppointmentBookingScreen'
    },
    { 
      id: '2', 
      title: 'Chat with Doctor', 
      icon: 'chat',
      screen: 'ChatScreen'
    },
    { 
      id: '3', 
      title: 'AI Chatbot', 
      icon: 'smart-toy',
      screen: 'ChatbotScreen'
    },
    { 
      id: '4', 
      title: 'Search Doctor', 
      icon: 'search',
      screen: 'DoctorSearchScreen'
    },
  ];

  const healthInsights = [
    { id: '1', title: 'Steps Today', value: '7,823 steps', icon: 'directions-walk' },
    { id: '2', title: 'Heart Rate', value: '72 bpm', icon: 'favorite' },
    { id: '3', title: 'Sleep Hours', value: '6 hrs 45 mins', icon: 'hotel' },
    { id: '4', title: 'Calories Burned', value: '312 kcal', icon: 'whatshot' },
  ];

  const renderQuickLink = ({ item }) => (
    <TouchableOpacity
      style={[styles.quickLink, { width: width * 0.35 }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Icon name={item.icon} size={22} color="#fff" />
      <Text style={styles.quickLinkText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderHealthInsight = ({ item }) => (
    <View style={styles.healthInsightCard}>
      <Icon name={item.icon} size={24} color="#1e88e5" />
      <View style={styles.healthInsightTextContainer}>
        <Text style={styles.healthInsightTitle}>{item.title}</Text>
        <Text style={styles.healthInsightValue}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <AppLayout navigation={navigation}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, Meesam</Text>
          <View style={styles.profilePicturePlaceholder}>
            <Icon name="person" size={40} color="#fff" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" />
          <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#888" />
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <FlatList
          horizontal
          data={quickLinks}
          keyExtractor={(item) => item.id}
          renderItem={renderQuickLink}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickLinksContainer}
        />

        {/* Personalized Health Insights */}
        <Text style={styles.sectionTitle}>Personalized Health Insights</Text>
        <FlatList
          data={healthInsights}
          keyExtractor={(item) => item.id}
          renderItem={renderHealthInsight}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.healthInsightsContainer}
        />
        <TouchableOpacity
          style={styles.viewDetailedButton}
          onPress={() => navigation.navigate('HealthDetails')}
        >
          <Text style={styles.viewDetailedText}>View Detailed</Text>
        </TouchableOpacity>

        {/* Upcoming Appointments */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('AppointmentsScreen')}
            >
              <View>
                <Text style={styles.doctorName}>{item.doctor}</Text>
                <Text style={styles.appointmentTime}>{item.time}</Text>
              </View>
              <Text
                style={[
                  styles.appointmentType,
                  item.type === 'Online' ? styles.online : styles.inPerson,
                ]}
              >
                {item.type}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.appointmentsContainer}
        />
      </ScrollView>
    </AppLayout>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  profilePicturePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  quickLinksContainer: {
    marginTop: 10,
  },
  quickLink: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#333',
    height: 80,
    borderRadius: 10,
  },
  quickLinkText: {
    marginTop: 6,
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
  },
  healthInsightsContainer: {
    marginTop: 10,
  },
  healthInsightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
  },
  healthInsightTextContainer: {
    marginLeft: 12,
  },
  healthInsightTitle: {
    fontSize: 14,
    color: '#fff',
  },
  healthInsightValue: {
    fontSize: 12,
    color: '#888',
  },
  viewDetailedButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  viewDetailedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    marginVertical: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: 80,
    borderRadius: 8,
  },
  appointmentsContainer: {
    paddingBottom: 80,
    flexGrow: 1,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  appointmentTime: {
    fontSize: 12,
    color: '#888',
  },
  appointmentType: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  online: {
    backgroundColor: '#1e88e5',
    color: '#fff',
  },
  inPerson: {
    backgroundColor: '#d32f2f',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingVertical: 8,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
  },
});

export default HomeScreen;