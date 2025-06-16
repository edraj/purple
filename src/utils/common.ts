

export const toSentenceCase = (s: string) => {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
};

export const _global: any = typeof globalThis !== 'undefined' && globalThis || typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window;

export const setCookie = (key: string, value: string, expires: number) => {

  let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(value) + ';';
  const dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

  cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
  cookieStr += 'path=/;';

  document.cookie = cookieStr;
};

export const getCookie = (key: string) => {

  const keyValue = document.cookie.match('(^|;) ?' + encodeURIComponent(key) + '=([^;]*)(;|$)');
  return keyValue ? decodeURIComponent(keyValue[2]) : null;
};

export const cleanPath = (path: string) => {
  // remove multiple slashes into one
  return path?.replace(/\/+/g, '/');
};

export const getParent = (path: string) => {
  // pop the last part
  return path.split('/').slice(0, -1).join('/');
};
export const generateShortName = (displayname: string) => {
  // replace all non-alphanumeric characters with underscore

  return displayname.replace(/[^\w\s]+|\s+/gi, '_').toLowerCase() + '_' + Date.now();
};


export const GetParamsAsString = (urlParams: any, joinArray = false): string => {
  const s = new URLSearchParams();

  // for every key, if value is undefined, or null, or false, exclude
  Object.keys(urlParams).forEach(n => {
    const v = urlParams[n];
    if (v) {
      if (v instanceof Array) {
        if (v.length) {
          // filter out empty strings
          if (joinArray) {
            const _v = v.filter(x => x && x !== '').join(',');
            if (_v) { s.append(n, _v); }
          } else {
            // lookout for this, it might need an [] in the key
            // append multiple if joinArray is false
            v.filter(x => x !== '').forEach(f => s.append(n, f));
          }
        }
      } else {
        // append key and value
        s.append(n, v);
      }
    }
  });
  return s.toString();

};


export const toFormat = (s: string, ...args: any) => {
  const regExp = /\$(\d+)/gi;
  // match $1 $2 ...
  return s?.replace(regExp, (match, index) => {
    return args[index] ?? match;
  });

};
export const GetMatrixParamsAsString = (urlParams: any): string => {
  // for each urlparam, join with ';'
  let s = '';
  Object.keys(urlParams).forEach(n => {
    const v = urlParams[n];
    if (v) {
      if (v instanceof Array) {
        if (v.length) {
          // filter out empty strings
          v.filter(x => !!x).forEach(f => s += `;${n}=${f}`);
        }
      } else {
        // append key and value
        s += `;${n}=${v}`;
      }
    }
  });
  return s;
};
export const CleanParams = (params: any): any => {
  // remove empty arrays, unidentified, nulls
  const s: any = {};
  Object.keys(params).forEach(n => {
    const v: any = params[n];
    if (v) {
      if (v instanceof Array) {
        if (v.length) {
          // filter out empty strings and join
          const _v: any = v.filter(x => x && x !== '').join(',');
          if (_v) { s[n] = _v; }
        }
      } else {
        // append key and value
        s[n] = v;
      }
    }
  });

  return s;
};


// change api date to javascript date
export const makeDate = (dateString: string): Date | null => {
  // first toJSDate it
  if (dateString) {
    // do check to make sure it is valid date
    if (isNaN(Date.parse(dateString))) { return null; }
    return new Date(dateString);
  }
  return null;
};

export const toISODateString = (date: Date): string => {
  if (!date) { return ''; }
  return date.toISOString().split('T')[0];
};


export const hasMore = (total: number, size: number, currentPage: number): boolean => {

  if (total === 0) { return false; }

  const pages = Math.ceil(total / size);
  if (currentPage === pages) {
    // no more pages
    return false;
  } else {
    // yes more
    return true;
  }
};



export const uuid = (): string => {

  if (window?.crypto) {

    const buf = new Uint32Array(4);
    window.crypto.getRandomValues(buf);
    let idx = -1;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      idx++;
      const r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  } else {

    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
};
