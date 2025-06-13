import httpClient from '$core/http.service';
import { Config } from '$src/config';
import { mapRecords } from '$src/core/response.model';
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
        subpath: Config.API.records.list,
        keyword: '',
      })
    );
    return DmartRecord.NewInstances(mapRecords(res));
  }
  // could be higher up

  private static getRequest(type: EnumRequestType, record: Partial<IDmartRecord>): any {
    const req: any = Param.MapRequest({
      space: Config.API.defaultSpace,
      type,
      records: [DmartRecord.PrepPost(record)],
    });
    return { req, url: Config.API.resource.request.replace(':scope', 'managed') };

  }

  static async CreateRecord(record: Partial<IDmartRecord>): Promise<void> {

    const req = this.getRequest(EnumRequestType.create, record);
    await httpClient.post(req.req, req.url);
    return null;
  }

  static async UpdateRecord(record: IDmartRecord): Promise<void> {
    const req = this.getRequest(EnumRequestType.update, record);
    await httpClient.post(req.req, req.url);
    return null;
  }

  static async DeleteRecord(record: IDmartRecord): Promise<void> {
    const req = this.getRequest(EnumRequestType.delete, record);
    await httpClient.post(req.req, req.url);
    return null;
  }
}
