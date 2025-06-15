<script lang="ts">
  import type { IResource } from '$src/services/resource.model';
  import { type Observable } from 'rxjs';
  import { setContext } from 'svelte';

  const { data } = $props();

  let resource: Observable<IResource> = $derived.by(() => {
    return data.pageResource.stateItem$;
  });

  setContext('PageResourceState', data.pageResource);
</script>

{#if $resource}
  <div class="spaced">
    {$resource.displayname}
  </div>
{/if}
