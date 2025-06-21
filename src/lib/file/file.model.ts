import { browser, dev } from '$app/environment';
import { mapRecord } from '$core/response.model';
import { Config } from '$src/config';
import { type IResource, Resource } from '$src/services/resource.model';
import { cleanPath } from '$utils/common';
import { EnumContentType, EnumResourceType } from '$utils/dmart/query.model';

export interface IFileRequest {
  space?: string,
  subpath?: string,
  shortname?: string,
  resourceType?: EnumResourceType,
  schema?: string,
  ext?: string;
  file?: File;
  files?: FileList;
}
export interface IDmartFile extends IResource {
  url?: string;
  ext?: string;
}


export class DmartFile {

  static GetFileUrl(file: IDmartFile, ext?: string): string {

    let scope = 'managed';
    if (dev && browser) {
      scope = 'public';
    }

    return Config.API.apiRoot + cleanPath(Config.API.payload.url
      .replace(':scope', scope)
      .replace(':resource', file.type)
      .replace(':space', file.space)
      .replace(':subpath', file.subpath)
      .replace(':shortname', file.shortname)
      .replace(':ext', file.ext || ext));
  }

  static NewInstance(data: any, parentpath?: string, space?: string): IDmartFile {
    const res = Resource.NewInstance(data, space);
    if (parentpath) res.subpath = parentpath;

    // TODO: lookup extension
    const ext = data.body?.split('.').pop() || '.png';
    return {
      ...res,
      ext,
      url: DmartFile.GetFileUrl(res, ext)
    };
  }

  static NewInstances(data: any[], parentpath?: string, space?: string): IDmartFile[] {
    if (!data?.length) return [];
    return data.map(n => DmartFile.NewInstance(mapRecord(n), parentpath, space));
  }

  static MapType(file: File): EnumContentType {
    const type = file.type;

    if (type.startsWith("image/")) return EnumContentType.image;
    if (type === "application/pdf") return EnumContentType.pdf;
    return null;
  }

  static PrepPost(fileRequest: IFileRequest, file: File): any {

    const payload = {
      body: {},
      content_type: DmartFile.MapType(file),
      schema_shortname: fileRequest.schema || null,
    };

    const _record = {
      resource_type: fileRequest.resourceType,
      shortname: fileRequest.shortname,
      subpath: fileRequest.subpath,
      attributes: { is_active: true, payload }
    };

    const record = new Blob([JSON.stringify(_record)], {
      type: 'application/json',
    });

    const form_data = new FormData();
    form_data.append('space_name', fileRequest.space);
    form_data.append('request_record', record);
    form_data.append('payload_file', file);

    return form_data;

  }
}
