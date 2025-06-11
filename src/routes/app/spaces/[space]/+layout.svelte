<script lang="ts">
  import { page } from '$app/state';
  import { displayDate } from '$lib/transform/date';
  import { setContext } from 'svelte';
  import { rootSpaceList } from '../../../../services/space.state.svelte';
  import { translate } from '../../../../utils/resources';
  import SpacePath from './path.svelte';
  import ResourceNodes from './ResourceNodes.svelte';

  const { data, children } = $props();

  const space = rootSpaceList.GetSpace(page.params.space);
  setContext('PathState', data.pathState);
  setContext('TreeState', data.resourceListState);

  data.pathState.SetState({ path: page.url.pathname });

  $effect(() => {
    data.pathState.update({ path: page.url.pathname, params: page.params, source: 'route' });
  });
</script>

<div class="page">
  <div class="container">
    {#if $space}
      <div class="row">
        <div class="c-3">
          <h3 class="f3">{$space.displayname}</h3>
          <div class="spaced">
            {$space.description}
          </div>
          <div class="smaller light spaced">
            {translate('Created', 'Created')}
            {displayDate($space.created)}, <br />
            {translate('Last updated', 'LastUpdated')}
            {displayDate($space.updated)}
          </div>

          <ResourceNodes space={$space.space}></ResourceNodes>
        </div>
        <div class="c-9">
          <SpacePath></SpacePath>

          {@render children()}
        </div>
      </div>
    {/if}
  </div>
</div>
