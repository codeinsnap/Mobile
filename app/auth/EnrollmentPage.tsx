import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarIcon, GraduationCap } from "lucide-react-native";
import { useCollege } from "@/hooks/useCollege";
import { useDispatch, useSelector } from "react-redux";
import { setCollegeList } from "@/redux/collegeSlice";
import { TCollegeName } from "@/types/College";
import { TRootState } from "@/redux/store";
import { useTheme } from "@/context/ThemeContext";

interface FormData {
  enrollmentNumber: string;
  collegeName: string;
  currentSemester: string;
  coreField: string;
  dateOfBirth: string;
  mobileNumber?: string;
  otp?: string;
}

const coreFields = [
  { value: "cs", label: "Computer Science" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "ce", label: "Civil Engineering" },
  { value: "it", label: "Information Technology" },
];

const EnrollmentPage: React.FC = () => {
  const { colors } = useTheme();
  const { fetchCollegeNames } = useCollege();
  const { collegeList } = useSelector((state: TRootState) => state.college);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    enrollmentNumber: "",
    collegeName: "",
    currentSemester: "1",
    coreField: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    mobileNumber: "",
    otp: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showMobileSection, setShowMobileSection] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCollegeList = useCallback(() => {
    const list = async () => {
      try {
        const response = await fetchCollegeNames();
        if (response.data.code === 200) {
          dispatch(setCollegeList(response?.data?.data as TCollegeName[]));
        }
      } catch (err) {
        console.error(err);
      }
    };

    list();
  }, [dispatch, fetchCollegeNames]);

  useEffect(() => {
    collegeList?.length === 0 && getCollegeList();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.enrollmentNumber || formData.enrollmentNumber.length < 5) {
      newErrors.enrollmentNumber = "Enrollment number must be at least 5 characters.";
    }
    if (!formData.collegeName) {
      newErrors.collegeName = "Please select a college.";
    }
    const semester = Number(formData.currentSemester);
    if (isNaN(semester) || semester < 1 || semester > 8) {
      newErrors.currentSemester = "Semester must be between 1 and 8.";
    }
    if (!formData.coreField) {
      newErrors.coreField = "Please select your core field.";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select your date of birth.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setShowMobileSection(true);
        setCurrentStep(2);
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Enrollment completed:", formData);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Updated Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <GraduationCap size={32} color="#FFFFFF" style={styles.headerIcon} />
                <View>
                  <Text style={styles.headerMainTitle}>Get Started</Text>
                  <Text style={styles.headerSubtitle}>Enrollment Form</Text>
                </View>
              </View>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepText}>Step {currentStep} of 2</Text>
              </View>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: currentStep === 1 ? "50%" : "100%" }]} />
            </View>

            {/* Form Fields */}
            {!showMobileSection ? (
              <View style={styles.form}>
                <View style={styles.formItem}>
                  <Text style={styles.label}>Enrollment Number</Text>
                  <TextInput style={styles.input} placeholder="Enter your enrollment number" placeholderTextColor="#9CA3AF" keyboardType="number-pad" value={formData.enrollmentNumber} onChangeText={(text) => handleInputChange("enrollmentNumber", text)} />
                  <Text style={styles.description}>Your unique student identification number.</Text>
                  {errors.enrollmentNumber && <Text style={styles.error}>{errors.enrollmentNumber}</Text>}
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.label}>College</Text>
                  {collegeList.length > 0 && (
                    <Dropdown
                      style={styles.dropdown}
                      placeholder="Select your college"
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={collegeList}
                      labelField="label"
                      valueField="value"
                      value={formData.collegeName}
                      onChange={(item) => handleInputChange("collegeName", item.value)}
                    />
                  )}
                  <Text style={styles.description}>The institution where you are currently enrolled.</Text>
                  {errors.collegeName && <Text style={styles.error}>{errors.collegeName}</Text>}
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.label}>Current Semester</Text>
                  <View style={styles.sliderContainer}>
                    <TextInput style={styles.sliderInput} keyboardType="numeric" value={formData.currentSemester} onChangeText={(text) => handleInputChange("currentSemester", text)} />
                    <Text style={styles.sliderValue}>Semester {formData.currentSemester}</Text>
                  </View>
                  <Text style={styles.description}>Your current academic semester (1-8).</Text>
                  {errors.currentSemester && <Text style={styles.error}>{errors.currentSemester}</Text>}
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.label}>Core Field</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholder="Select your core field"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={coreFields}
                    labelField="label"
                    valueField="value"
                    value={formData.coreField}
                    onChange={(item) => handleInputChange("coreField", item.value)}
                  />
                  <Text style={styles.description}>Your primary area of study.</Text>
                  {errors.coreField && <Text style={styles.error}>{errors.coreField}</Text>}
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TouchableOpacity style={styles.dateField}>
                    <Text style={styles.dateText}>{formData.dateOfBirth}</Text>
                    <CalendarIcon size={20} color="#FF7A00" />
                  </TouchableOpacity>

                  <DateTimePicker
                    value={new Date(formData.dateOfBirth)}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    minimumDate={new Date("1900-01-01")}
                    onChange={(event, date) => {
                      if (date) handleInputChange("dateOfBirth", formatDate(date));
                    }}
                  />

                  <Text style={styles.description}>Your date of birth for verification purposes.</Text>
                  {errors.dateOfBirth && <Text style={styles.error}>{errors.dateOfBirth}</Text>}
                </View>
              </View>
            ) : (
              <View style={styles.form}>
                <View style={styles.formItem}>
                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput style={styles.input} placeholder="Enter your mobile number" placeholderTextColor="#9CA3AF" keyboardType="phone-pad" value={formData.mobileNumber} onChangeText={(text) => handleInputChange("mobileNumber", text)} />
                  <Text style={styles.description}>For OTP verification.</Text>
                  {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber}</Text>}
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.label}>OTP</Text>
                  <TextInput style={styles.input} placeholder="Enter OTP" placeholderTextColor="#9CA3AF" keyboardType="numeric" value={formData.otp} onChangeText={(text) => handleInputChange("otp", text)} />
                  <Text style={styles.description}>Enter the code sent to your mobile.</Text>
                  {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
                </View>
              </View>
            )}

            {/* Form Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={[styles.submitButton, isSubmitting && styles.buttonDisabled]} onPress={handleSubmit} disabled={isSubmitting}>
                <Text style={styles.submitButtonText}>{isSubmitting ? "Submitting..." : currentStep === 1 ? "Next" : "Complete"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  header: {
    padding: 24,
    backgroundColor: "#FF7A00",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerMainTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFE0B2",
    fontFamily: "Poppins-Medium",
  },
  stepIndicator: {
    marginTop: 12,
    backgroundColor: "#FFB266",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#FF7A00",
  },
  form: {
    padding: 24,
    gap: 24,
  },
  formItem: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    fontFamily: "Poppins-Medium",
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#FFFFFF",
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9CA3AF",
    fontFamily: "Poppins-Regular",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sliderInput: {
    height: 50,
    width: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF7A00",
    fontFamily: "Poppins-Medium",
  },
  dateField: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Poppins-Regular",
  },
  error: {
    fontSize: 14,
    color: "#EF4444",
    fontFamily: "Poppins-Regular",
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  submitButton: {
    backgroundColor: "#FF7A00",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#FFB266",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});

export default EnrollmentPage;
