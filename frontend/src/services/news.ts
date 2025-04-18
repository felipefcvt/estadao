import api from './api';

export const getAllNews = () => api.get('/news/list-all-news');
export const getNewsById = (id: number) => api.get(`/news/${id}`);
export const createNews = (data: any) => api.post('/news', data);
export const updateNews = (id: number, data: any) => api.put(`/news/${id}`, data);
export const deleteNews = (id: number) => api.delete(`/news/${id}`);
