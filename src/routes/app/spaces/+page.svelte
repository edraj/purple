<script lang="ts">
  import type { Observable } from 'rxjs';
  import { displayDate } from '../../../lib/transform/date';
  import type { IResource } from '../../../services/resource.model';
  import { rootSpaceList } from '../../../services/space.state.svelte';
  import { translate } from '../../../utils/resources';
  import { routeLink } from '../../../utils/route';

  const spaces: Observable<IResource[]> = rootSpaceList.stateList$;
</script>

<div class="page">
  <div class="container">
    <div class="spaced">
      <button class="btn-rev">{translate('Create new', 'CreateNew')}</button>
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
