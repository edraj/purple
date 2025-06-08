import type { EnumContentType, EnumResourceType } from '@edraj/tsdmart/client';
import { makeDate } from '../utils/common';
import { Translation, type ITranslation } from "../utils/translation.model";

export interface IResource {
  id?: string;
  shortname: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
  tags?: string[];
  contentType?: EnumContentType;  // json, html...
  type?: EnumResourceType;

  schema?: string;
  subpath?: string;
  contentPath?: string;

  space?: string;
  path?: string;

  description?: string;
  displayname?: string;
  // for eding, bring back all languages
  displaynameInput?: ITranslation;
  descriptionInput?: ITranslation;
  isHidden?: boolean;
}


// TODO: response<T> for body

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
      displaynameInput: resource.displayname,
      descriptionInput: resource.description,
      // body: resource?.body,
      contentType: resource.content_type,
      subpath: _subpath,
      space: resource.space_name,
      // space: options?.space || resource.space_name,
      path: `${options?.space}/${resource.resource_type}/${_subpath}`,
      isHidden: resource.hide_space
    };
  }
  static NewInstances(resources: any[]): IResource[] {
    if (!resources) return [];
    return resources.map(n => Resource.NewInstance(n)).filter(n => !n.isHidden);
  }

}
