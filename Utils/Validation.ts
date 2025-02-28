// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex (min 8 chars, at least 1 letter and 1 number)
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

// Phone number validation regex (simple version)
const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

// Name validation regex (letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-Z\s'-]{2,50}$/;

export interface ValidationError {
  field: string;
  message: string;
}

// Validate email
export const validateEmail = (email: string): ValidationError | null => {
  if (!email) {
    return { field: 'email', message: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }
  
  return null;
};

// Validate password
export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return { 
      field: 'password', 
      message: 'Password must be at least 8 characters with at least one letter and one number' 
    };
  }
  
  return null;
};

// Validate password confirmation
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationError | null => {
  if (!confirmPassword) {
    return { field: 'confirmPassword', message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }
  
  return null;
};

// Validate name
export const validateName = (name: string, fieldName: string): ValidationError | null => {
  if (!name) {
    return { field: fieldName, message: `${fieldName} is required` };
  }
  
  if (!NAME_REGEX.test(name)) {
    return { 
      field: fieldName, 
      message: `${fieldName} must be between 2-50 characters and contain only letters, spaces, hyphens, and apostrophes` 
    };
  }
  
  return null;
};

// Validate phone number
export const validatePhone = (phone: string): ValidationError | null => {
  if (!phone) {
    return { field: 'mobile', message: 'Mobile number is required' };
  }
  
  if (!PHONE_REGEX.test(phone)) {
    return { field: 'mobile', message: 'Please enter a valid mobile number' };
  }
  
  return null;
};

// Validate OTP
export const validateOTP = (otp: string): ValidationError | null => {
  if (!otp) {
    return { field: 'otp', message: 'OTP is required' };
  }
  
  if (!/^\d{4,6}$/.test(otp)) {
    return { field: 'otp', message: 'OTP must be 4-6 digits' };
  }
  
  return null;
};

// Validate college
export const validateCollege = (college: string): ValidationError | null => {
  if (!college) {
    return { field: 'college', message: 'College is required' };
  }
  
  if (college.length < 2) {
    return { field: 'college', message: 'Please enter a valid college name' };
  }
  
  return null;
};

// Validate semester
export const validateSemester = (semester: string): ValidationError | null => {
  if (!semester) {
    return { field: 'semester', message: 'Semester is required' };
  }
  
  if (!/^[1-9]|1[0-2]$/.test(semester)) {
    return { field: 'semester', message: 'Semester must be between 1-12' };
  }
  
  return null;
};

// Login form validation
export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);
  
  return errors;
};

// Signup form validation
export const validateSignupForm = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const firstNameError = validateName(firstName, 'firstName');
  if (firstNameError) errors.push(firstNameError);
  
  const lastNameError = validateName(lastName, 'lastName');
  if (lastNameError) errors.push(lastNameError);
  
  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);
  
  const confirmPasswordError = validatePasswordConfirmation(password, confirmPassword);
  if (confirmPasswordError) errors.push(confirmPasswordError);
  
  return errors;
};

// Complete profile form validation
export const validateProfileForm = (
  college: string,
  semester: string,
  mobile: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const collegeError = validateCollege(college);
  if (collegeError) errors.push(collegeError);
  
  const semesterError = validateSemester(semester);
  if (semesterError) errors.push(semesterError);
  
  const mobileError = validatePhone(mobile);
  if (mobileError) errors.push(mobileError);
  
  return errors;
};