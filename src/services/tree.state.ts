import { defer, map, switchMap, type Observable } from 'rxjs';
import { ListStateService } from '../core/state.abstract';
import { EnumResourceType } from '../utils/dmart/query.model';
import type { IPath } from './path.state';
import type { IResource } from './resource.model';
import { ResourceService } from './resource.service';

export interface IResourceNode extends IResource {
  expanded?: boolean;
  parentId?: string;
  populated?: boolean;
}


export class TreeState extends ListStateService<IResourceNode> {
  constructor() {

    super();
    super.SetList([]);
  }

  GetResources(space: string, resource: IResourceNode): Observable<IResourceNode[]> {

    const _id = resource?.id || space;

    // first find this element to see if it has already been populated
    const _current = this.currentList.find(r => r.id === _id);
    if (_current?.populated) {
      return this.GetChildren(_id);
    }
    // get from server and populate state

    return defer(() => ResourceService.GetResources({
      space: space,
      resourceType: EnumResourceType.folder,
      subpath: resource?.subpath,
      exactPath: true
    })).pipe(
      switchMap(d => {
        if (_current) _current.populated = true;
        return this.append(d.map(n => ({ ...n, parentId: _id, expanded: false, populated: false })));
      }),
      map(list => list.filter(f => f.parentId === _id))
    );
  }

  GetChildren(id?: string): Observable<IResourceNode[]> {
    return this.stateList$.pipe(map(list => list.filter(f => f.parentId === id)));
  }

  Sync(path: IPath) {
    if (path?.path && path?.source === 'route') {
      // if destroying, dont do this, or use path.params
      const parts = path.path.split('/');
      this.currentList.filter(r => r.type === EnumResourceType.folder).forEach(r => {
        if (parts.includes(r.shortname)) {
          r.expanded = true;
        }
      });
      // TODO: update others too
    }
  }

  Toggle(resource: IResourceNode): IResourceNode {
    // nothing to toggle if not folder
    if (resource.type === EnumResourceType.folder) {
      const _resource = { ...resource, expanded: !resource.expanded };
      this.edit(_resource);
      return _resource;
    }
  }
  AddFolder(resource: IResourceNode, paramPath: string) {
    // find the parentId from path
    // space + type + path, the type is always a folder, space is in resource
    const _parent = this.currentList.find(r => r.path === `${resource.space}/folder/${paramPath}`);
    // if not poulated, let server do this
    if (_parent && _parent.populated) {
      this.add({ ...resource, parentId: _parent.id, expanded: false, populated: false });
    }
    // if root, add with parent id space
    if (paramPath === '') {
      this.add({ ...resource, parentId: resource.space, expanded: false, populated: false });
    }
  }
  DeleteFolder(resource: IResourceNode) {
    this.remove(resource);
  }

}

