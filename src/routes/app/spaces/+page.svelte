<script lang="ts">
  import { Dialog } from '$lib/dialog/service.svelte';
  import { displayDate } from '$lib/transform/date';
  import ConfirmDialog from '$src/components/Confirm.dialog.svelte';
  import { Toast } from '$src/lib/toast/toast.service';
  import { type IResource } from '$src/services/resource.model';
  import { SpaceService } from '$src/services/space.service';
  import { rootSpaceList } from '$src/services/space.state';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  import type { Observable } from 'rxjs';
  import FormDialog from './form.dialog.svelte';

  const spaces: Observable<IResource[]> = rootSpaceList.stateList$;

  const add = () => {
    // when added do semethong
    Dialog.open(FormDialog, {
      title: translate('Add new space', 'ADD_NEW_SPACE'),
      css: 'animate frombottom',
      data: { mode: { forNew: true } },
      onclose: async (space: IResource) => {
        if (!space) return;

        const newspace = await SpaceService.CreateSpace(space);
        rootSpaceList.add(newspace);
        Toast.ShowSuccess('DONE');
      },
    });
  };
  const edit = (space: IResource) => {
    // when added do semethong
    Dialog.open(FormDialog, {
      title: translate('Edit space', 'EDIT_SPACE'),
      css: 'animate frombottom',
      data: { mode: { forNew: false }, space },
      onclose: async (space: IResource) => {
        if (!space) return;

        const _space = await SpaceService.UpdateSpace(space);
        _attn(_space);
        rootSpaceList.edit(_space);
        Toast.ShowSuccess('DONE');
      },
    });
  };

  const handleDelete = (space: IResource) => {
    Dialog.open(ConfirmDialog, {
      title: translate('Delete space', 'DELETE_SPACE'),
      css: 'modal-confirm',
      data: {
        message: `
          <h3>${space.displayname}</h3>
          ${translate(
            `Are you sure you want to delete this space?
          This action cannot be undone.`,
            'ARE_YOU_SURE_DELETE_SPACE',
          )}`,
      },
      onclose: async (confirmed) => {
        if (confirmed) {
          await SpaceService.DeleteSpace(space);
          rootSpaceList.remove(space);
          Toast.ShowSuccess('DONE');
        }
      },
    });
  };
</script>

<div class="page">
  <div class="container">
    <div class="spaced">
      <button class="btn-rev" onclick={add}>{translate('Create new', 'CreateNew')}</button>
    </div>

    {#if $spaces.length}
      <ul class="row-spaced uc-6 rowlist">
        {#each $spaces as space}
          <li>
            <div class="card">
              <a class="a" href={routeLink(`/spaces/${space.shortname}`)}>
                <span class="weight-bold">{space.displayname}</span>
                <div class="smaller light">
                  {space.shortname}
                  {space.description}
                </div>
              </a>
              <div class="tail smaller">
                {displayDate(space.updated)}
                <button class="btn-fake" onclick={() => edit(space)}>{translate('Edit', 'EDIT')}</button>
                <button class="btn-fake" onclick={() => handleDelete(space)}>{translate('Delete', 'DELETE')}</button>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
