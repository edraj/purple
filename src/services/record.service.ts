import httpClient from '$core/http.service';
import { Config } from '$src/config';
import { mapRecords, mapResource } from '$src/core/response.model';
import { Resource } from '$src/services/resource.model';
import { EnumQueryType, EnumRequestType } from '../utils/dmart/query.model';
import { Param } from '../utils/param.model';
import { DmartRecord, type IDmartRecord } from './record.model';

export class RecordService {
  static async GetRecords(): Promise<IDmartRecord[]> {
    // create a search query
    const res = await httpClient.post(
      Config.API.resource.query,
      Param.MapQueryParams({
        type: EnumQueryType.search,
        withAttachments: true,
        withPayload: true,
        space: Config.API.defaultSpace,
        size: 1000,
        subpath: Config.API.maqola.records,
        keyword: '',
      })
    );
    return DmartRecord.NewInstances(mapRecords(res));
  }

  static async CreateRecord(record: Partial<IDmartRecord>): Promise<IDmartRecord> {

    const req: any = Param.MapRequest({
      space: Config.API.defaultSpace,
      type: EnumRequestType.create,
      records: [DmartRecord.PrepPost(record)],
    });
    const res = await httpClient.post(Config.API.resource.request.replace(':scope', 'managed'), req);
    return DmartRecord.NewInstance(mapResource(res));
  }

  static async UpdateRecord(record: IDmartRecord): Promise<IDmartRecord> {
    const req: any = Param.MapRequest({
      space: Config.API.defaultSpace,
      type: EnumRequestType.update,
      records: [DmartRecord.PrepPost(record)],
    });
    const res = await httpClient.post(Config.API.resource.request.replace(':scope', 'managed'), req);
    return DmartRecord.NewInstance(mapResource(res));
  }

  static async DeleteRecord(record: IDmartRecord): Promise<boolean> {
    const req: any = Param.MapRequest({
      space: Config.API.maqola.space,
      type: EnumRequestType.delete,
      records: [Resource.PrepDelete(record)],
    });
    await httpClient.post(Config.API.resource.request.replace(':scope', 'managed'), req);
    return true;

  }
}
