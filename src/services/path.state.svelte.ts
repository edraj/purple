import { StateService } from '../core/state.svelte';

export interface IPath {
  path: string;
  source?: 'toggle' | 'route';
}
export class PathState extends StateService<IPath> {

}

