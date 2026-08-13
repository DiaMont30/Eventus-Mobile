// src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.5:8080'; 

const defaultConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiPublic = axios.create(defaultConfig);

export const apiPrivate = axios.create(defaultConfig);

apiPrivate.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('eventus_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('eventus_token');
    }
    return Promise.reject(error);
  }
);