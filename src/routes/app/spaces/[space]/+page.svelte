<script lang="ts">
  import { page } from '$app/state';
  import { defer, map } from 'rxjs';
  import { getContext } from 'svelte';
  import { ResourceService } from '../../../../services/resource.service';
  import type { ResourceListState } from '../../../../services/tree.state.svelte';
  import { routeLink } from '../../../../utils/route';

  const { space } = page.params;

  const treeState = getContext('TreeState') as ResourceListState;
  const nodes = treeState.stateList$.pipe(map((n) => n.filter((f) => f.parentId === space)));

  // get all list from sevice again
  const resources = defer(() =>
    ResourceService.GetResources({
      space,
      exactPath: true,
    }),
  );
</script>

<div class="container">
  here is the space page, why is ...resources kicking off? // show only root level here, the on page change change what
  is displayed
  {$nodes.length}
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
      {#each $resources as resource}
        <tr>
          <td>
            <a href={routeLink(`/spaces/${resource.path}`)}>{resource.shortname}</a>
          </td>
          <td>{resource.type}</td>
          <td>{resource.schema}</td>
          <td>{resource.created}</td>
          <td>{resource.updated}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
