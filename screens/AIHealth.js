import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppLayout from '../Components/Layout';

const HealthInsightsScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');

  const healthStats = [
    { id: '1', title: 'Heart Rate', value: '72 bpm', icon: 'favorite', status: 'good' },
    { id: '2', title: 'Blood Pressure', value: '128/85', icon: 'speed', status: 'warning' },
    { id: '3', title: 'SpO2', value: '98%', icon: 'air', status: 'good' },
    { id: '4', title: 'Glucose', value: '110 mg/dL', icon: 'opacity', status: 'good' },
    { id: '5', title: 'Sleep', value: '6.8 hrs', icon: 'hotel', status: 'warning' },
    { id: '6', title: 'Activity', value: '8,235 steps', icon: 'directions-walk', status: 'good' },
  ];

  const renderStatCard = ({ item }) => (
    <TouchableOpacity
      style={styles.statCard}
      onPress={() => navigation.navigate('TrendsScreen', { statType: item.title })}
    >
      <View style={styles.statIconContainer}>
        <Icon name={item.icon} size={20} color="#fff" />
        <View 
          style={[
            styles.statusIndicator, 
            item.status === 'good' ? styles.goodStatus : 
            item.status === 'warning' ? styles.warningStatus : styles.alertStatus
          ]} 
        />
      </View>
      <Text style={styles.statTitle}>{item.title}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </TouchableOpacity>
  );

  // For circular progress ring
  const healthScore = 83;
  const circleSize = width * 0.35;
  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dashOffset = circumference - (healthScore / 100) * circumference;

  return (
    <AppLayout navigation={navigation}>
      <View style={styles.container}>
        {/* App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Health Insights</Text>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>M</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Health Score Card */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreRingContainer}>
              <View style={styles.scoreBackgroundRing} />
              <View style={[styles.scoreProgressRing, { strokeDashoffset: dashOffset }]} />
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreValue}>{healthScore}</Text>
                <Text style={styles.scoreMax}>/ 100</Text>
              </View>
            </View>
            <View style={styles.scoreInfoContainer}>
              <Text style={styles.scoreStatus}>Good</Text>
              <Text style={styles.scoreUpdated}>Updated Today at 9:12 AM</Text>
            </View>
          </View>

          {/* AI Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Icon name="psychology" size={24} color="#1e88e5" />
              <Text style={styles.summaryTitle}>Today's Summary</Text>
            </View>
            <Text style={styles.summaryText}>
              All metrics stable. Good hydration, but BP slightly elevated.
            </Text>
            <TouchableOpacity 
              style={styles.summaryButton}
              onPress={() => navigation.navigate('AISummaryScreen')}
            >
              <Text style={styles.summaryButtonText}>View full summary</Text>
              <Icon name="arrow-forward" size={16} color="#1e88e5" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <FlatList
              data={healthStats}
              keyExtractor={(item) => item.id}
              renderItem={renderStatCard}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsContainer}
            />
          </View>

          {/* Anomaly Banner */}
          <TouchableOpacity 
            style={styles.anomalyBanner}
            onPress={() => navigation.navigate('AnomaliesScreen')}
          >
            <View style={styles.anomalyContent}>
              <Icon name="warning" size={22} color="#ffb300" />
              <Text style={styles.anomalyText}>Hypertension detected today</Text>
            </View>
            <View style={styles.anomalyAction}>
              <Text style={styles.anomalyActionText}>View all</Text>
              <Icon name="arrow-forward" size={16} color="#ffb300" />
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* FAB Button */}
        <TouchableOpacity 
          style={styles.fabButton}
          onPress={() => navigation.navigate('AddReadingScreen')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    padding: 5,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  scoreRingContainer: {
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scoreBackgroundRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: Dimensions.get('window').width * 0.175,
    borderWidth: 10,
    borderColor: '#333',
  },
  scoreProgressRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: Dimensions.get('window').width * 0.175,
    borderWidth: 10,
    borderColor: '#1e88e5',
    borderTopColor: 'transparent',
    borderRightColor: '#1e88e5',
    borderLeftColor: '#1e88e5',
    transform: [{ rotate: '-90deg' }],
  },
  scoreTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreMax: {
    fontSize: 14,
    color: '#888',
    marginLeft: 2,
  },
  scoreInfoContainer: {
    marginLeft: 20,
    flex: 1,
  },
  scoreStatus: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  scoreUpdated: {
    fontSize: 12,
    color: '#888',
  },
  summaryCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  summaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  summaryButtonText: {
    fontSize: 14,
    color: '#1e88e5',
    marginRight: 4,
  },
  statsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  statsContainer: {
    paddingRight: 20,
  },
  statCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    marginRight: 12,
    width: 110,
    alignItems: 'center',
  },
  statIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: -2,
    right: -2,
  },
  goodStatus: {
    backgroundColor: '#4caf50',
  },
  warningStatus: {
    backgroundColor: '#ffb300',
  },
  alertStatus: {
    backgroundColor: '#f44336',
  },
  statTitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  anomalyBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262200',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
    marginBottom: 80,
  },
  anomalyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  anomalyText: {
    fontSize: 14,
    color: '#ffb300',
    marginLeft: 8,
  },
  anomalyAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  anomalyActionText: {
    fontSize: 12,
    color: '#ffb300',
    marginRight: 4,
  },
  fabButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default HealthInsightsScreen;