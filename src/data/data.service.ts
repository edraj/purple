import { Config } from '../config';
import httpClient from '../core/http.service';
import { mapResponse } from '../core/response.model';
import { EnumQueryType, EnumResourceType } from '../utils/dmart/query.model';
import { Param, type IParam } from '../utils/param.model';

export class DataService {
  static async GetSomething(): Promise<any> {

    const options: IParam = {
      type: EnumQueryType.search,
      space: Config.API.rootSpace,
      size: 1,
      exactPath: true,
      subpath: '/schema/@shortname:metafile',
      withAttachments: true,
      withPayload: true,
      resourceType: EnumResourceType.schema
    };

    const res = await httpClient.post(Config.API.resource.query, Param.MapQueryParams(options));
    // _attn(mapResponse(res).definitions.translation.properties);
    return mapResponse(res);
  }
}
