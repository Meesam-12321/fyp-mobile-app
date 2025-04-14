import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HealthIcon from 'react-native-vector-icons/FontAwesome5';
import AppLayout from '../Components/Layout';

const AIHealthSummaryScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [typingText, setTypingText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  
  const fullText = "Over the past 3 days, your blood pressure has been in the elevated range, averaging 135/88 mmHg. Your sleep duration is below your target of 7 hours, with an average of 5.8 hours. Heart rate and glucose levels are within normal ranges. Based on your recent activity patterns, you're 25% less active than your monthly average.";
  
  const fadeAnim = new Animated.Value(0);
  
  // Mock data for the summary
  const mockSummaryData = {
    lastUpdated: "April 14, 2025, 10:30 AM",
    observations: [
      { id: '1', icon: '🔴', text: 'Blood pressure consistently elevated', severity: 'high' },
      { id: '2', icon: '🟡', text: 'Sleep duration below recommended levels', severity: 'medium' },
      { id: '3', icon: '🟡', text: 'Physical activity decreased by 25%', severity: 'medium' },
      { id: '4', icon: '🟢', text: 'Resting heart rate within healthy range', severity: 'low' },
      { id: '5', icon: '🟢', text: 'Glucose levels stable', severity: 'low' }
    ],
    recommendations: [
      { id: '1', text: 'Reduce sodium intake to help lower blood pressure' },
      { id: '2', text: 'Aim for consistent sleep and wake times to improve sleep quality' },
      { id: '3', text: 'Increase daily step count by 2,000 steps' },
      { id: '4', text: 'Continue hydrating well - current intake is optimal' },
      { id: '5', text: 'Consider meditation to help manage stress levels' }
    ],
    tipOfTheDay: {
      title: 'Mindful Breathing',
      content: 'Try the 4-7-8 breathing technique to reduce stress: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times when feeling stressed or before bed.'
    }
  };

  // Loading animation with dots
  useEffect(() => {
    if (isLoading) {
      const dotsInterval = setInterval(() => {
        setLoadingDots(prev => {
          if (prev.length >= 3) return '';
          return prev + '.';
        });
      }, 500);
      
      return () => clearInterval(dotsInterval);
    }
  }, [isLoading]);

  useEffect(() => {
    // Simulate loading the data
    const timer = setTimeout(() => {
      setSummary(mockSummaryData);
      setIsLoading(false);
      startTypingAnimation();
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const startTypingAnimation = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 30);
  };
  
  const regenerateSummary = () => {
    setRefreshing(true);
    setTypingComplete(false);
    setTypingText('');
    
    // Simulate regenerating content
    setTimeout(() => {
      startTypingAnimation();
      setRefreshing(false);
    }, 1500);
  };
  
  const shareReport = async () => {
    try {
      const result = await Share.share({
        message: 'Health AI Summary Report',
        title: 'Your Health AI Summary - ' + new Date().toLocaleDateString(),
        url: 'healthapp://summary'
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <AppLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <View style={styles.pulsingCircle}>
            <Icon name="healing" size={40} color="#1e88e5" />
          </View>
          <Text style={styles.loadingText}>Analyzing your health data{loadingDots}</Text>
        </View>
      </AppLayout>
    );
  }

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
          <Text style={styles.appBarTitle}>Your AI Health Summary</Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={shareReport}
          >
            <Icon name="share" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Last updated info */}
          <View style={styles.lastUpdatedContainer}>
            <Icon name="access-time" size={14} color="#aaa" />
            <Text style={styles.lastUpdatedText}>Last updated: {summary.lastUpdated}</Text>
          </View>
          
          {/* Summary Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="assessment" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>Summary</Text>
            </View>
            <View style={styles.summaryCard}>
              <View style={styles.aiIndicator}>
                <Icon name="smart-toy" size={18} color="#1e88e5" />
                <View style={[styles.blinkingDot, typingComplete ? {} : styles.blinking]} />
              </View>
              <Text style={styles.summaryText}>{typingText}</Text>
              {!typingComplete && <Text style={[styles.summaryTextCursor, styles.blinking]}>|</Text>}
            </View>
          </View>
          
          {/* What We Noticed Section */}
          <Animated.View 
            style={[
              styles.section, 
              { opacity: typingComplete ? fadeAnim : 0.5 }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Icon name="visibility" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>What We Noticed</Text>
            </View>
            <View style={styles.observationsCard}>
              {summary.observations.map((item) => (
                <View key={item.id} style={styles.observationItem}>
                  <Text style={styles.observationIcon}>{item.icon}</Text>
                  <Text style={[
                    styles.observationText,
                    item.severity === 'high' ? styles.textHigh : 
                    item.severity === 'medium' ? styles.textMedium : 
                    styles.textLow
                  ]}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
          
          {/* Recommendations Section */}
          <Animated.View 
            style={[
              styles.section, 
              { opacity: typingComplete ? fadeAnim : 0.5 }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Icon name="lightbulb" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>Recommendations</Text>
            </View>
            <View style={styles.recommendationsCard}>
              {summary.recommendations.map((item) => (
                <View key={item.id} style={styles.recommendationItem}>
                  <Icon name="check-circle" size={16} color="#4caf50" style={styles.recommendationIcon} />
                  <Text style={styles.recommendationText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
          
          {/* Tip of the Day Section */}
          <Animated.View 
            style={[
              styles.section, 
              { opacity: typingComplete ? fadeAnim : 0.5 }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Icon name="tips-and-updates" size={20} color="#1e88e5" />
              <Text style={styles.sectionTitle}>Tip of the Day</Text>
            </View>
            <View style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <HealthIcon name="brain" size={20} color="#fff" />
                <Text style={styles.tipTitle}>{summary.tipOfTheDay.title}</Text>
              </View>
              <Text style={styles.tipContent}>{summary.tipOfTheDay.content}</Text>
            </View>
          </Animated.View>
          
          {/* Regenerate Button */}
          <TouchableOpacity 
            style={styles.regenerateButton}
            onPress={regenerateSummary}
            disabled={refreshing}
          >
            {refreshing ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Icon name="refresh" size={16} color="#fff" style={styles.regenerateIcon} />
                <Text style={styles.regenerateText}>Regenerate Summary</Text>
              </>
            )}
          </TouchableOpacity>
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
  shareButton: {
    padding: 5, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 40,
  },
  pulsingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(30, 136, 229, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(30, 136, 229, 0.5)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  lastUpdatedText: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  summaryCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  blinkingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1e88e5',
    marginLeft: 6,
  },
  blinking: {
    opacity: 1,
    // Note: In a real app, you would use Animated.timing for this
    // But for simplicity, we're using the CSS animation
  },
  summaryText: {
    color: '#ddd',
    fontSize: 15,
    lineHeight: 22,
  },
  summaryTextCursor: {
    color: '#1e88e5',
    fontWeight: 'bold',
  },
  observationsCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
  },
  observationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  observationIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  observationText: {
    color: '#ddd',
    fontSize: 14,
    flex: 1,
  },
  textHigh: {
    color: '#f44336',
  },
  textMedium: {
    color: '#ff9800',
  },
  textLow: {
    color: '#4caf50',
  },
  recommendationsCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    color: '#ddd',
    fontSize: 14,
    flex: 1,
  },
  tipCard: {
    backgroundColor: '#1e3a64',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#1e88e5',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tipContent: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },
  regenerateButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  regenerateIcon: {
    marginRight: 8,
  },
  regenerateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AIHealthSummaryScreen;