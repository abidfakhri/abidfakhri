import { apiClient } from '../lib/apiClient.js';

export const profileApi = {
  get: () => apiClient.get('/profile').then((r) => r.data.data),
  home: () => apiClient.get('/profile/home').then((r) => r.data.data),
};
