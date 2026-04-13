import api from './axios';

export const getNextEntity = async (nodeId: string) => {
  const response = await api.get(`api/entities/${nodeId}`);

  return response.data;
};
