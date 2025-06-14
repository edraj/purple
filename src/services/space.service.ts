import { Config } from "../config";
import httpClient from "../core/http.service";
import { mapResponse } from "../core/response.model";
import { EnumQueryType, EnumRequestType, EnumResourceType, EnumSort } from '../utils/dmart/query.model';
import { Param, type IParam } from '../utils/param.model';
import { Resource, type IResource } from './resource.model';
import { ResourceService } from './resource.service';


export class SpaceService {


  // needs caching and it loads local state
  static async GetSpaces(): Promise<IResource[]> {
    // create a search query
    const options: IParam = {
      type: EnumQueryType.spaces,
      space: Config.API.rootSpace,
      size: 100,
      exactPath: true,
      sort: { by: 'resource_type', type: EnumSort.descending },
      subpath: '/',
      keyword: ''
    };
    return ResourceService.GetResources(options);

  }

  static async GetSpace(spacename: string): Promise<any> {

    const options: IParam = {
      type: EnumQueryType.spaces,
      space: spacename,
      size: 1,
      exactPath: true,
      subpath: '/',
      keyword: '',
      withAttachments: true,
      withPayload: true,
    };
    return ResourceService.GetResource(options);

  }

  // the only special case is this one
  static async CreateSpace(space: Partial<IResource>): Promise<IResource> {

    const req: any = Param.MapRequest({
      space: space.shortname,
      type: EnumRequestType.create,
      records: [Resource.PrepPost(space)],
    });


    const res = await httpClient.post(Config.API.resource.space, req);
    return Resource.NewInstance(mapResponse(res));
  }

  static async UpdateSpace(space: IResource): Promise<IResource> {
    return ResourceService.UpdateResource({
      ...space,
      type: EnumResourceType.space,
      shortname: space.shortname,
      space: space.shortname,
      subpath: '/'
    });

  }

  static async DeleteSpace(space: IResource): Promise<boolean> {
    return ResourceService.DeleteResource(space);
  }



}
