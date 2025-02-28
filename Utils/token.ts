import storage from "@/components/storage";
import { TUserCredentails } from "@/types/user";
import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = () => {
    const token = storage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded: TUserCredentails = jwtDecode(token as string);
      return decoded; // Return decoded user data
    } catch (error) {
      console.error('Invalid token', error);
      localStorage.removeItem('token');
      return null;
    }
  };