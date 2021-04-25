import axios from 'axios';

import { API_HOST } from './configData.json';

export const apiClient = axios.create({
    baseURL: API_HOST,
    responseType: 'json',
});
