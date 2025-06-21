<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ConfirmDialog from '$src/components/Confirm.dialog.svelte';
  import ContentDialog from '$src/components/Content.dialog.svelte';
  import FolderDialog from '$src/components/Folder.dialog.svelte';
  import { Dialog } from '$src/lib/dialog/service.svelte';
  import { Toast } from '$src/lib/toast/toast.service';
  import { expands } from '$src/lib/ui/expands';
  import type { IPath, PathState } from '$src/services/path.state';
  import type { IResource } from '$src/services/resource.model';
  import { ResourceService } from '$src/services/resource.service';
  import type { PageResourceListState, ResourceState } from '$src/services/resource.state';
  import type { TreeState } from '$src/services/tree.state';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  import { getContext } from 'svelte';

  const treeState = getContext('TreeState') as TreeState;
  const pathState = getContext('PathState') as PathState;
  const pathItem = pathState.stateItem$;
  const folderListState = getContext('FolderListState') as PageResourceListState;
  const resourceState = getContext('ResourceState') as ResourceState;

  $effect(() => {
    pathState.updatePath(page.url.pathname, page.params, page.route.id);
  });

  const addFolder = (path: IPath) => {
    // open dialog here
    Dialog.open(FolderDialog, {
      title: translate('Add new Folder', 'ADD_NEW_FOLDER'),
      css: 'modal-half-screen animate fromend',
      data: { mode: { forNew: true }, path },
      onclose: async (resource: IResource) => {
        if (!resource) return;
        // add to tree
        treeState.AddFolder(resource, path.params.path);
        // add to state
        folderListState.add(resource);

        Toast.ShowSuccess('DONE');
      },
    });
  };

  const addContent = (path: IPath) => {
    // open dialog here
    Dialog.open(ContentDialog, {
      title: translate('Add new content', 'ADD_NEW_CONTENT'),
      css: 'modal-half-screen animate fromend',
      // FIXME: do i need type?
      data: { mode: { forNew: true }, path },
      onclose: async (resource: IResource) => {
        if (!resource) return;
        goto(routeLink(`/spaces/${resource.path}`));

        Toast.ShowSuccess('DONE');
      },
    });
  };

  const handleDelete = (path: IPath) => {
    // delete me
    // the resource is that in current state? or is it not?
    // note that it could be a connt resource or a folder info resource
    const resource = resourceState?.currentItem;
    if (!resource) return;

    Dialog.open(ConfirmDialog, {
      title: translate('Delete this resource', 'DELETE_RESOURCE'),
      css: 'modal-confirm',
      data: {
        message: `
        <h3>${resource.displayname}</h3>
          ${translate(
            `Are you sure you want to delete this resource and all its sub resources?
          This action cannot be undone.`,
            'ARE_YOU_SURE_DELETE_RESOURCE',
          )}`,
      },
      onclose: (confirmed) => {
        if (confirmed) {
          ResourceService.DeleteResource(resource)
            .then((res) => {
              if (res) {
                // goto parent, go to, unles its /folder or content!!!!
                Toast.ShowSuccess('DELETED');
                // empty resource before u move
                resourceState.remove();

                goto(routeLink(`/spaces${resource.parent}`));
              }
            })
            .catch((error) => Toast.HandleUiError(error));
        }
      },
    });
  };
  const eft = () => {
    alert('eft');
  };
</script>

{#if $pathItem}
  <div class="row-spaced bthin">
    <div class="small">
      <a href={routeLink(`/spaces/${$pathItem.params?.space}/folder`)}><strong>{$pathItem.params?.space}</strong></a>
      {$pathItem.params?.path}
    </div>

    <div {@attach expands()} class="expands end smaller">
      <div class="f5 h"><i class="liga">more</i></div>
      <ul class="alist guts">
        <li><button onclick={eft}>{translate('ACL', 'ACL')} </button></li>
        <li><button onclick={eft}>{translate('Edit metadata', 'EDIT')} </button></li>
        <li><button onclick={eft}>{translate('History', 'HISTORY')} </button></li>
        <li>
          <button class="red" onclick={() => handleDelete($pathItem)}
            >{translate('Delete', 'DELETE')} <i class="liga">delete</i></button>
        </li>
        {#if $pathItem.type === EnumResourceType.folder}
          <li><button onclick={eft}>{translate('Export', 'EXPORT')} </button></li>
          <li><button onclick={eft}>{translate('Import', 'IMPORT')} </button></li>

          <li>
            <button onclick={() => addFolder($pathItem)}>
              {translate('Add Folder', 'ADD_FOLDER')} <i class="liga">folder</i></button>
          </li>
          <li>
            <button onclick={() => addContent($pathItem)}
              >{translate('Add Content', 'ADD_CONTENT')} <i class="liga">template</i></button>
          </li>
        {/if}
      </ul>
    </div>
  </div>
{/if}
