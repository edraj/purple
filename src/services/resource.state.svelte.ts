import { ListStateService } from '../core/state.svelte';
import type { IResource } from './resource.model';

// user per page
export class PageResourceListState extends ListStateService<IResource> {

  constructor() {
    super();
    _attn('pageliststate');
  }
}
