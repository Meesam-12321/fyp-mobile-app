import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { jwtDecode } from 'jwt-decode';
import Layout from '../Components/Layout';

const DEFAULT_DOCTOR_IMAGE = 'https://via.placeholder.com/100x100.png?text=Doctor';

const DoctorSearchScreen = ({ route, navigation }) => {
  const { token } = route?.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const extractNameFromEmail = (email) => {
    if (!email) return 'Unknown';
    const extractedName = email.split('@')[0].replace(/\d+/g, ''); // Remove numbers
    return capitalizeFirstLetter(extractedName);
  };

  const getUser = () => {
    try {
      return token ? jwtDecode(token) : null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

  const user = getUser();

  useEffect(() => {
    if (!doctors) return;
    
    const filtered = doctors.filter(doctor => {
      const searchLower = searchQuery.toLowerCase();
      return (
        doctor?.name?.toLowerCase().includes(searchLower) ||
        doctor?.specialization?.toLowerCase().includes(searchLower) ||
        doctor?.location?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const fetchDoctors = async () => {
    try {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('http://localhost:3000/api/doctors', { 
        method: 'GET', 
        headers 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const sanitizedData = data.map(doctor => ({
        id: doctor._id || Math.random().toString(36).substr(2, 9),
        name: doctor.name || extractNameFromEmail(doctor.email),
        specialization: doctor.specialization || 'General Practice',
        experience: doctor.experience || 0,
        location: doctor.clinicAddress || 'Location not available',
        rating: doctor.rating || 0,
        image: doctor.image || DEFAULT_DOCTOR_IMAGE
      }));

      setDoctors(sanitizedData);
      setFilteredDoctors(sanitizedData);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    setError(null);
    fetchDoctors();
  };

  const renderDoctor = ({ item }) => {
    if (!item) return null;

    return (
      <TouchableOpacity 
        style={styles.doctorCard}
        onPress={() => {
          if (item.id) {
            navigation?.navigate('DoctorDetails', { doctorId: item.id });
          }
        }}
      >
        <Image 
          source={{ uri: item.image || DEFAULT_DOCTOR_IMAGE }} 
          style={styles.doctorImage} 
          onError={(e) => {
            console.log(`Failed to load image for doctor: ${item.name}`);
          }}
        />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
          <Text style={styles.doctorExperience}>
            {item.experience} {item.experience === 1 ? 'year' : 'years'} experience
          </Text>
          <View style={styles.doctorFooter}>
            <Text style={styles.doctorLocation}>{item.location}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.doctorRating}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!token) {
    return (
      <Layout>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Please log in to view doctors</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Find Your Doctor</Text>

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

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredDoctors}
            keyExtractor={(item) => item?.id?.toString() || Math.random().toString(36).substr(2, 9)}
            renderItem={renderDoctor}
            contentContainerStyle={styles.doctorList}
            ListHeaderComponent={
              <Text style={styles.subHeading}>
                {filteredDoctors.length} Available Doctors
              </Text>
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No doctors found</Text>
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000', // Black background for a pure dark theme
      paddingTop: 50,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 20,
    },
    subHeading: {
      fontSize: 18,
      fontWeight: '600',
      color: '#ddd',
      marginHorizontal: 20,
      marginBottom: 10,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1A1A1A', // Dark gray for contrast
      padding: 12,
      marginHorizontal: '5%',
      borderRadius: 20,
      elevation: 3, // Shadow for elevation effect
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: '#fff',
    },
    doctorCard: {
      flexDirection: 'row',
      backgroundColor: '#1E1E1E', // Slightly lighter gray for cards
      padding: 15,
      marginBottom: 15,
      marginHorizontal: '5%',
      borderRadius: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
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
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    doctorSpecialization: {
      fontSize: 14,
      color: '#bbb',
      marginTop: 5,
    },
    doctorExperience: {
      fontSize: 14,
      color: '#bbb',
      marginTop: 3,
    },
    doctorFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
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
      fontSize: 14,
      color: '#fff',
      marginLeft: 5,
    },
    doctorList: {
      paddingTop: 10,
    },
    emptyText: {
      textAlign: 'center',
      color: '#aaa',
      fontSize: 16,
      marginTop: 20,
    },
    errorText: {
      color: '#f00',
      fontSize: 16,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#333',
      borderRadius: 10,
    },
    retryText: {
      color: '#fff',
      fontSize: 14,
    },
  });
  
export default DoctorSearchScreen;
