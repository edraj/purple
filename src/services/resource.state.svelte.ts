import { ListStateService, StateService } from '../core/state.svelte';
import type { IResource } from './resource.model';

// user per page
export class PageResourceListState extends ListStateService<IResource> {

  constructor() {
    super();
    _attn('pageliststate');
  }
}

export class ResourceState extends StateService<IResource> {
  constructor() {
    super();
    _attn('resourcestate');
  }
}
