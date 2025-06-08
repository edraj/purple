import { EnumQueryType, EnumSort } from '@edraj/tsdmart/client';
import { Config } from "../config";
import httpClient from "../core/http.service";
import { mapRecords, mapResponse } from "../core/response.model";
import { Param, type IParam } from '../utils/param.model';
import { Resource, type IResource } from './resource.model';


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
      keyword: '',
    };

    const res = await httpClient.query(Param.MapQueryParams(options));
    return Resource.NewInstances(mapRecords(res)?.records);
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
      withPayload: true
    };

    const res = await httpClient.query(Param.MapQueryParams(options));

    return Resource.NewInstance(mapResponse(res));
  }


  // static async UpdateSpace(space: IResource): Promise<void> {
  //   const req: any = {
  //     space_name: Config.API.defaultSpace,
  //     request_type: RequestType.update,
  //     records: [Resource.PrepPost(space)],
  //   };
  //   await httpClient.request(req);
  //   return null;
  // }

  // static async DeleteSpace(space: IResource): Promise<void> {
  //   const req: any = {
  //     space_name: Config.API.defaultSpace,
  //     request_type: RequestType.delete,
  //     records: [Resource.PrepPost(space)],
  //   };

  //   await httpClient.request(req);
  //   return null;
  // }


}
