<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import { routeLink } from '../../../../../utils/route.js';

  const { space } = page.params;

  const { data } = $props();

  // const s = getContext('TreeState') as ResourceListState;
  const resourceList = data.pageResources.stateList$;

  afterNavigate((navigation) => {
    _attn('update');
  });
</script>

{#if $resourceList?.length}
  <h4>{$resourceList.length} resources</h4>
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
      {#each $resourceList as resource}
        <tr>
          <td>
            <a href={routeLink(`/spaces/${space}/${resource.subpath}/${resource.shortname}`)}>{resource.shortname}</a>
          </td>
          <td>{resource.type}</td>
          <td>{resource.schema}</td>
          <td>{resource.created}</td>
          <td>{resource.updated}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
