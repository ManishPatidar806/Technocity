import {apiClient, apiClientWithCredentials } from "./apiClient";


export interface Job {
  id: number;
  title: string;
  type:  'INTERNSHIP'|'FULL_TIME';
  location: string;
  experience:string;
  description: string;
  requirements: string;
  responsibilities: string;
  qualifications:string;
  createdAt?: string;
}

export interface Application {
  applicantName: string;
  email: string;
  role: string;
  resumeLink: string;
}

export const getJobs = async (): Promise<Job[]> => {
  const response = await apiClient.get('/api/v1/job');
  console.log(response)
  return response.data;
};

export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
  const response = await apiClientWithCredentials.post('/api/v1/job', job);
  return response.data;
};

export const updateJob = async (id: number, job: Partial<Job>): Promise<Job> => {
  const response = await apiClientWithCredentials.patch(`/api/v1/job/${id}`, job);
  return response.data;
};
export const deleteJob = async (id: Number): Promise<Job> => {
  const response = await apiClientWithCredentials.delete(`/api/v1/job/${id}`);
  return response.data;
};

export const submitApplication = async ( jobId : Number,application: Application): Promise<void> => {
  await apiClient.post(`/api/v1/applicant/${jobId}`, application);
};