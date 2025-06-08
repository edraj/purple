<script lang="ts">
  import { page } from '$app/state';
  import { displayDate } from '$lib/transform/date';
  import { setContext } from 'svelte';
  import { rootSpaceList } from '../../../../services/space.state.svelte';
  import { translate } from '../../../../utils/resources';
  import { routeLink } from '../../../../utils/route';
  import SpacePath from './path.svelte';
  import ResourceList from './ResourceList.svelte';

  const { data, children }: any = $props();
  // remember to access current page ata: page.data

  const space = rootSpaceList.GetSpace(page.params.space);
  setContext('PathState', data.pathState);
  setContext('TreeState', data.resourceListState);
</script>

<div class="page">
  <div class="container">
    <div class="row">
      <div class="c-3">
        {#if $space}
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

          <ResourceList space={$space.space}></ResourceList>
        {/if}

        <a href={routeLink('/spaces/spacename/resourcename/subpath/shomething')}>Test deep link</a>
      </div>
      <div class="c-9">
        <SpacePath space="$space.space"></SpacePath>

        {@render children()}
        <!-- {#if resources?.length}
          <table class="bordered spacedout">
            <thead>
              <tr>
                <th>shortname</th>
                <th>Resource type</th>
                <th>Schema</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {#each resources as resource}
                <tr>
                  <td>
                    <a href={routeLink(`/spaces/${$space?.shortname}/${resource.shortname}`)}>{resource.shortname}</a>
                  </td>
                  <td>{resource.type}</td>
                  <td>{resource.schema}</td>
                  <td>{resource.created}</td>
                  <td>{resource.updated}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if} -->
      </div>
    </div>
  </div>
</div>
