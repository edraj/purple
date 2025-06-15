<script lang="ts">
  import ResourceList from '$src/components/ResourceList.svelte';
  import type { IResource } from '$src/services/resource.model';
  import { type Observable } from 'rxjs';

  const { data } = $props();
  let resources: Observable<IResource[]> = $derived.by(() => {
    return data.folderListState.stateList$;
  });
</script>

{#if $resources?.length}
  <h4>{$resources.length} resources</h4>
  <ResourceList resources={$resources}></ResourceList>
{:else}
  <div class="box box-white txt-c">No resources ... yet.</div>
{/if}
