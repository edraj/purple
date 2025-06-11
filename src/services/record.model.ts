import { Config } from '$src/config';
import {
  EnumContentType,
  EnumResourceType,
  type IAttributes,
  type IRecord,
} from '$src/tsdmart/client';
import { Translation } from '$src/utils/translation.model';
import { makeDate, toISODateString } from '$utils/common';

export interface IDmartRecord {
  displayname?: string;
  shortname: string;
  description?: string;
  date?: Date; // example props, add all that u need
  color?: string;
}

export class DmartRecord {
  static NewInstance(data: any): IDmartRecord {
    return {
      shortname: data.shortname,
      displayname: Translation.MapLanguage(data.displayname),
      description: Translation.MapLanguage(data.description),
      date: makeDate(data.date),
      color: data.color,
    };
  }

  static NewInstances(data: any[]): IDmartRecord[] {
    if (!data?.length) return [];
    return data.map(DmartRecord.NewInstance);
  }
  static PrepPost(record: Partial<IDmartRecord>): IRecord<IAttributes> {
    return {
      resource_type: EnumResourceType.content,
      shortname: record.shortname,
      subpath: Config.API.records.list,
      attributes: {
        is_active: true,
        displayname: {
          en: record.displayname,
        },
        description: {
          en: record.description,
        },
        payload: {
          content_type: EnumContentType.json,
          body: {
            // example extra prop
            date: toISODateString(record.date),
            color: record.color,
          },
        },
      },
    };
  }
}
