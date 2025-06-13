import { EnumQueryType } from '$utils/dmart/query.model';
import { Config } from '../config';
import httpClient from '../core/http.service';
import { mapRecords, mapResource } from '../core/response.model';
import { DataCache } from '../data/data.decorator';
import { SiteStorage } from '../data/storage.service';
import { Param } from '../utils/param.model';
import { Res } from '../utils/resources';
import { Page, type IPage } from './page.model';

export class PageService {

  static storageService = SiteStorage;

  @DataCache({ key: 'Pages' })
  static async GetPages(): Promise<IPage[]> {
    // create a search query
    // TODO: search only those with specific language, and isActive
    const res = await httpClient.post(
      Config.API.resource.publicQuery,
      Param.MapQueryParams({
        type: EnumQueryType.search,
        space: Config.API.contentSpace,
        withAttachments: false,
        withPayload: false,
        size: 1000,
        subpath: '/' + Res.language,
        keyword: ''
      }));

    return Page.NewInstances(mapRecords(res));
  }

  static async GetPage(shortname: string): Promise<IPage> {
    // managed/entry/:resource/:space/:subpath?:options'

    const res = await httpClient.post(
      Config.API.resource.publicQuery,
      Param.MapQueryParams({
        type: EnumQueryType.search,
        space: Config.API.contentSpace,
        withAttachments: true,
        withPayload: true,
        size: 1,
        subpath: '/' + Res.language,
        keyword: '',
        shortname
      }));

    // const res = await httpClient.retrieve_entry({
    //   resource_type: EnumResourceType.content,
    //   space_name: Config.API.contentSpace,
    //   subpath: '/' + Res.language,
    //   shortname,
    //   retrieve_json_payload: true,
    //   retrieve_attachments: true
    // },
    //   'public');
    return Page.NewInstance(mapResource(res));
  }
}
