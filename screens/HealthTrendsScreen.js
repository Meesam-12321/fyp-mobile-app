import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import AppLayout from '../Components/Layout';

const HealthTrendsScreen = ({ navigation, route }) => {
  // Default to first tab or passed param
  const initialTab = route.params?.statType || 'BP';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [dateRange, setDateRange] = useState(7); // 7, 30, or 90 days
  const [showAnomaliesOnly, setShowAnomaliesOnly] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('All');

  // Dummy data for demonstration
  const getData = () => {
    const today = new Date();
    const labels = [];
    const dataPoints = [];
    const anomalies = [];

    // Generate dates for x-axis
    for (let i = dateRange - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }

    // Generate data based on active tab
    switch (activeTab) {
      case 'BP':
        return {
          labels,
          systolic: Array.from({ length: dateRange }, () => Math.floor(Math.random() * 30) + 110),
          diastolic: Array.from({ length: dateRange }, () => Math.floor(Math.random() * 20) + 70),
          anomalies: [3, 5], // Indices where anomalies occur
          unit: 'mmHg',
          avgSystolic: 125,
          avgDiastolic: 82,
          anomalyCount: 2,
        };
      case 'HR':
        return {
          labels,
          datasets: [
            {
              data: Array.from({ length: dateRange }, () => Math.floor(Math.random() * 25) + 65),
            },
          ],
          anomalies: [1], // Indices where anomalies occur
          unit: 'bpm',
          avg: 72,
          anomalyCount: 1,
        };
      case 'SpO2':
        return {
          labels,
          datasets: [
            {
              data: Array.from({ length: dateRange }, () => Math.floor(Math.random() * 4) + 95),
            },
          ],
          anomalies: [4], // Indices where anomalies occur
          unit: '%',
          avg: 97,
          anomalyCount: 1,
        };
      case 'Glucose':
        return {
          labels,
          datasets: [
            {
              data: Array.from({ length: dateRange }, () => Math.floor(Math.random() * 30) + 90),
            },
          ],
          anomalies: [2, 6], // Indices where anomalies occur
          unit: 'mg/dL',
          avg: 105,
          anomalyCount: 2,
        };
      case 'Sleep':
        return {
          labels,
          datasets: [
            {
              data: Array.from({ length: dateRange }, () => (Math.random() * 4) + 5),
            },
          ],
          anomalies: [0], // Indices where anomalies occur
          unit: 'hrs',
          avg: 6.7,
          anomalyCount: 1,
        };
      default:
        return {
          labels,
          datasets: [
            {
              data: Array.from({ length: dateRange }, () => Math.floor(Math.random() * 25) + 65),
            },
          ],
          anomalies: [1], // Indices where anomalies occur
          unit: 'bpm',
          avg: 72,
          anomalyCount: 1,
        };
    }
  };

  const chartData = getData();

  const renderChart = () => {
    const screenWidth = Dimensions.get('window').width - 40;
    
    // For BP which has two datasets
    if (activeTab === 'BP') {
      const bpData = {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.systolic,
            color: () => '#f44336', // Red for systolic
            strokeWidth: 2,
          },
          {
            data: chartData.diastolic,
            color: () => '#1e88e5', // Blue for diastolic
            strokeWidth: 2,
          },
        ],
        legend: ['Systolic', 'Diastolic'],
      };

      return (
        <View style={styles.chartContainer}>
          <LineChart
            data={bpData}
            width={screenWidth}
            height={220}
            yAxisSuffix={` ${chartData.unit}`}
            chartConfig={{
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
                strokeWidth: '2',
              },
            }}
            bezier
            style={styles.chart}
          />
          
          {/* Anomaly markers */}
          {chartData.anomalies.map((index) => (
            <View 
              key={index} 
              style={[
                styles.anomalyMarker, 
                { 
                  left: (index / (chartData.labels.length - 1)) * screenWidth + 20,
                }
              ]}
            >
              <Icon name="warning" size={20} color="#ffb300" />
            </View>
          ))}
        </View>
      );
    }
    
    // For other tabs with single dataset
    const data = {
      labels: chartData.labels,
      datasets: chartData.datasets,
      legend: [activeTab],
    };

    return (
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          yAxisSuffix={` ${chartData.unit}`}
          chartConfig={{
            backgroundColor: '#1e1e1e',
            backgroundGradientFrom: '#1e1e1e',
            backgroundGradientTo: '#1e1e1e',
            decimalPlaces: activeTab === 'Sleep' ? 1 : 0,
            color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#1e88e5',
            },
          }}
          bezier
          style={styles.chart}
        />
        
        {/* Anomaly markers */}
        {chartData.anomalies.map((index) => (
          <View 
            key={index} 
            style={[
              styles.anomalyMarker, 
              { 
                left: (index / (chartData.labels.length - 1)) * screenWidth + 20,
              }
            ]}
          >
            <Icon name="warning" size={20} color="#ffb300" />
          </View>
        ))}
      </View>
    );
  };

  const renderTrendSummary = () => {
    if (activeTab === 'BP') {
      return (
        <View style={styles.trendSummaryContainer}>
          <Text style={styles.trendSummaryTitle}>Trend Summary</Text>
          <Text style={styles.trendSummaryText}>
            Avg BP: {chartData.avgSystolic}/{chartData.avgDiastolic} {chartData.unit} — slightly elevated
          </Text>
          <Text style={styles.trendSummaryText}>
            BP above normal on {chartData.anomalyCount} of last {dateRange} days
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.trendSummaryContainer}>
        <Text style={styles.trendSummaryTitle}>Trend Summary</Text>
        <Text style={styles.trendSummaryText}>
          Avg {activeTab}: {chartData.avg} {chartData.unit} — normal range
        </Text>
        <Text style={styles.trendSummaryText}>
          {chartData.anomalyCount} anomalies detected in the last {dateRange} days
        </Text>
      </View>
    );
  };

  const renderFilter = () => {
    return (
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Show anomalies only</Text>
          <Switch
            trackColor={{ false: '#333', true: '#1e88e5' }}
            thumbColor="#fff"
            onValueChange={() => setShowAnomaliesOnly(!showAnomaliesOnly)}
            value={showAnomaliesOnly}
          />
        </View>
        
        {activeTab === 'All' && (
          <View style={styles.metricSelector}>
            <Text style={styles.filterLabel}>Metric</Text>
            <View style={styles.metricButtonsContainer}>
              {['HR', 'BP', 'SpO2', 'Glucose', 'Sleep'].map((metric) => (
                <TouchableOpacity
                  key={metric}
                  style={[
                    styles.metricButton,
                    selectedMetric === metric && styles.metricButtonActive,
                  ]}
                  onPress={() => setSelectedMetric(metric)}
                >
                  <Text 
                    style={[
                      styles.metricButtonText,
                      selectedMetric === metric && styles.metricButtonTextActive,
                    ]}
                  >
                    {metric}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
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
          <Text style={styles.appBarTitle}>Health Trends</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Tab Selector */}
        <ScrollView 
          horizontal 
          style={styles.tabScroll} 
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.tabSelector}>
            {['BP', 'HR', 'SpO2', 'Glucose', 'Sleep', 'All'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text 
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.activeTabButtonText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {/* Date Range Selector */}
          <View style={styles.dateRangeSelector}>
            {[7, 30, 90].map((days) => (
              <TouchableOpacity
                key={days}
                style={[
                  styles.dateRangeButton,
                  dateRange === days && styles.activeDateRangeButton,
                ]}
                onPress={() => setDateRange(days)}
              >
                <Text 
                  style={[
                    styles.dateRangeButtonText,
                    dateRange === days && styles.activeDateRangeButtonText,
                  ]}
                >
                  {days} days
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Chart */}
          {renderChart()}

          {/* Trend Summary */}
          {renderTrendSummary()}

          {/* Filter */}
          {renderFilter()}
        </ScrollView>
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
  tabScroll: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
  },
  tabSelector: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  activeTabButton: {
    backgroundColor: '#1e88e5',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateRangeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    marginRight: 10,
  },
  activeDateRangeButton: {
    backgroundColor: '#1e88e5',
  },
  dateRangeButtonText: {
    color: '#888',
    fontSize: 14,
  },
  activeDateRangeButtonText: {
    color: '#fff',
  },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  anomalyMarker: {
    position: 'absolute',
    top: 10,
  },
  trendSummaryContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  trendSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  trendSummaryText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  filterContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    color: '#fff',
  },
  metricSelector: {
    marginTop: 10,
  },
  metricButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  metricButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  metricButtonActive: {
    backgroundColor: '#1e88e5',
  },
  metricButtonText: {
    color: '#888',
    fontSize: 12,
  },
  metricButtonTextActive: {
    color: '#fff',
  },
});

export default HealthTrendsScreen;