import { AuthState } from '$src/auth/auth.state';
import { Config } from '$src/config';
import { routeLink } from '$utils/route';
import { redirect } from '@sveltejs/kit';
import { DataService } from '../../data/data.service';

export const load = async () => {
  // guard route
  if (!AuthState.currentState) {
    redirect(307, routeLink(Config.Auth.loginRoute, true));
  }

  const s = await DataService.GetSomething();

  return {};
};
