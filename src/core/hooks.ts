import { AuthState } from '$src/auth/auth.state';
import { Config } from '$src/config';
import { Res } from '$utils/resources';
import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
  if (url.pathname.indexOf(Config.Auth.loginRoute) < 0 && url.pathname.indexOf(Config.Basic.appRoot) > -1) {
    AuthState.redirectUrl = url.pathname;
    // catch /en or /ke or /ar and reroute
  }
  return url.pathname.replace(Res.Re, '');
};
