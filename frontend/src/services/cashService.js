import api from './api';

export const cashService = {
  getAll: async () => {
    const response = await api.get('/cash');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/cash/${id}`);
    return response.data;
  },

  create: async (transactionData) => {
    const response = await api.post('/cash', transactionData);
    return response.data;
  },

  update: async (id, transactionData) => {
    const response = await api.put(`/cash/${id}`, transactionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/cash/${id}`);
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/cash/summary');
    return response.data;
  }
};