import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HealthIcon from 'react-native-vector-icons/FontAwesome5';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AppLayout from '../Components/Layout';

const { width } = Dimensions.get('window');

const HealthReportsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Mock data for health metrics
  const healthMetrics = {
    bloodPressure: {
      avg: '128/82',
      unit: 'mmHg',
      status: 'normal',
    },
    heartRate: {
      avg: 72,
      unit: 'bpm',
      status: 'normal',
    },
    glucose: {
      avg: 115,
      unit: 'mg/dL',
      status: 'warning',
    },
    sleep: {
      avg: 6.5,
      unit: 'hrs',
      status: 'warning',
    },
    steps: {
      avg: 7850,
      unit: 'steps',
      status: 'normal',
    },
    weight: {
      avg: 168,
      unit: 'lbs',
      status: 'normal',
    }
  };

  // Mock data for anomalies
  const anomalies = [
    {
      id: '1',
      metric: 'Blood Pressure',
      description: 'Elevated readings',
      date: 'Apr 12, 2025',
      status: 'warning',
    },
    {
      id: '2',
      metric: 'Sleep',
      description: 'Below target duration',
      date: 'Apr 10-13, 2025',
      status: 'warning',
    },
    {
      id: '3',
      metric: 'Glucose',
      description: 'Post-meal spike',
      date: 'Apr 11, 2025',
      status: 'warning',
    },
    {
      id: '4',
      metric: 'Heart Rate',
      description: 'Resting HR increased',
      date: 'Apr 8, 2025',
      status: 'resolved',
    },
    {
      id: '5',
      metric: 'Activity',
      description: 'Below weekly goal',
      date: 'Apr 7-14, 2025',
      status: 'warning',
    }
  ];

  // Mock data for charts
  const chartData = {
    bloodPressure: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [130, 135, 128, 142, 125, 130, 129],
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2
        },
        {
          data: [82, 85, 80, 87, 80, 84, 81],
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ['Systolic', 'Diastolic']
    },
    heartRate: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [68, 72, 70, 75, 82, 73, 71],
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ['BPM']
    },
    glucose: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [105, 118, 112, 128, 110, 115, 122],
          color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ['mg/dL']
    }
  };

  // Load health data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle date range selection
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setDatePickerVisible(false);
    // In a real app, we would fetch new data based on the selected range
  };

  // Share or export report
  const shareReport = async () => {
    try {
      const result = await Share.share({
        title: 'My Health Report',
        message: 'Health report summary for April 7-14, 2025',
        url: 'healthapp://reports/1234'
      });
    } catch (error) {
      console.error('Error sharing report:', error);
    }
  };

  if (isLoading) {
    return (
      <AppLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e88e5" />
          <Text style={styles.loadingText}>Loading your health report...</Text>
        </View>
      </AppLayout>
    );
  }

  // Chart configuration
  const chartConfig = {
    backgroundColor: '#1e1e1e',
    backgroundGradientFrom: '#1e1e1e',
    backgroundGradientTo: '#1e1e1e',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: '#1e1e1e',
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

  // Render metric summary cards
  const renderMetricSummary = () => {
    const metrics = Object.entries(healthMetrics);
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricSummaryContainer}
      >
        {metrics.map(([key, value]) => (
          <View key={key} style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              {key === 'bloodPressure' && <HealthIcon name="heartbeat" size={16} color="#fff" />}
              {key === 'heartRate' && <HealthIcon name="heart" size={16} color="#fff" />}
              {key === 'glucose' && <HealthIcon name="tint" size={16} color="#fff" />}
              {key === 'sleep' && <Icon name="nightlight" size={16} color="#fff" />}
              {key === 'steps' && <HealthIcon name="walking" size={16} color="#fff" />}
              {key === 'weight' && <HealthIcon name="weight" size={16} color="#fff" />}
            </View>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>
                {key === 'bloodPressure' ? 'Blood Pressure' : 
                 key === 'heartRate' ? 'Heart Rate' : 
                 key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={styles.metricValueRow}>
                <Text style={styles.metricValue}>{value.avg}</Text>
                <Text style={styles.metricUnit}>{value.unit}</Text>
                {value.status === 'warning' && 
                  <Text style={styles.metricWarning}>⚠️</Text>
                }
                {value.status === 'normal' && 
                  <Text style={styles.metricNormal}>✅</Text>
                }
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  // Date picker modal
  const renderDatePicker = () => {
    return (
      <Modal
        visible={datePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            
            <TouchableOpacity 
              style={[styles.dateOption, dateRange === 'week' && styles.dateOptionSelected]}
              onPress={() => handleDateRangeChange('week')}
            >
              <Text style={[styles.dateOptionText, dateRange === 'week' && styles.dateOptionTextSelected]}>Past Week</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dateOption, dateRange === 'month' && styles.dateOptionSelected]}
              onPress={() => handleDateRangeChange('month')}
            >
              <Text style={[styles.dateOptionText, dateRange === 'month' && styles.dateOptionTextSelected]}>Past Month</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dateOption, dateRange === '3months' && styles.dateOptionSelected]}
              onPress={() => handleDateRangeChange('3months')}
            >
              <Text style={[styles.dateOptionText, dateRange === '3months' && styles.dateOptionTextSelected]}>Past 3 Months</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dateOption, dateRange === 'custom' && styles.dateOptionSelected]}
              onPress={() => handleDateRangeChange('custom')}
            >
              <Text style={[styles.dateOptionText, dateRange === 'custom' && styles.dateOptionTextSelected]}>Custom Range</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setDatePickerVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

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
          <Text style={styles.appBarTitle}>My Health Reports</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setDatePickerVisible(true)}
          >
            <Icon name="date-range" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Date range indicator */}
        <View style={styles.dateRangeContainer}>
          <Text style={styles.dateRangeText}>
            {dateRange === 'week' ? 'April 7 - 14, 2025' : 
             dateRange === 'month' ? 'March 14 - April 14, 2025' :
             dateRange === '3months' ? 'January 14 - April 14, 2025' :
             'Custom Date Range'}
          </Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Metrics Summary */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="insights" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>Health Metrics</Text>
            </View>
            {renderMetricSummary()}
          </View>
          
          {/* Charts Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="trending-up" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>Trends</Text>
            </View>
            
            {/* Blood Pressure Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Blood Pressure</Text>
                <Text style={styles.chartHighlight}>⚠️ Elevated on Thu</Text>
              </View>
              <LineChart
                data={chartData.bloodPressure}
                width={width - 40}
                height={180}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withDots={true}
                withInnerLines={false}
                withOuterLines={true}
                withScrollableDot={false}
                yAxisSuffix=" mmHg"
                fromZero={false}
                segments={5}
              />
            </View>
            
            {/* Heart Rate Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Heart Rate</Text>
                <Text style={styles.chartHighlight}>✅ Within normal range</Text>
              </View>
              <LineChart
                data={chartData.heartRate}
                width={width - 40}
                height={180}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`
                }}
                bezier
                style={styles.chart}
                withDots={true}
                withInnerLines={false}
                withOuterLines={true}
                withScrollableDot={false}
                yAxisSuffix=" bpm"
                fromZero={false}
                segments={5}
              />
            </View>
            
            {/* Glucose Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Glucose</Text>
                <Text style={styles.chartHighlight}>⚠️ Above target on Thu</Text>
              </View>
              <LineChart
                data={chartData.glucose}
                width={width - 40}
                height={180}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`
                }}
                bezier
                style={styles.chart}
                withDots={true}
                withInnerLines={false}
                withOuterLines={true}
                withScrollableDot={false}
                yAxisSuffix=" mg/dL"
                fromZero={false}
                segments={5}
              />
            </View>
          </View>
          
          {/* Anomalies Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="warning" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>Anomaly Summary</Text>
            </View>
            
            <View style={styles.anomalyTable}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, styles.metricColumn]}>Metric</Text>
                <Text style={[styles.tableHeaderCell, styles.anomalyColumn]}>Anomaly</Text>
                <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Date</Text>
                <Text style={[styles.tableHeaderCell, styles.statusColumn]}>Status</Text>
              </View>
              
              {/* Table Body */}
              {anomalies.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.metricColumn]}>{item.metric}</Text>
                  <Text style={[styles.tableCell, styles.anomalyColumn]}>{item.description}</Text>
                  <Text style={[styles.tableCell, styles.dateColumn]}>{item.date}</Text>
                  <Text style={[styles.tableCell, styles.statusColumn]}>
                    {item.status === 'warning' ? '⚠️' : '✅'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Export Button */}
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={shareReport}
          >
            <Icon name="download" size={16} color="#fff" style={styles.exportIcon} />
            <Text style={styles.exportText}>Download PDF</Text>
          </TouchableOpacity>
        </ScrollView>
        
        {renderDatePicker()}
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
  datePickerButton: {
    padding: 5,
  },
  dateRangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dateRangeText: {
    color: '#bbb',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  metricSummaryContainer: {
    paddingHorizontal: 12,
  },
  metricCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
    width: 140,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    color: '#bbb',
    fontSize: 12,
    marginBottom: 4,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  metricUnit: {
    color: '#aaa',
    fontSize: 10,
    marginLeft: 4,
  },
  metricWarning: {
    fontSize: 12,
    marginLeft: 4,
  },
  metricNormal: {
    fontSize: 12,
    marginLeft: 4,
  },
  chartContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chartHighlight: {
    color: '#bbb',
    fontSize: 12,
  },
  chart: {
    borderRadius: 8,
    paddingRight: 16,
  },
  anomalyTable: {
    marginHorizontal: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderCell: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableCell: {
    color: '#ddd',
    fontSize: 12,
  },
  metricColumn: {
    flex: 3,
  },
  anomalyColumn: {
    flex: 4,
  },
  dateColumn: {
    flex: 3,
  },
  statusColumn: {
    flex: 1,
    textAlign: 'center',
  },
  exportButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  exportIcon: {
    marginRight: 8,
  },
  exportText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateOptionSelected: {
    backgroundColor: '#1e88e5',
  },
  dateOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  dateOptionTextSelected: {
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HealthReportsScreen;