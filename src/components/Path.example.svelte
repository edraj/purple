<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ContentDialog from '$src/components/Content.dialog.svelte';
  import FolderDialog from '$src/components/Folder.dialog.svelte';
  import { Dialog } from '$src/lib/dialog/service.svelte';
  import { Toast } from '$src/lib/toast/toast.service';
  import { expands } from '$src/lib/ui/expands';
  import type { IPath, PathState } from '$src/services/path.state';
  import type { IResource } from '$src/services/resource.model';
  import type { PageResourceListState } from '$src/services/resource.state';
  import type { TreeState } from '$src/services/tree.state';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  import { DropdownMenu } from 'bits-ui';
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

  const eft = () => {
    alert('eft');
  };
</script>

{#if $pathItem}
  <div class="row-spaced">
    <div class="small spaced">
      <a href={routeLink(`/spaces/${$pathItem.params?.space}`)}><strong>{$pathItem.params?.space}</strong></a>
      {$pathItem.params?.path}
    </div>

    {#if $pathItem.type === EnumResourceType.folder}
      <div class="bthin spaced">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <i class="liga">more</i>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="box box-white">
            <DropdownMenu.Group>
              <DropdownMenu.Item><button onclick={eft}>ACL</button></DropdownMenu.Item>
              <DropdownMenu.Item><button>Edit Metadata</button></DropdownMenu.Item>
              <DropdownMenu.Item><button>History</button></DropdownMenu.Item>
              <DropdownMenu.Item><button>Delete</button></DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item><button>Export</button></DropdownMenu.Item>
              <DropdownMenu.Item><button>Import</button></DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <button class="btn-fake" onclick={() => addFolder($pathItem)}>{translate('Add Folder', 'ADD_FOLDER')}</button>
        <button class="btn-fake" onclick={() => addContent($pathItem)}
          >{translate('Add Content', 'ADD_CONTENT')}</button>
      </div>
    {/if}
  </div>

  <div class="txt-r">
    <div {@attach expands()} class="expands">
      <div class="f5 h"><i class="liga">more</i></div>
      <ul class="alist guts">
        <li><button onclick={eft}>ACL</button></li>
        <li><button onclick={eft}>Edit Metadata</button></li>
        <li><button onclick={eft}>History</button></li>
        <li><button onclick={eft}>Delete</button></li>
        <li><button onclick={eft}>Export</button></li>
        <li><button onclick={eft}>Import</button></li>
      </ul>
    </div>
  </div>
{/if}
