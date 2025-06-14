<script lang="ts">
  import { page } from '$app/state';
  import { ResourceService } from '$src/services/resource.service';
  import { routeLink } from '$utils/route';
  import { defer, map } from 'rxjs';

  const { space } = page.params;

  const { data } = $props();

  const nodes = data.treeState.stateList$.pipe(map((n) => n.filter((f) => f.parentId === space)));

  // get all list from sevice again
  const resources = defer(() =>
    ResourceService.GetResources({
      space,
      exactPath: true,
    }),
  );
</script>

<div class="container">
  {$nodes.length} nodes in space root noly
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
