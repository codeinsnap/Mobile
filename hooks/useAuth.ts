import { AxiosResponse } from 'axios';
import { useState } from 'react';
import apiClient from '@/Utils/clientapi';
import { TUserCredentails } from '@/types/user';

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const signUp = async (user: {firstName: string, lastName: string, email:string, password: string}) => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await apiClient.post<{ token: string; user: TUserCredentails }>(`/auth/signup`, user);
      return response as AxiosResponse;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setApiError(err?.message || 'Something went wrong during Sing-up, Please try again later');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await apiClient.post<{ token: string; user: TUserCredentails }>(`/auth/login`, {
        email,
        password,
      });
      return response as AxiosResponse;
    } catch (err) {
      console.log('err login', err)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setApiError(err?.message || 'Something went wrong during Login, Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return { signUp, login, loading, apiError };
};

export default useAuth;
