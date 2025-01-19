import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '../Components/Layout'; // Assuming Layout is your wrapper component

const DoctorSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      experience: '10 years',
      rating: 4.8,
      location: 'New York',
      image: 'https://via.placeholder.com/100x100.png?text=Dr.+Sarah',
    },
    {
      id: '2',
      name: 'Dr. Mark Lee',
      specialization: 'Dermatologist',
      experience: '8 years',
      rating: 4.5,
      location: 'Los Angeles',
      image: 'https://via.placeholder.com/100x100.png?text=Dr.+Mark',
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrician',
      experience: '12 years',
      rating: 4.9,
      location: 'Chicago',
      image: 'https://via.placeholder.com/100x100.png?text=Dr.+Emily',
    },
  ];

  const renderDoctor = ({ item }) => (
    <TouchableOpacity style={styles.doctorCard}>
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorDetails}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
        <Text style={styles.doctorExperience}>{item.experience}</Text>
        <View style={styles.doctorFooter}>
          <Text style={styles.doctorLocation}>{item.location}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.doctorRating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View style={styles.container}>
        {/* Screen Heading */}
        <Text style={styles.heading}>Find Your Doctor</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={24} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for doctors, specialties, or locations"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Doctor List */}
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          renderItem={renderDoctor}
          contentContainerStyle={styles.doctorList}
          ListHeaderComponent={<Text style={styles.subHeading}>Available Doctors</Text>}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Pure dark background
    paddingTop: 50, // Top padding for spacing
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark gray for search bar
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#fff',
  },
  doctorList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E', // Dark gray for card background
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#AAAAAA',
    marginVertical: 4,
  },
  doctorExperience: {
    fontSize: 12,
    color: '#888888',
  },
  doctorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorLocation: {
    fontSize: 12,
    color: '#4CAF50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorRating: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
});

export default DoctorSearchScreen;
