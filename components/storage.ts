import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Local storage implementation for web platform
class WebStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  async deleteItemAsync(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
}

// Use SecureStore on native platforms, WebStorage on web
const storage = Platform.OS === 'web' ? new WebStorage() : SecureStore;

export default storage;