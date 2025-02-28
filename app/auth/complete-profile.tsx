// EnrollmentForm.tsx
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

interface FormData {
  enrollmentNumber: string;
  collegeName: string;
  semester: number; // Kept as number
  coreField: string;
  dateOfBirth: string;
  mobileNumber?: string;
  otp?: string;
}

interface College {
  id: string;
  name: string;
}

const coreFields = ['IT', 'Computer', 'Mechanical', 'Electrical', 'Civil'];

const CompleteProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    enrollmentNumber: '',
    collegeName: '',
    semester: 1,
    coreField: '',
    dateOfBirth: '',
  });
  const [showVerification, setShowVerification] = useState(false);
  const [collegeSuggestions, setCollegeSuggestions] = useState<College[]>([]);

  const isFormValid = useCallback(() => {
    return (
      formData.enrollmentNumber.length >= 6 &&
      formData.collegeName !== '' &&
      formData.semester > 0 &&
      formData.coreField !== '' &&
      formData.dateOfBirth
    );
  }, [formData]);

  // Updated handleInputChange to handle both string and number values
  const handleInputChange = useCallback((field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'number' ? value : value, // Keep number as-is, string as string
    }));
    if (isFormValid()) {
      setShowVerification(true);
    }
  }, [isFormValid]);

  const searchColleges = useCallback(async (query: string) => {
    try {
      const results = await fetchColleges(query);
      setCollegeSuggestions(results);
    } catch (error) {
      console.error('College search failed:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.titleContainer}>
        <Text style={styles.title}>Join StudyPrep.io</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.formCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enrollment Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your enrollment number"
            value={formData.enrollmentNumber}
            onChangeText={(text) => handleInputChange('enrollmentNumber', text)}
            accessibilityLabel="Enrollment Number"
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>College Name</Text>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            onChangeText={searchColleges}
       
            dataSet={collegeSuggestions.map(college => ({
              id: college.id,
              title: college.name,
            }))}
            textInputProps={{
              placeholder: "Search your college",
              style: styles.input,
            }}
            containerStyle={styles.dropdownContainer}
          />
        </View> */}

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Semester</Text>
          <Picker
            selectedValue={formData.semester}
            onValueChange={(value) => handleInputChange('semester', value as number)} // Explicitly cast as number
            style={styles.picker}
          >
            {[...Array(8)].map((_, i) => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>
        </View> */}
{/* 
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Core Field</Text>
          <Picker
            selectedValue={formData.coreField}
            onValueChange={(value) => handleInputChange('coreField', value as string)} // Explicitly cast as string
            style={styles.picker}
          >
            <Picker.Item label="Select field" value="" />
            {coreFields.map(field => (
              <Picker.Item key={field} label={field} value={field} />
            ))}
          </Picker>
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChangeText={(text) => handleInputChange('dateOfBirth', text)}
            accessibilityLabel="Date of Birth (YYYY-MM-DD)"
          />
        </View>

        {showVerification && (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.verificationSection}>
            <Text style={styles.sectionTitle}>Verify Your Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              onChangeText={(text) => handleInputChange('mobileNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              onChangeText={(text) => handleInputChange('otp', text)}
            />
          </Animated.View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, !isFormValid() && styles.disabledButton]}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Enroll Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// Simulated API call
const fetchColleges = async (query: string): Promise<College[]> => {
  return [
    { id: '1', name: 'Sample College 1' },
    { id: '2', name: 'Sample College 2' },
  ].filter(college => college.name.toLowerCase().includes(query.toLowerCase()));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
  },
  dropdownContainer: {
    zIndex: 1000,
  },
  verificationSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CompleteProfile;