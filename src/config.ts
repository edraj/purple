// export config

export const Config = {
  Basic: {
    defaultRoute: "/app",
    appRoot: "/app",
    defaultSize: 25,
    defaultDateFormt: "DD-MM-YYYY",
    defaultUploadSize: 1048576,
    defaultUploadFormat: ["gif", "jpg", "jpeg", "png"],
    defaultToastTimeout: 5000,
    lockTimeout: 100,
  },
  Res: {
    languages: [
      { name: "en", display: "English" },
      { name: "ar", display: "عربي", isRtl: true }
    ],
    defaultLanguage: "en",
    cookieName: "ol-lang",
    Timeout: 365,
  },
  Auth: {
    userAccessKey: "dmart.user",
    redirectKey: "redirectUrl",
    loginRoute: "/login",
    authUserKey: "authUser",
  },
  Cache: {
    Timeout: 24,
    Key: "dmart.cache",
    ResetKey: "dmart.20250101",
  },
  API: {
    apiRoot: import.meta.env.VITE_DMART_URL, // FIXME: move to environment
    rootPath: '__root__',
    rootSpace: 'management',
    defaultSpace: "maqola",
    contentSpace: "Public",
    records: {
      list: "/records",
    },
  },
};
