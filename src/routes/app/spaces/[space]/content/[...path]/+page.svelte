<script lang="ts">
  import { type Observable } from 'rxjs';
  import type { IResource } from '../../../../../../services/resource.model';

  const { data } = $props();
  let resource: Observable<IResource> = $derived.by(() => {
    return data.pageResource.stateItem$;
  });

  const addSomething = () => {
    data.pageResource.update({
      displayname: 'something else',
    });
  };
</script>

<button class="btn-rev" onclick={addSomething}>add something</button>
{#if $resource}
  <div class="spaced">
    {$resource.displayname}
  </div>
{/if}
