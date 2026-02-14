import api from './axios';

export const getNextEntity = async (nodeId: string) => {
  const response = await api.get(`entity/${nodeId}`);

  return response.data;
};
