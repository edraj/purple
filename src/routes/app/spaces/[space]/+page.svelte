<script lang="ts">
  import { page } from '$app/state';
  import ResourceList from '$src/components/ResourceList.svelte';
  import { ResourceService } from '$src/services/resource.service';
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

this is only for spacE?!!!!
<div class="container">
  {$nodes.length} nodes in space root noly

  <ResourceList resources={$resources}></ResourceList>
</div>
