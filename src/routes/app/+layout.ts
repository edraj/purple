import { AuthState } from '$src/auth/auth.state';
import { Config } from '$src/config';
import { routeLink } from '$utils/route';
import { redirect } from '@sveltejs/kit';
import { DataService } from '../../data/data.service';

export const load = async () => {
  // guard route
  if (!AuthState.currentState) {
    // goto(routeLink(Config.Auth.loginRoute, true));
    redirect(307, routeLink(AuthState.redirectUrl || Config.Basic.defaultRoute, true));
  }

  const s = await DataService.GetSomething();

  return {};
};
