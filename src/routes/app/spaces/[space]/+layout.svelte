<script lang="ts">
  import { page } from '$app/state';
  import { displayDate } from '$lib/transform/date';
  import SpacePath from '$src/components/Path.svelte';
  import ResourceNodes from '$src/components/ResourceNodes.svelte';
  import { rootSpaceList } from '$src/services/space.state';
  import { translate } from '$utils/resources';
  import { setContext } from 'svelte';

  const { data, children } = $props();

  const space = rootSpaceList.GetSpace(page.params.space);
  setContext('PathState', data.pathState);
  setContext('TreeState', data.treeState);
  setContext('FolderListState', data.folderListState);
  setContext('ResourceState', data.resourceState);

  data.pathState.SetState({ path: page.url.pathname });

  // dosomething, watch inner params page.svelte, to access state
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
