<script lang="ts">
  import { Toast } from '$src/lib/toast/toast.service';
  import { displayDate, relativeTime } from '$src/lib/transform/date';
  import type { IResource } from '$src/services/resource.model';
  import { ResourceService } from '$src/services/resource.service';
  import type { PageResourceListState } from '$src/services/resource.state';
  import type { TreeState } from '$src/services/tree.state';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  import { getContext } from 'svelte';

  const { resources } = $props();
  const folderListState = getContext('FolderListState') as PageResourceListState;
  const treeState = getContext('TreeState') as TreeState;

  const handleDelete = (resource: IResource) => {
    ResourceService.DeleteResource(resource)
      .then((res) => {
        if (res) {
          folderListState.remove(resource);
          // sync tree
          treeState.DeleteFolder(resource);

          Toast.ShowSuccess('DELETED');
        }
      })
      .catch((error) => Toast.HandleUiError(error));
  };
</script>

<table class="bordered spacedout">
  <thead>
    <tr>
      <th>shortname</th>
      <th>Created</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each resources as resource}
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
