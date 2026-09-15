import { apiClient } from '../lib/apiClient.js';

export const dashboardApi = {
  home: () => apiClient.get('/dashboard/home').then((r) => r.data.data),
};
