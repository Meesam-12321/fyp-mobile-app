import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppLayout from '../Components/Layout';

const AddReadingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Vitals');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Input states for Vitals
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [spO2, setSpO2] = useState('');
  const [temperature, setTemperature] = useState('');
  const [usesFahrenheit, setUsesFahrenheit] = useState(false);
  const [respiratoryRate, setRespiratoryRate] = useState('');

  // Input states for Lifestyle
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [usesImperial, setUsesImperial] = useState(false);
  const [sleepDuration, setSleepDuration] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [waterIntake, setWaterIntake] = useState('');

  // Input states for Symptoms
  const [symptoms, setSymptoms] = useState({
    dizziness: false,
    chestPain: false,
    nausea: false,
    headache: false,
    fatigue: false,
    shortnessOfBreath: false,
    other: false,
  });
  const [otherSymptom, setOtherSymptom] = useState('');

  const handleSaveReading = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Show success message then navigate back
      setTimeout(() => {
        Alert.alert('Success', 'Reading saved and analyzed.');
        navigation.goBack();
      }, 1000);
    }, 1500);
  };

  const renderVitalsTab = () => (
    <View style={styles.tabContent}>
      {/* Heart Rate */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Heart Rate</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="60-100"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={heartRate}
            onChangeText={setHeartRate}
          />
          <Text style={styles.inputUnit}>bpm</Text>
        </View>
      </View>

      {/* Blood Pressure */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Blood Pressure</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Systolic"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={systolic}
            onChangeText={setSystolic}
          />
          <Text style={[styles.inputUnit, { marginHorizontal: 10 }]}>/</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Diastolic"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={diastolic}
            onChangeText={setDiastolic}
          />
          <Text style={styles.inputUnit}>mmHg</Text>
        </View>
      </View>

      {/* SpO2 */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>SpO2</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="95-100"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={spO2}
            onChangeText={setSpO2}
          />
          <Text style={styles.inputUnit}>%</Text>
        </View>
      </View>

      {/* Temperature */}
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.inputLabel}>Temperature</Text>
          <View style={styles.unitToggle}>
            <Text style={[styles.unitText, !usesFahrenheit && styles.activeUnit]}>°C</Text>
            <Switch
              trackColor={{ false: '#333', true: '#333' }}
              thumbColor={usesFahrenheit ? '#1e88e5' : '#1e88e5'}
              onValueChange={() => setUsesFahrenheit(!usesFahrenheit)}
              value={usesFahrenheit}
            />
            <Text style={[styles.unitText, usesFahrenheit && styles.activeUnit]}>°F</Text>
          </View>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={usesFahrenheit ? "97-99" : "36-37.5"}
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={temperature}
            onChangeText={setTemperature}
          />
          <Text style={styles.inputUnit}>{usesFahrenheit ? '°F' : '°C'}</Text>
        </View>
      </View>

      {/* Respiratory Rate */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Respiratory Rate</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="12-20"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={respiratoryRate}
            onChangeText={setRespiratoryRate}
          />
          <Text style={styles.inputUnit}>breaths/min</Text>
        </View>
      </View>
    </View>
  );

  const renderLifestyleTab = () => (
    <View style={styles.tabContent}>
      {/* Weight and Height */}
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.inputLabel}>Weight & Height</Text>
          <View style={styles.unitToggle}>
            <Text style={[styles.unitText, !usesImperial && styles.activeUnit]}>Metric</Text>
            <Switch
              trackColor={{ false: '#333', true: '#333' }}
              thumbColor={usesImperial ? '#1e88e5' : '#1e88e5'}
              onValueChange={() => setUsesImperial(!usesImperial)}
              value={usesImperial}
            />
            <Text style={[styles.unitText, usesImperial && styles.activeUnit]}>Imperial</Text>
          </View>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Weight"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <Text style={[styles.inputUnit, { marginHorizontal: 8 }]}>{usesImperial ? 'lb' : 'kg'}</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Height"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <Text style={styles.inputUnit}>{usesImperial ? 'in' : 'cm'}</Text>
        </View>
        {/* BMI would be calculated automatically */}
        {weight && height && (
          <Text style={styles.calculatedValue}>
            BMI: {usesImperial 
              ? ((weight / (height * height)) * 703).toFixed(1) 
              : (weight / ((height / 100) * (height / 100))).toFixed(1)}
          </Text>
        )}
      </View>

      {/* Sleep Duration */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Sleep Duration</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="7-9"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={sleepDuration}
            onChangeText={setSleepDuration}
          />
          <Text style={styles.inputUnit}>hours</Text>
        </View>
      </View>

      {/* Activity Level */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Activity Level</Text>
        <View style={styles.activityLevelContainer}>
          {['Sedentary', 'Light', 'Moderate', 'Intense'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.activityLevelButton,
                activityLevel === level && styles.activityLevelActive,
              ]}
              onPress={() => setActivityLevel(level)}
            >
              <Text 
                style={[
                  styles.activityLevelText,
                  activityLevel === level && styles.activityLevelTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Water Intake */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Water Intake</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="2-3"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={waterIntake}
            onChangeText={setWaterIntake}
          />
          <Text style={styles.inputUnit}>{usesImperial ? 'oz' : 'liters'}</Text>
        </View>
      </View>
    </View>
  );

  const renderSymptomsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.symptomsQuestion}>How do you feel today?</Text>
      
      {/* Symptom Toggle Buttons */}
      <View style={styles.symptomsGrid}>
        {Object.keys(symptoms).map(symptom => {
          if (symptom === 'other') return null;
          
          const displayName = symptom
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
            
          return (
            <TouchableOpacity
              key={symptom}
              style={[
                styles.symptomButton,
                symptoms[symptom] && styles.symptomButtonActive,
              ]}
              onPress={() => setSymptoms({...symptoms, [symptom]: !symptoms[symptom]})}
            >
              <Text 
                style={[
                  styles.symptomText,
                  symptoms[symptom] && styles.symptomTextActive,
                ]}
              >
                {displayName}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[
            styles.symptomButton,
            symptoms.other && styles.symptomButtonActive,
          ]}
          onPress={() => setSymptoms({...symptoms, other: !symptoms.other})}
        >
          <Text 
            style={[
              styles.symptomText,
              symptoms.other && styles.symptomTextActive,
            ]}
          >
            Other
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Other Symptom Text Field */}
      {symptoms.other && (
        <View style={styles.otherSymptomContainer}>
          <TextInput
            style={styles.otherSymptomInput}
            placeholder="Describe symptom..."
            placeholderTextColor="#666"
            value={otherSymptom}
            onChangeText={setOtherSymptom}
            multiline
          />
        </View>
      )}
    </View>
  );

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
          <Text style={styles.appBarTitle}>Add Reading</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSelector}>
          {['Vitals', 'Lifestyle', 'Symptoms'].map((tab) => (
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

        {/* Tab Content */}
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {activeTab === 'Vitals' && renderVitalsTab()}
          {activeTab === 'Lifestyle' && renderLifestyleTab()}
          {activeTab === 'Symptoms' && renderSymptomsTab()}
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveReading}
            disabled={loading || success}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : success ? (
              <Icon name="check" size={24} color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Reading</Text>
            )}
          </TouchableOpacity>
        </View>
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
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#1e88e5',
  },
  tabButtonText: {
    color: '#888',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#1e88e5',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    fontSize: 16,
  },
  inputUnit: {
    color: '#888',
    marginLeft: 8,
    fontSize: 14,
  },
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitText: {
    color: '#888',
    fontSize: 12,
    marginHorizontal: 5,
  },
  activeUnit: {
    color: '#1e88e5',
  },
  calculatedValue: {
    color: '#1e88e5',
    marginTop: 8,
    fontSize: 14,
  },
  activityLevelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  activityLevelButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  activityLevelActive: {
    backgroundColor: '#1e88e5',
  },
  activityLevelText: {
    color: '#888',
    fontSize: 14,
  },
  activityLevelTextActive: {
    color: '#fff',
  },
  symptomsQuestion: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '500',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  symptomButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  symptomButtonActive: {
    backgroundColor: '#1e88e5',
  },
  symptomText: {
    color: '#888',
    fontSize: 14,
  },
  symptomTextActive: {
    color: '#fff',
  },
  otherSymptomContainer: {
    marginTop: 10,
  },
  otherSymptomInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddReadingScreen;