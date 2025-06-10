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

    // return subpath is not a true representation of the path
    const _subpath = (`/${resource.subpath}/${resource.shortname}`).replace(/\/+/gi, '/');
    return {
      contentType: resource.content_type || null,
      created: makeDate(resource.created_at),
      description: Translation.MapLanguage(resource.description),
      descriptionInput: resource.description,
      displayname: Translation.MapLanguage(resource.displayname) || resource.shortname, // calculate per language
      displaynameInput: resource.displayname,
      id: resource.uuid,
      isActive: resource.is_active || false,
      isHidden: resource.hide_space || false,
      path: `${resource.space_name}/${resource.resource_type}${_subpath}`,
      schema: resource.schema_shortname,
      shortname: resource.shortname,
      space: resource.space_name,
      subpath: _subpath,
      tags: resource.tags,
      type: resource.resource_type,
      updated: makeDate(resource.updated_at)
    };
  }
  static NewInstances(resources: any[]): IResource[] {
    if (!resources) return [];
    return resources.map(n => Resource.NewInstance(n)).filter(n => !n.isHidden);
  }

}
