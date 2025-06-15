<script lang="ts">
  import { goto } from '$app/navigation';
  import Language from '$src/components/Language.svelte';
  import { routeLink } from '$utils/route';
  import { AuthService } from '../../auth/auth.service.js';
  import { AuthState } from '../../auth/auth.state.js';
  import { Config } from '../../config.js';
  import { translate } from '../../utils/resources.js';

  _seqlog('public layout loaded');

  let { children, data } = $props();
  const pages = data.pages;

  const user = AuthState.GetUser();

  const logout = async (e) => {
    e.preventDefault();
    await AuthService.Logout();
    AuthState.Logout();

    goto(routeLink(Config.Auth.loginRoute, true));
  };
</script>

<header class="header">
  <nav>
    <ul class="boxed row">
      <li>
        <a href={routeLink('/', true)}>{translate('Home', 'HOME')}</a>
      </li>

      {#each pages as item}
        <li>
          <a href={routeLink(`/pages/${item.shortname}`, true)}>
            {item.displayname}
          </a>
        </li>
      {/each}
      <li class="lauto">
        {#if user?.shortname}
          <a href={routeLink(`/account`)}>{user.displayname}</a>
          |
          <a class="smaller" onclick={logout}>({translate('Logout', 'Logout')})</a>
        {:else}
          <a href={routeLink(Config.Auth.loginRoute, true)}>{translate('Login', 'Login')}</a>
        {/if}
      </li>
      <li>
        <Language></Language>
      </li>
    </ul>
  </nav>
</header>

<div class="page">
  <div class="container">
    {@render children()}
  </div>
</div>
