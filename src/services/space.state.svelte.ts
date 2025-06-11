import { map, Observable } from 'rxjs';
import { ListStateService } from '../core/state.svelte';
import type { IResource } from './resource.model';
import { SpaceService } from './space.service';

export class SpaceListState extends ListStateService<IResource> {
  constructor() {
    _seqlog('Space State constructed');
    super();
    SpaceService.GetSpaces().then((list) => {
      super.SetList(list);
    });
  }

  GetSpace(space: string): Observable<IResource> {
    return this.stateList$.pipe(
      map((list) => list.find((item) => item.shortname === space))
    );
  }

}

export const rootSpaceList = new SpaceListState();
