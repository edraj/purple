import { AuthState } from '$src/auth/auth.state';

export const ssr = false;

export async function load() {
  _seqlog('Root layout load');

  return {
    authUser: AuthState.currentState
  };
}
