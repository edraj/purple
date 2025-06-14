import { EnumResourceType } from '$utils/dmart/query.model';
import { StateService } from '../core/state.abstract';

export interface IPath {
  path: string;
  source?: 'toggle' | 'route';
  params?: any;
  type?: EnumResourceType;
}
export class PathState extends StateService<IPath> {

  constructor() {
    super('DEBUG');
  }

  updatePath(url: string, params: any, route: string) {
    // find part of the url to know the soruce type, unless i merge into [type]
    // match app/spaces/[space]/(type)/[...path]
    let type = EnumResourceType.content;
    if (route.split('/')[4] === 'folder') { type = EnumResourceType.folder; }
    super.update({ path: url, params, source: 'route', type });
  }
}

