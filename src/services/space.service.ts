import { QueryType } from "@edraj/tsdmart";
import { Config } from "../config";
import httpClient from "../core/http.service";
import { mapRecords } from "../core/response.model";
import { Resource, type IResource } from "./resource.model";


export class SpaceService {


  static async GetSpaces(): Promise<IResource[]> {
    // create a search query
    const res = await httpClient.query({
      type: QueryType.spaces,
      space_name: Config.API.rootSpace,
      limit: 1000,
      subpath: '/',
      search: '',
    })


    return Resource.NewInstances(mapRecords(res)?.records);
  }

  // static async CreateSpace(space: Partial<IResource>): Promise<void> {
  //   const req: any = {
  //     space_name: Config.API.defaultSpace,
  //     request_type: RequestType.create,
  //     records: [Resource.PrepPost(space)],
  //   };
  //   await httpClient.request(req);
  //   return null;
  // }

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

  // static async GetSpace(space: string): Promise<IResource> {


  // }

}
