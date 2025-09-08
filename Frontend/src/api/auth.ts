import {apiClient} from './apiClient';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post('/api/v1/admin/login', credentials);
  return response.data;
};


// we have not implement this api
export const sendContactMessage = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> => {
  await apiClient.post('/api/contact', data);
};