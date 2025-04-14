import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppLayout from '../Components/Layout';

const AnomaliesScreen = ({ navigation }) => {
  const [dateFilter, setDateFilter] = useState('week');
  const [showResolved, setShowResolved] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  
  // Dummy data for demonstration
  const anomalies = [
    {
      id: '1',
      date: 'Apr 14, 2025',
      time: '08:45 AM',
      type: 'Hypertension',
      metric: 'BP: 145/95 mmHg',
      status: 'Moderate',
      explanation: 'Detected 2 days in a row',
      suggestedAction: 'Consider lifestyle changes or medication adjustment. Schedule follow-up with doctor if persists.',
      triggeringFactors: 'Possible factors: High sodium intake, stress, missed medication',
      relatedMetric: 'BP',
      resolved: false,
    },
    {
      id: '2',
      date: 'Apr 13, 2025',
      time: '11:30 PM',
      type: 'Low Blood Oxygen',
      metric: 'SpO2: 92%',
      status: 'Critical',
      explanation: 'Significant drop during sleep',
      suggestedAction: 'Contact healthcare provider immediately. Consider sleep study for sleep apnea.',
      triggeringFactors: 'May be related to respiratory issues or sleep position',
      relatedMetric: 'SpO2',
      resolved: false,
    },
    {
      id: '3',
      date: 'Apr 12, 2025',
      time: '02:15 PM',
      type: 'Tachycardia',
      metric: 'HR: 115 bpm',
      status: 'Moderate',
      explanation: 'Elevated for 45 minutes',
      suggestedAction: 'Rest and monitor. If recurring with dizziness or chest pain, seek medical attention.',
      triggeringFactors: 'Detected after caffeine consumption and moderate exercise',
      relatedMetric: 'HR',
      resolved: false,
    },
    {
      id: '4',
      date: 'Apr 11, 2025',
      time: '07:20 AM',
      type: 'Hyperglycemia',
      metric: 'Glucose: 182 mg/dL',
      status: 'Moderate',
      explanation: 'Fasting level above normal range',
      suggestedAction: 'Review carbohydrate intake from previous meal. Consider medication timing adjustment.',
      triggeringFactors: 'May be related to late evening snack or medication timing',
      relatedMetric: 'Glucose',
      resolved: false,
    },
    {
      id: '5',
      date: 'Apr 9, 2025',
      time: '10:45 PM',
      type: 'Sleep Disruption',
      metric: 'Sleep: 4.2 hrs',
      status: 'Moderate',
      explanation: 'Below minimum recommended sleep duration',
      suggestedAction: 'Improve sleep hygiene. Limit screen time before bed. Maintain consistent sleep schedule.',
      triggeringFactors: 'Late caffeine intake, screen usage before bed',
      relatedMetric: 'Sleep',
      resolved: true,
    },
    {
      id: '6',
      date: 'Apr 8, 2025',
      time: '09:10 AM',
      type: 'Hypertension',
      metric: 'BP: 150/100 mmHg',
      status: 'Critical',
      explanation: 'Significantly elevated levels',
      suggestedAction: 'Contact your doctor immediately. Take prescribed medication if available.',
      triggeringFactors: 'May be medication related or stress induced',
      relatedMetric: 'BP',
      resolved: true,
    },
  ];

  const filteredAnomalies = anomalies.filter(item => {
    // Apply date filter
    // For a real app, implement proper date filtering
    
    // Apply resolved filter
    if (!showResolved && item.resolved) {
      return false;
    }
    
    return true;
  });

  const toggleExpandItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const markAsReviewed = (id) => {
    // In a real app, update the state or call an API
    console.log(`Item ${id} marked as reviewed`);
    // For demonstration, we could update a local state
    // setAnomalies(anomalies.map(item => item.id === id ? {...item, resolved: true} : item));
  };

  const renderAnomalyItem = ({ item }) => {
    const isExpanded = expandedItem === item.id;
    
    return (
      <TouchableOpacity 
        style={styles.anomalyCard}
        onPress={() => toggleExpandItem(item.id)}
        activeOpacity={0.8}
      >
        {/* Main content always visible */}
        <View style={styles.anomalyHeader}>
          <View style={styles.anomalyMeta}>
            <Text style={styles.anomalyDate}>{item.date} • {item.time}</Text>
            <Text style={styles.anomalyType}>{item.type}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusChip,
              item.status === 'Critical' ? styles.statusCritical : styles.statusModerate
            ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.anomalyMetric}>{item.metric}</Text>
        <Text style={styles.anomalyExplanation}>{item.explanation}</Text>
        
        {/* Expandable content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />
            
            <View style={styles.expandedSection}>
              <Text style={styles.expandedSectionTitle}>Suggested Action</Text>
              <Text style={styles.expandedSectionText}>{item.suggestedAction}</Text>
            </View>
            
            <View style={styles.expandedSection}>
              <Text style={styles.expandedSectionTitle}>Triggering Factors</Text>
              <Text style={styles.expandedSectionText}>{item.triggeringFactors}</Text>
            </View>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('HealthTrends', { statType: item.relatedMetric })}
              >
                <Icon name="trending-up" size={16} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.actionButtonText}>View Trend</Text>
              </TouchableOpacity>
              
              {!item.resolved && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.reviewButton]}
                  onPress={() => markAsReviewed(item.id)}
                >
                  <Icon name="check-circle" size={16} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.actionButtonText}>Mark Reviewed</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        
        <Icon 
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#777"
          style={styles.expandIcon}
        />
      </TouchableOpacity>
    );
  };

  // Date picker modal (simplified, in a real app you would use a proper date picker component)
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
              style={[styles.dateOption, dateFilter === 'week' && styles.dateOptionSelected]}
              onPress={() => {
                setDateFilter('week');
                setDatePickerVisible(false);
              }}
            >
              <Text style={[styles.dateOptionText, dateFilter === 'week' && styles.dateOptionTextSelected]}>Past Week</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dateOption, dateFilter === 'month' && styles.dateOptionSelected]}
              onPress={() => {
                setDateFilter('month');
                setDatePickerVisible(false);
              }}
            >
              <Text style={[styles.dateOptionText, dateFilter === 'month' && styles.dateOptionTextSelected]}>Past Month</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dateOption, dateFilter === 'custom' && styles.dateOptionSelected]}
              onPress={() => {
                setDateFilter('custom');
                setDatePickerVisible(false);
              }}
            >
              <Text style={[styles.dateOptionText, dateFilter === 'custom' && styles.dateOptionTextSelected]}>Custom Range</Text>
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
          <Text style={styles.appBarTitle}>Detected Anomalies</Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setDatePickerVisible(true)}
          >
            <Icon name="filter-list" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Date filter indicator */}
        <View style={styles.dateFilterContainer}>
          <Text style={styles.dateFilterLabel}>
            Showing: {dateFilter === 'week' ? 'Past Week' : dateFilter === 'month' ? 'Past Month' : 'Custom Range'}
          </Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Show resolved</Text>
            <TouchableOpacity
              style={[styles.toggleButton, showResolved && styles.toggleButtonActive]}
              onPress={() => setShowResolved(!showResolved)}
            >
              <View style={[styles.toggleCircle, showResolved && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Anomalies list */}
        {filteredAnomalies.length > 0 ? (
          <FlatList
            data={filteredAnomalies}
            renderItem={renderAnomalyItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="check-circle" size={64} color="#4caf50" />
            <Text style={styles.emptyStateTitle}>All Clear!</Text>
            <Text style={styles.emptyStateText}>No anomalies detected in the selected date range.</Text>
          </View>
        )}
        
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
  filterButton: {
    padding: 5,
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dateFilterLabel: {
    color: '#bbb',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: '#bbb',
    fontSize: 14,
    marginRight: 10,
  },
  toggleButton: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#333',
    justifyContent: 'center',
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#1e88e5',
  },
  toggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#888',
  },
  toggleCircleActive: {
    backgroundColor: '#fff',
    transform: [{ translateX: 18 }],
  },
  listContainer: {
    padding: 16,
  },
  anomalyCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  anomalyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  anomalyMeta: {
    flex: 1,
  },
  anomalyDate: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  anomalyType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusContainer: {
    marginLeft: 8,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusModerate: {
    backgroundColor: '#ff9800',
  },
  statusCritical: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  anomalyMetric: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  anomalyExplanation: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  expandIcon: {
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
  expandedContent: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  expandedSection: {
    marginBottom: 12,
  },
  expandedSectionTitle: {
    color: '#1e88e5',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  expandedSectionText: {
    color: '#bbb',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 10,
  },
  reviewButton: {
    backgroundColor: '#4caf50',
  },
  buttonIcon: {
    marginRight: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
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

export default AnomaliesScreen;