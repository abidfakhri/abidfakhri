import { apiClient } from '../lib/apiClient.js';

export const skillsApi = {
  list: () => apiClient.get('/skills').then((r) => r.data.data),
};
