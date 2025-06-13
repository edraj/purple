

export interface IClientError {
  code: string,
  status: string,
  message: string,
  request?: {
    url: string,
    method: string;
  },
  response: any;
}

export interface IUiError {
  code: number; // dmart error code
  message?: any; // technical as much as possible
  status?: any; // axios status mostly number
  uiCode?: string; // axios codefor client
}

export const UiError = (error: IClientError): IUiError => {
  let e: IUiError = {
    code: 0,
    message: error.message, // fall back all error
    uiCode: 'Unknown',
    status: 0,
  };

  if (error) {
    e.status = error.status;
    e.uiCode = error.code; // axios code
    // look for code inside info
    e.code = error.response?.code || 0;
    let _m = error.response?.type || ''; // validaion
    e.message = _m;
  }
  return e;
};
