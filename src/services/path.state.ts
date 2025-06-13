import { StateService } from '../core/state.abstract';

export interface IPath {
  path: string;
  source?: 'toggle' | 'route';
  params?: any;
}
export class PathState extends StateService<IPath> {

  constructor() {
    super('DEBUG');
  }
  // TODO: function to break apart the path, make it linkable by segments of params
}

