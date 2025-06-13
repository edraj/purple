import { EnumContentType, EnumResourceType } from '../../utils/dmart/query.model';
import type { IAttributes, IPayload, IRecord } from '../../utils/dmart/record.model';

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



export class DmartFile {
  static MapType(file: File): EnumContentType {
    const type = file.type;

    if (type.startsWith("image/")) return EnumContentType.image;
    if (type === "application/pdf") return EnumContentType.pdf;
    return null;
  }

  static PrepPost(fileRequest: IFileRequest, file: File): any {

    const payload: IPayload = {
      body: {},
      content_type: DmartFile.MapType(file),
      schema_shortname: fileRequest.schema || null,
    };

    const _record: IRecord<IAttributes> = {
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
