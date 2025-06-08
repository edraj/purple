import { goto } from '$app/navigation';
import { AuthState } from '$src/auth/auth.state';
import { Config } from '$src/config';
import { routeLink } from '$utils/route';

export const load = async () => {
  // guard route
  if (!AuthState.currentState) {
    goto(routeLink(Config.Auth.loginRoute, true));
  }

  return {};
};
