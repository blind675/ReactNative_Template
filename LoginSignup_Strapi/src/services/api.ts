import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {UserLoginData, UserRegisterData, UserResponse} from '../types/user';
import {Storage} from './storage';

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: Storage.isTokenSet ? `Bearer ${Storage.getToken()}` : '',
  },
});

const getUser = async () => {
  try {
    const response = await apiClient.get<UserResponse>('/users/me');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const loginUser = async (userLoginData: UserLoginData) => {
  try {
    const response = await apiClient.post<UserResponse>('/auth/local', userLoginData);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const registerUser = async (userRegisterData: UserRegisterData) => {
  try {
    const response = await apiClient.post<UserResponse>('/auth/local/register', userRegisterData);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const apiCalls = {
  queries: {
    getUser,
  },
  mutations: {
    loginUser,
    registerUser,
  },
};

export default apiCalls;
