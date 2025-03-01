import apiClient from '@/Utils/clientapi';
import { AxiosResponse } from 'axios';
import { useState } from 'react';


// Interface definitions
interface College {
  institute_id: number;
  name: string;
}

interface CollegeNamesResponse {
  code: number;
  success: boolean;
  message: string;
  data: College[];
}

export const useCollege = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollegeNames = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<CollegeNamesResponse>('/college/names');
      return response as AxiosResponse;
    } catch (err) {
      setError('Failed to fetch college names');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchCollegeNames, loading, error };
};
