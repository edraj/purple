<script lang="ts">
  import { page } from '$app/state';
  import { EnumResourceType } from '@edraj/tsdmart/client';
  import { type Observable } from 'rxjs';
  import type { IResource } from '../../../../../../services/resource.model';
  import { routeLink } from '../../../../../../utils/route';

  const { data } = $props();
  let resources: Observable<IResource[]> = $derived.by(() => {
    return data.pageResources.stateList$;
  });

  const space = $derived.by(() => {
    _attn(data.pageResources.currentList, 'whats in here');
    return page.params.space;
  });
  const path = $derived(page.params.path);
  const addSomething = () => {
    data.pageResources.add({
      shortname: 'ayyash',
      type: EnumResourceType.folder,
      created: new Date(),
      updated: new Date(),
    });
  };
</script>

here is a folder {space}/folder/{path}
<div class="spaced"></div>
<button class="btn-rev" onclick={addSomething}>add something</button>

{#if $resources?.length}
  <h4>{$resources.length} resources</h4>
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
{/if}
