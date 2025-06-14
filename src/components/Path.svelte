<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ContentDialog from '$src/components/Content.dialog.svelte';
  import FolderDialog from '$src/components/Folder.dialog.svelte';
  import { Dialog } from '$src/lib/dialog/service.svelte';
  import { Toast } from '$src/lib/toast/toast.service';
  import type { IPath, PathState } from '$src/services/path.state';
  import type { IResource } from '$src/services/resource.model';
  import { ResourceService } from '$src/services/resource.service';
  import type { PageResourceListState } from '$src/services/resource.state';
  import type { TreeState } from '$src/services/tree.state';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  import { getContext } from 'svelte';

  const treeState = getContext('TreeState') as TreeState;
  const pathState = getContext('PathState') as PathState;
  const folderListState = getContext('FolderListState') as PageResourceListState;
  const pathItem = pathState.stateItem$;

  $effect(() => {
    pathState.updatePath(page.url.pathname, page.params, page.route.id);
  });

  const addFolder = (path: IPath) => {
    // open dialog here
    Dialog.open(FolderDialog, {
      title: translate('Add new Folder', 'ADD_NEW_FOLDER'),
      css: 'modal-half-screen animate fromend',
      // FIXME: do i need type?
      data: { mode: { forNew: true }, type: EnumResourceType.folder },
      onclose: async (resource: IResource) => {
        if (!resource) return;

        // gather information about resource then add
        try {
          const _resource = await ResourceService.CreateResource({
            ...resource,
            subpath: path.params.path,
            space: path.params.space,
            type: EnumResourceType.folder,
          });

          // add to tree
          treeState.AddFolder(_resource, path.params.path);
          // add to state
          folderListState.add(_resource);

          Toast.ShowSuccess('DONE');
        } catch (e) {
          Toast.HandleUiError(e);
        }
      },
    });
  };

  const addContent = (path: IPath) => {
    // open dialog here
    Dialog.open(ContentDialog, {
      title: translate('Add new content', 'ADD_NEW_CONTENT'),
      css: 'modal-half-screen animate fromend',
      // FIXME: do i need type?
      data: { mode: { forNew: true }, type: EnumResourceType.content },
      onclose: async (resource: IResource) => {
        if (!resource) return;

        try {
          const _resource = await ResourceService.CreateResource({
            ...resource,
            subpath: path.params.path,
            space: path.params.space,
            type: EnumResourceType.content,
          });

          // add to tree
          // TODO: id rather not goto a folder page, only a content page
          // treeState.AddFolder(_resource, path.params.path);
          goto(routeLink(`/spaces/${_resource.path}`));

          Toast.ShowSuccess('DONE');
        } catch (e) {
          Toast.HandleUiError(e);
        }
      },
    });
  };
</script>

{#if $pathItem}
  <div class="small spaced">
    <a href={routeLink(`/spaces/${$pathItem.params?.space}`)}><strong>{$pathItem.params?.space}</strong></a>
    {$pathItem.params?.path}
  </div>
  {#if $pathItem.type === EnumResourceType.folder}
    <button class="btn-fake" onclick={() => addFolder($pathItem)}>{translate('Add Folder', 'ADD_FOLDER')}</button>
    <button class="btn-fake" onclick={() => addContent($pathItem)}>{translate('Add Content', 'ADD_CONTENT')}</button>
  {/if}
{/if}
