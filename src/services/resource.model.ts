import { makeDate } from '../utils/common';
import { Translation, type ITranslation } from "../utils/translation.model";

export enum EnumResourceType {
  FOLDER = 'folder',
  CONTENT = 'content',
  SCHEMA = 'schema',

  USER = 'user',
  GROUP = 'group',
  ACL = 'acl',
  COMMENT = 'comment',
  MEDIA = 'media',
  LOCATOR = 'locator',
  RELATIONSHIP = 'relationship',
  ALTERATION = 'alteration',
  HISTORY = 'history',
  SPACE = 'space',
  BRANCH = 'branch',
  PERMISSION = 'permission',
  ROLE = 'role',
  TICKET = 'ticket',
  JSON = 'json',
  POST = 'post',
  PLUGINWRAPPER = 'plugin_wrapper',
  NOTIFICATION = 'notification',
  JSONL = 'jsonl',
  CSV = 'csv',
  SQLITE = 'sqlite',
  PARQUET = 'parquet',
}

export interface IResource {
  id?: string;
  shortname: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
  tags?: string[];
  body?: any;
  contentType?: string;  // json, html...
  type?: EnumResourceType;
  schema?: string;
  subpath?: string;
  contentPath?: string;
  space?: string;
  path?: string;

  description?: string;
  displayname?: string;
  // for eding, bring back all languages
  displaynameValue?: ITranslation; // en: '', ar: ''
  descriptionValue?: ITranslation;
  isHidden?: boolean;
}


export class Resource {

  static NewInstance(resource: any, options?: any): IResource {

    if (!resource) return null;

    const _subpath = (`${resource.subpath}/${resource.shortname}`).replace('//', '');
    return {
      id: resource.uuid,
      shortname: resource.shortname,
      type: resource.resource_type,
      schema: resource.schema_shortname,
      created: makeDate(resource.created_at),
      updated: makeDate(resource.updated_at),
      isActive: resource.is_active,
      tags: resource.tags,
      displayname: Translation.MapLanguage(resource.displayname) || resource.shortname, // calculate per language
      description: Translation.MapLanguage(resource.description),
      displaynameValue: resource.displayname,
      descriptionValue: resource.description,
      body: resource.payload?.body, // for later
      contentType: resource.payload?.content_type, // TODO: Enum
      subpath: _subpath, // not needed, this or path
      space: options?.space || resource.space_name,
      path: `${options?.space}/${resource.resource_type}/${_subpath}`,
      isHidden: resource.hide_space
    };
  }
  static NewInstances(resources: any[]): IResource[] {
    if (!resources) return [];
    return resources.map(n => Resource.NewInstance(n)).filter(n => !n.isHidden);
  }
  // static NewList(dataset: any, options?: IParam): IList<IResource> {
  //   const dl = new DataList<IResource>();
  //   dl.mapper = (item: any) => Resource.NewInstance({ ...item, ...item?.attributes }, options);
  //   return dl.NewDataList(dataset);

  // }
  // static NewInstanceFromResponse(response: any, options?: IListOptions): IResource {
  //   // find "records[]", and match first one
  //   const item = response.records[0];
  //   if (!item) return null;
  //   return Resource.NewInstance({...item, ...item.attributes}, options);
  // }


  // // prepare to POST
  // static PrepCreate(resource: Partial<IResource>): any {

  //   let payload = null;

  //   if (resource.type === EnumResourceType.CONTENT){
  //     payload ={
  //       payload: {
  //         body: resource.body,
  //         schema_shortname: null,
  //         content_type: resource.contentType
  //       }
  //     };
  //   }
  //   return {
  //     space_name: resource.space,
  //     request_type: 'create',
  //     records: [
  //       {
  //         resource_type: resource.type,
  //         shortname: resource.shortname,
  //         subpath: resource.subpath || '/',
  //         attributes: {
  //           resource_type: resource.type,
  //           shortname: resource.shortname,
  //           space_name: resource.space,
  //           // icon: 'folder',

  //           // tags: [],
  //           // root_registration_signature: '',
  //           // mirrors: [],
  //           // created_at: 2024-10-21T16:38:51.901466,
  //           // primary_website: '',
  //           // hide_folders: [],
  //           // uuid: 'baf39baa-335c-4af7-bd08-5737ff567dc5',
  //           // updated_at: '2024-10-21T16:51:46.878912',
  //           // indexing_enabled: true,
  //           // owner_shortname: dmart,
  //           // capture_misses: false,
  //           // active_plugins: [
  //           //   action_log,
  //           //   redis_db_update,
  //           //   resource_folders_creation
  //           // ],
  //           // check_health: false,
  //           is_active: true,
  //           // languages: [
  //           //   english,
  //           //   arabic
  //           // ],
  //           displayname: resource.displaynameValue, // TODO: proper mapping
  //           description: resource.descriptionValue,
  //           relationships: [],
  //           ...payload // check if this can be empty
  //         }
  //       }
  //     ]
  //   };
  // }
  // // prepare to PUT
  // static PrepSave(resource: Partial<IResource>): any {

  //   // uuid to the PrepCreate
  //   const _prep = Resource.PrepCreate(resource);
  //   _prep.records[0].attributes.uuid = resource.id;
  //   _prep.request_type = 'replace';
  //   return _prep;

  // }
  // static PrepDelete(resource: Partial<IResource>): any {
  //   // remove last part of subpath
  //   const _subpath = resource.subpath.replace(resource.shortname, '');

  //   return {
  //     space_name: resource.space,
  //     request_type: 'delete',
  //     records: [
  //       {
  //         resource_type: resource.type,
  //         shortname: resource.shortname,
  //         subpath: _subpath || '/',
  //         attributes: {}
  //       }
  //     ]
  //   };
  // }
}
