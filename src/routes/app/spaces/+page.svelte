<script lang="ts">
  import type { Observable } from 'rxjs';
  import { Dialog } from '../../../lib/dialog/service.svelte';
  import { Toast } from '../../../lib/toast/toast.svelte';
  import { displayDate } from '../../../lib/transform/date';
  import type { IResource } from '../../../services/resource.model';
  import { SpaceService } from '../../../services/space.service';
  import { rootSpaceList } from '../../../services/space.state.svelte';
  import { generateShortName } from '../../../utils/common';
  import { Res, translate } from '../../../utils/resources';
  import { routeLink } from '../../../utils/route';
  import FormDialog from './form.dialog.svelte';

  const spaces: Observable<IResource[]> = rootSpaceList.stateList$;

  const add = () => {
    // when added do semethong
    Dialog.open(FormDialog, {
      title: Res.Get('AddNewSpace'),
      css: 'animate frombottom',
      data: { mode: { forNew: true } },
      onclose: async (space: IResource) => {
        if (!space) return;
        const _newSpace: IResource = {
          ...space,
          shortname: generateShortName(space.displayname),
        };

        await SpaceService.CreateSpace(_newSpace);
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
                {displayDate(space.updated)}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
