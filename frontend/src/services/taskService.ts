import api from './api';

export const getTasks = (page: number, limit: number) => api.get(`/tasks?page=${page}&limit=${limit}`);
export const createTask = (data: any) => api.post('/tasks', data);
export const updateTask = (id: number, data: any) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);
export const toggleTask = (id: number) => api.patch(`/tasks/${id}/toggle`);