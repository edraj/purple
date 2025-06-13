import type { AxiosInstance } from 'axios';
import { UiError, type IClientError } from './error.model';

export const HttpInterctor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(
    function (config) {
      let _m = `Request ${config.method} ${config.url}`;
      if (config.data?.subpath) {
        _m += config.data.subpath;
      }
      if (config.data?.search) {
        _m += config.data.search;
      }
      _debug(config.data, _m, 'p');
      return config;
    },
    function (error) {
      _debug(error, `Request Error ${error.request}`, 'e');
      // WATCH: not sure about it
      const e = UiError(error);
      return Promise.reject(e);
    }
  );
  httpClient.interceptors.response.use(
    function (response) {
      let _m = `${response.config.method.toUpperCase()} ${response.config.url}`;

      if (response.config.data && typeof response.config.data === 'string') {
        const data = JSON.parse(response.config.data);
        if (data.subpath) {
          _m += data.subpath;
        }
        if (data.search) {
          _m += data.search;
        }
      }
      _debug(response.data, _m, 'p');
      return response.data;
    },
    function (error: any) {

      const err: IClientError = {
        code: error.code,
        status: error.status,
        message: error.message,
        request: {
          url: error.response?.config?.url,
          method: error.response?.config?.method,
        },
        response: error.response?.data?.error,
      };

      const e = UiError(err);

      _debug(
        { uiError: e, dmartError: err.response },
        `Response error ${err.code}: ${err.request?.method} ${err.request?.url}`,
        'e'
      );
      return Promise.reject(e);
    }
  );

};
