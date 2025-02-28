export type TUserSliceInitailState = {
    user?: TUserCredentails;
  };
  
  export type TUserCredentails = {
    firstName: string;
    lastName: string;
    email: string;
    userId: number;
    birthDate: string | null;
    enrollmentNumber: string | null;
    password: string | null;
    picture: string | null;
    favourites: string | null; // based on the future decisions we add type of it.
    subscription: 'FREE' | 'STANDARD' | 'PREMIUM';
    create_time: Date;
    update_time: Date;
    userType: string;
    profileInfoCompleted: string;
    exp: number;
    createPasswordTrue: boolean;
    confirmPassword?: string; //optional, remove it later
  };
  