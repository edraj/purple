import { EnumResourceType } from '@edraj/tsdmart/client';
import { defer, map, switchMap, type Observable } from 'rxjs';
import { ListStateService } from '../core/state.svelte';
import type { IPath } from './path.state.svelte';
import type { IResource } from './resource.model';
import { ResourceService } from './resource.service';

export interface IResourceNode extends IResource {
  expanded?: boolean;
  parentId?: string;
  populated?: boolean;
}


export class ResourceListState extends ListStateService<IResourceNode> {
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
      // break it up and find and expend
      // if destroying, dont do this
      const parts = path.path.split('/');
      // they are all folders
      this.currentList.filter(r => r.type === EnumResourceType.folder).forEach(r => {
        if (parts.includes(r.shortname)) {
          r.expanded = true;
        }
      });
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
  AddFolder(resource: IResourceNode, path: string) {
    // find the parentId from path
    // space + type + path, the type is always a folder, space is in resource
    const _parent = this.currentList.find(r => r.path === `${resource.space}/folder/${path}`);
    if (_parent && _parent.populated) {
      // if not poulated, let server do this
      this.add({ ...resource, parentId: _parent.id, expanded: false, populated: false });
    }
    // if root, add with parent id space
    if (path === '') {
      this.add({ ...resource, parentId: resource.space, expanded: false, populated: false });
    }
  }
  DeleteFolder(resource: IResourceNode) {
    this.remove(resource);
  }

}

