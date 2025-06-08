import type { EnumResourceType } from '@edraj/tsdmart/client';
import { StateService } from '../core/state.svelte';

export interface IPath {
  path: string;
  type: EnumResourceType;
  space: string;
  source: 'toggle' | 'route';
}
export class PathState extends StateService<IPath> {
  constructor() {
    super();
  }
}

