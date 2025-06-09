import { EnumQueryType, EnumResourceType, EnumSort, type IEntryQuery, type IQueryRequest } from '@edraj/tsdmart/client';
import { Config } from '../config';

export interface IParam {
  total?: number;
  hasMore?: boolean;
  resourceType?: EnumResourceType;
  shortname?: string;

  type?: EnumQueryType;
  space?: string;
  subpath?: string;
  keyword?: string;
  forTypes?: EnumResourceType[];
  forSchemas?: string[];
  forShortnames?: string[];
  fromDate?: Date;
  toDate?: Date;
  sort?: { by: string, type?: EnumSort; };
  withPayload?: boolean;
  withAttachments?: boolean;
  validateSchema?: boolean;
  query?: string; // jq
  exactPath?: boolean;
  size?: number;
  page?: number;
  // aggregationData?: IAggregationType;
};


export class Param {


  static MapQueryParams(options: IParam): IQueryRequest {
    // map each to its name in db, watch out for arrays
    // query folder content, unless type is not folder, change the path
    // the last part of the path is the shortname of the content

    // let content;
    // let path = options.subpath;

    // if (options.resourceType && options.resourceType !== EnumResourceType.folder) {
    //   // content is the last element in subpath
    //   const _subpath = options.subpath.split('/');
    //   content = _subpath.slice(-1);
    //   path = _subpath.slice(0, -1).join('/');
    // }

    // resourceType does not exist, map it in filter_Types
    let forTypes = [EnumResourceType.content, EnumResourceType.folder];
    if (options.resourceType) {
      forTypes = [options.resourceType];
    }

    return {
      type: options.type || EnumQueryType.search,
      space_name: options.space || Config.API.rootSpace,
      subpath: options.subpath || '/',
      // filter_shortnames: content || null,
      search: options.keyword || '',
      limit: options.size || 100,
      offset: options.page || 0,
      exact_subpath: options.exactPath || false, // almost always true
      sort_type: options.sort?.type || EnumSort.ascending,
      sort_by: options.sort?.by || 'created_at',
      retrieve_json_payload: options.withPayload || false,
      retrieve_attachments: options.withAttachments || false,
      validate_schema: true,
      filter_types: forTypes,
    };

  }

  static MapEntryParams(options: IParam): IEntryQuery {
    return {
      retrieve_json_payload: options.withPayload || false,
      retrieve_attachments: options.withAttachments || false,
      validate_schema: true,
      resource_type: options.resourceType || EnumResourceType.content,
      space_name: options.space,
      subpath: options.subpath,
      shortname: options.shortname
    };
  }
}
