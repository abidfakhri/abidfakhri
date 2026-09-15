import { apiClient } from '../lib/apiClient.js';

export const projectsApi = {
  list: (status) => apiClient.get('/projects', { params: status ? { status } : {} }).then((r) => r.data.data),
  get: (id) => apiClient.get(`/projects/${id}`).then((r) => r.data.data),
};
