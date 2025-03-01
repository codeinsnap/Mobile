// Types.ts
export interface TEnrollmentForm {
    enrollmentNumber: string;
    collegeName: string;
    currentSemester: number;
    coreField: string;
    dateOfBirth: string;
    mobileNumber?: string; // Optional until OTP section appears
    otp?: string; // Optional until OTP section appears
  }
  
  export interface TCollege {
    id: string;
    name: string;
  }


  export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    otp: string;
    enrollmentNumber: number;
    currentSemester: number;
    collegeName: string;
    dateOfBirth: string | null;
    profilePicture: string | null;
    profileInfoCompleted?: string;
  }
  
  export interface Step1FormValues {
    firstName: string;
    lastName: string;
    email: string;
    enrollmentNumber: number;
    currentSemester: number;
    collegeName: string;
    dateOfBirth: string | null;
  }
  
  export interface Step2FormValues {
    phone: string;
    otp: string;
  }
  
  export interface TUserProfileResponse {
    userId: number;
    firstName: string;
    lastName: string;
    birthDate: string | null;
    enrollmentNumber: string;
    primaryPhone: string;
    secondaryPhone: string;
    semester: number;
    profileInfoCompleted: string;
    picture: string;
    updateTime: string;
    email: string;
    userType: string;
    collegeName?: string;
    createPasswordTrue: boolean;
  }
  