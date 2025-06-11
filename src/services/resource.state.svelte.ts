import { ListStateService, StateService } from '../core/state.svelte';
import type { IResource } from './resource.model';

// user per page
export class PageResourceListState extends ListStateService<IResource> {
}

export class ResourceState extends StateService<IResource> {
}
