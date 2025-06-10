<script lang="ts">
  import { page } from '$app/state';
  import { type Observable } from 'rxjs';
  import type { IResource } from '../../../../../../services/resource.model';

  const { data } = $props();
  let resource: Observable<IResource> = $derived.by(() => {
    return data.pageResource.stateItem$;
  });

  const space = $derived.by(() => {
    _attn(data.pageResource.currentItem, 'whats in here');
    return page.params.space;
  });
  const path = $derived(page.params.path);
  const addSomething = () => {
    data.pageResource.update({
      displayname: 'something else',
    });
  };
</script>

{space}/content/{path}

<button class="btn-rev" onclick={addSomething}>add something</button>
{#if $resource}
  <div class="spaced">
    {$resource.displayname}
  </div>
{/if}
