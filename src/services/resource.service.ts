import httpClient from '../core/http.service';
import { mapRecords, mapResource } from '../core/response.model';
import { Param, type IParam } from '../utils/param.model';
import { Resource, type IResource } from './resource.model';


export class ResourceService {

  static async GetResources(options: IParam = {}): Promise<IResource[]> {

    const params = Param.MapQueryParams(options);

    const res = await httpClient.query({
      ...params
    });


    return Resource.NewInstances(mapRecords(res)?.records);
  }

  static async GetEntry(options: IParam = {}): Promise<IResource> {

    const params = Param.MapEntryParams(options);

    const res = await httpClient.retrieve_entry({
      ...params
    });

    return Resource.NewInstance(mapResource(res));
  }

}
