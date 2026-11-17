import api from './api';

export const adminService = {
  async getStats() {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  async getRegistrations(params = {}) {
    const response = await api.get('/admin/registrations', { params });
    return response.data;
  },

  async updateRegistrationStatus(id, status) {
    const response = await api.patch(`/admin/registrations/${id}/status`, { status });
    return response.data;
  }
};
