import {apiClient} from './apiClient';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

// This Api is not working because we nave not implement this 
export const getServices = async (): Promise<Service[]> => {
  const response = await apiClient.get('/api/services');
  return response.data;
};