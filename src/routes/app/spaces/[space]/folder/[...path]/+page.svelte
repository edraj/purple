<script lang="ts">
  import type { IResource } from '$src/services/resource.model';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import { routeLink } from '$utils/route';
  import { type Observable } from 'rxjs';

  const { data } = $props();
  let resources: Observable<IResource[]> = $derived.by(() => {
    return data.pageResources.stateList$;
  });

  const addSomething = () => {
    data.pageResources.add({
      shortname: 'ayyash',
      type: EnumResourceType.folder,
      created: new Date(),
      updated: new Date(),
    });
  };
</script>

<div class="spaced">
  <button class="btn-rev btn-small" onclick={addSomething}>add something</button>
</div>

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
