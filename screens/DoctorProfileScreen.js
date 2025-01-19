import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

const DoctorProfileScreen = ({ route, navigation }) => {
  // Dummy data for the doctor
  const doctor = {
    name: "Dr. Emily Carter",
    specialization: "Cardiologist",
    experience: "10 years",
    location: "Los Angeles, CA",
    rating: 4.8,
    bio: "Dr. Emily Carter is a board-certified cardiologist with extensive experience in managing heart-related ailments. She is committed to providing personalized care to her patients.",
    timeSlots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:30 PM", "5:00 PM"],
    image: "https://via.placeholder.com/150", // Replace with a real image link
  };

  // Render each time slot
  const renderTimeSlot = ({ item }) => (
    <TouchableOpacity style={styles.slotButton}>
      <Text style={styles.slotText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Doctor Image and Details */}
      <View style={styles.header}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialization}>{doctor.specialization}</Text>
          <Text style={styles.experience}>{doctor.experience} of experience</Text>
          <Text style={styles.location}>📍 {doctor.location}</Text>
          <Text style={styles.rating}>⭐ {doctor.rating}</Text>
        </View>
      </View>

      {/* Doctor Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{doctor.bio}</Text>
      </View>

      {/* Available Time Slots */}
      <View style={styles.timeSlotSection}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <FlatList
          data={doctor.timeSlots}
          renderItem={renderTimeSlot}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slotList}
        />
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("AppointmentBooking", { doctor })}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  details: {
    marginLeft: 16,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  specialization: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  experience: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  rating: {
    fontSize: 14,
    color: "#FFA500",
    marginTop: 4,
  },
  bioSection: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  bio: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  timeSlotSection: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  slotList: {
    flexDirection: "row",
  },
  slotButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  slotText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorProfileScreen;
