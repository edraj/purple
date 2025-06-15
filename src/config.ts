// export config

export const Config = {
  Basic: {
    defaultRoute: '/',
    appRoot: '/app',
    defaultSize: 25,
    defaultDateFormt: 'DD-MM-YYYY',
    defaultUploadSize: 1048576,
    defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
    defaultToastTimeout: 5000,
    lockTimeout: 100,
  },
  Res: {
    // hard coded
    languages: [
      { name: 'en', display: 'English' },
      { name: 'ku', display: 'Kurdi' },
      { name: 'ar', display: 'عربي', isRtl: true }
    ],
    defaultLanguage: 'en',
    cookieName: 'ol-lang',
    Timeout: 365,
  },
  Auth: {
    userAccessKey: 'user',
    redirectKey: 'redirectUrl',
    loginRoute: '/login'
  },
  Cache: {
    Timeout: 24,
    Key: 'purple.cache',
    ResetKey: '20250101',
  },
  API: {
    apiRoot: import.meta.env.VITE_DMART_URL,
    queryTimeout: 3000,
    rootSpace: 'management',
    autoShortname: 'auto',
    defaultSpace: 'maqola',
    contentSpace: 'Public',
    schemaFolder: 'schema', // specially handled
    data: {
      metafile: '/schema/metafile',
    },
    // for special implementations be explicit
    maqola: {
      space: '/maqola',
      records: '/records'
    },
    users: {
      list: '/users'
    },
    auth: {
      login: '/user/login',
      logout: '/user/logout',
      profile: '/user/profile'
    },
    resource: {
      query: '/managed/query',
      publicQuery: '/public/query',
      csv: '/managed/csv',
      space: '/managed/space', // special for creeating space
      request: '/:scope/request',
      // path is optional
      submit: '/public/submit/:space/:path:schema/:subpath',
    },
    entry: {
      existing: '/user/check-existing?:options',
      details: '/:scope/entry/:resource/:space/:subpath/:shortname?:options',
    },
    payload: {
      file: '/:scope/resource_with_payload',
      files: '/:scope/resource_with_payload',
      // schema is optional
      url: '/:scope/payload/:resource/:space/:subpath/:shortname.:schema:ext'
    },
    asset: {
      request: '/managed/data-asset'
    },
    info: {
      health: '/managed/health/:space',
      settings: '/info/settings',
      manifest: '/info/manifest'
    },
    ticket: {
      progress: '/managed/progress-ticket/:space/:subpath/:shortname/:action'
    }

  },
};
