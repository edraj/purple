import { EnumRequestType, EnumResourceType } from './query.model';
import type { IRecordWithAttachment } from './record.model';

export interface IRequest {
  space_name: string;
  request_type: EnumRequestType;
  records?: IRecordWithAttachment[];

  schema_shortname?: string,
  subpath?: string,
  resource_type?: EnumResourceType,
  workflow_shortname?: string,
  record?: any;
};


// this is a flattened out request for submit function
// export interface ISubmitRequest {
// }
