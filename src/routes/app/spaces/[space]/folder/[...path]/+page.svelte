<script lang="ts">
  import { Toast } from '$src/lib/toast/toast.service.js';
  import { displayDate, relativeTime } from '$src/lib/transform/date';
  import type { IResource } from '$src/services/resource.model';
  import { ResourceService } from '$src/services/resource.service.js';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import { translate } from '$utils/resources.js';
  import { routeLink } from '$utils/route';
  import { type Observable } from 'rxjs';

  const { data } = $props();
  let resources: Observable<IResource[]> = $derived.by(() => {
    return data.folderListState.stateList$;
  });

  const handleDelete = async (resource: IResource) => {
    const res = await ResourceService.DeleteResource(resource);
    if (res) {
      data.folderListState.remove(resource);
      Toast.ShowSuccess('DELETED');
    }
  };
</script>

{#if $resources?.length}
  <h4>{$resources.length} resources</h4>
  <table class="bordered spacedout">
    <thead>
      <tr>
        <th>shortname</th>
        <th>Created</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each $resources as resource}
        <tr>
          <td>
            <div>
              <i class="liga">{resource.type === EnumResourceType.folder ? 'folder' : 'template'}</i>
              <a href={routeLink(`/spaces/${resource.path}`)}>{resource.shortname}</a>
            </div>
            {#if resource.schema}
              <div class="label label-grey-dark smaller">{resource.schema}</div>
            {/if}
          </td>
          <td
            >{displayDate(resource.created, true)}

            <div class="smaller">
              {translate('Last updated', 'LastUpdated')}
              {relativeTime(resource.updated)}
            </div>
          </td>
          <td>
            <button class="btn-fake" onclick={() => handleDelete(resource)}><i class="liga">delete</i></button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <div class="box box-white txt-c">No resources ... yet.</div>
{/if}
