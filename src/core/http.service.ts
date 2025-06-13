import { Config } from '$src/config';
import axios from 'axios';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { HttpInterctor } from './http.interceptors';

const httpClient = axios.create({
  baseURL: Config.API.apiRoot,
  timeout: Config.API.queryTimeout
});

AuthInterceptor(httpClient);
HttpInterctor(httpClient);

export default httpClient;
