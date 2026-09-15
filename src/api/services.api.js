import { apiClient } from '../lib/apiClient.js';

export const servicesApi = {
  list: () => apiClient.get('/services').then((r) => r.data.data),
  get: (id) => apiClient.get(`/services/${id}`).then((r) => r.data.data),
};
