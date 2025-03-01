import storage from '@/components/storage';
import { FormValues, TUserProfileResponse } from '@/types/completeProfile';
import apiClient from '@/Utils/clientapi';
import { router } from 'expo-router';
import { useState } from 'react';

export const useUserProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateUserProfileInfo = async (userProfile: FormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await apiClient.put(`/profile/updateUser`, userProfile);
      setSuccess(true);
      return response?.data;
    } catch (err) {
      setError('Error while posting data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await apiClient.get(`/profile/getUser`);
      setSuccess(true);
      return response
    } catch (err) {
      setError('Error while fetching user data');
      storage.deleteItemAsync('token');
      router.replace('/auth/login')
    } finally {
      setLoading(false);
    }
  };

  return { getUser, updateUserProfileInfo, loading, error, success };
};