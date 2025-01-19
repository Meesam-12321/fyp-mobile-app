// AppointmentsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AppointmentsScreen = ({ navigation }) => {
  // Dummy data for appointments
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Emily Carter",
      specialization: "Cardiologist",
      date: "2025-01-20",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      doctorName: "Dr. John Smith",
      specialization: "Dermatologist",
      date: "2025-01-15",
      time: "3:30 PM",
      status: "Completed",
    },
    {
      id: 3,
      doctorName: "Dr. Sarah Connor",
      specialization: "Neurologist",
      date: "2025-01-18",
      time: "11:00 AM",
      status: "Cancelled",
    },
  ];

  const renderAppointmentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() => navigation.navigate("AppointmentDetails", { appointment: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>{item.doctorName}</Text>
        <Text
          style={[
            styles.status,
            item.status === "Upcoming" && styles.upcomingStatus,
            item.status === "Completed" && styles.completedStatus,
            item.status === "Cancelled" && styles.cancelledStatus,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.specialization}>{item.specialization}</Text>
      <Text style={styles.dateTime}>📅 {item.date} | 🕒 {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Appointments</Text>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  listContent: {
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  upcomingStatus: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  completedStatus: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  cancelledStatus: {
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  specialization: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  dateTime: {
    fontSize: 14,
    color: "#777",
  },
});

export default AppointmentsScreen;
