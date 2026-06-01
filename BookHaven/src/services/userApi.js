import api from './bookApi';

export const getUsers = () => api.get('/users');
export const addUser = (u) => api.post('/users', u);
