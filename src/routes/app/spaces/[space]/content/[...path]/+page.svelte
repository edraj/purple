<script lang="ts">
  import type { IResource } from '$src/services/resource.model';
  import { type Observable } from 'rxjs';

  const { data } = $props();

  let resource: Observable<IResource> = $derived.by(() => {
    return data.resourceState.stateItem$;
  });
</script>

{#if $resource}
  <div class="spaced">
    <h4>Content</h4>
    {$resource.displayname}

    <h4>Attachments</h4>
    get attachments here and allow management, do we make upload here? or in navigation
  </div>
{/if}
