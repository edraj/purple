<script lang="ts">
  import { Dialog } from '$lib/dialog/service.svelte';
  import { Toast } from '$lib/toast/toast.svelte';
  import { displayDate } from '$lib/transform/date';
  import { type IResource } from '$src/services/resource.model';
  import { SpaceService } from '$src/services/space.service';
  import { rootSpaceList } from '$src/services/space.state';
  import { generateShortName } from '$utils/common';
  import { translate } from '$utils/resources';
  import { routeLink } from '$utils/route';
  import type { Observable } from 'rxjs';
  import FormDialog from './form.dialog.svelte';

  const spaces: Observable<IResource[]> = rootSpaceList.stateList$;

  const add = () => {
    // when added do semethong
    Dialog.open(FormDialog, {
      title: 'Add new space',
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
      title: 'Add new space',
      css: 'animate frombottom',
      data: { mode: { forNew: false }, space },
      onclose: async (space: IResource) => {
        if (!space) return;
        const _newSpace: IResource = {
          ...space,
          shortname: generateShortName(space.displaynameInput.en),
        };

        // await SpaceService.CreateSpace(_newSpace);
        rootSpaceList.add(<IResource>_newSpace);
        Toast.ShowSuccess('DONE');
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
                {displayDate(space.updated)} - <button class="btn-fake" onclick={() => edit(space)}>Edit</button>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
