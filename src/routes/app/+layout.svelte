<script lang="ts">
  import { goto } from '$app/navigation';
  import { AuthService } from '$src/auth/auth.service.js';
  import { AuthState } from '$src/auth/auth.state';
  import Language from '$src/components/Language.svelte';
  import { Config } from '$src/config';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  let { children, data } = $props();
  const user = AuthState.GetUser();

  const logout = async (e) => {
    e.preventDefault();
    await AuthService.Logout();

    AuthState.Logout();

    goto(routeLink(Config.Auth.loginRoute, true));
  };
</script>

<header>
  <nav>
    <ul class="row boxed">
      <li>
        <a href={routeLink('/spaces')}>{translate('Spaces', 'Spaces')}</a>
      </li>
      <li>
        <a>Analytics</a>
      </li>
      <li>
        <a>Tools</a>
      </li>
      <li class="lauto">
        <a href={routeLink('/account')}>{user.displayname}</a>
        <button onclick={logout} class="btn-fake">Logout</button>
      </li>
      <li>
        <Language></Language>
      </li>
      <li>messages</li>
      <li>notifications</li>
    </ul>
  </nav>
</header>

{@render children()}
