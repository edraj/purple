import { Config } from '../config';
import httpClient from '../core/http.service';
import { mapRecords, mapResponse } from '../core/response.model';
import { EnumRequestType } from '../utils/dmart/query.model';
import { Param, type IParam } from '../utils/param.model';
import { Resource, type IResource } from './resource.model';


export class ResourceService {

  static async GetResources(options: IParam = {}): Promise<IResource[]> {

    const params = Param.MapQueryParams(options);
    const res = await httpClient.post(Config.API.resource.query, {
      ...params
    });
    return Resource.NewInstances(mapRecords(res));
  }

  static async GetResource(options: IParam = {}): Promise<IResource> {

    const params = Param.MapQueryParams({ ...options, size: 1 });
    const res = await httpClient.post(Config.API.resource.query, {
      ...params
    });

    return Resource.NewInstance(mapResponse(res));
  }


  private static getRequest(type: EnumRequestType, resource: Partial<IResource>): any {
    const req: any = Param.MapRequest({
      space: resource.space,
      type,
      records: [Resource.PrepPost(resource)],
    });
    return { req, url: Config.API.resource.request.replace(':scope', 'managed') };

  }

  static async CreateResource(resource: Partial<IResource>): Promise<IResource> {

    const req = this.getRequest(EnumRequestType.create, resource);
    const res = await httpClient.post(req.url, req.req);
    // hmmm, pass back to the space
    return Resource.NewInstance(mapResponse(res), resource.space);
  }

  static async UpdateResource(resource: IResource): Promise<IResource> {

    // replace
    const req = this.getRequest(EnumRequestType.update, resource);
    const res = await httpClient.post(req.url, req.req);
    return Resource.NewInstance(mapResponse(res), resource.space);
  }

  static async DeleteResource(resource: IResource): Promise<boolean> {
    const req = this.getRequest(EnumRequestType.delete, resource);
    await httpClient.post(req.url, req.req);
    return true;
  }
}
