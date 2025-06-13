import { Config } from '../../config';
import httpClient from '../../core/http.service';
import { EnumResourceType, type typeScope } from '../../utils/dmart/query.model';
import { DmartFile, type IFileRequest } from "./file.model";

export class DmartFileService {


  static async UploadFile(
    subpath: string,
    file: File,
    scope: typeScope = 'managed'
  ): Promise<void> {

    await httpClient.post(
      // which scope? how to update this? make a usecase

      Config.API.payload.file.replace(':scope', scope),
      DmartFile.PrepPost({
        space: Config.API.defaultSpace,
        subpath: subpath,
        shortname: Config.API.autoShortname,
        resourceType: EnumResourceType.media,
        schema: null
      }, file),
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

  }

  static async UploadFiles(
    subpath: string,
    files: FileList,
    scope: typeScope = 'managed'
  ): Promise<void> {
    const promises = Array.from(files).map(n => DmartFileService.UploadFile(subpath, n, scope));
    await Promise.all(promises);
  }

  static GetFileUrl(fileRequest: IFileRequest, scope: typeScope = 'managed'): string {
    const _schema = fileRequest.schema ? `${fileRequest.schema}.` : '';
    return Config.API.payload.url
      .replace(':scope', scope)
      .replace(':resource', fileRequest.resourceType)
      .replace(':space', fileRequest.space)
      .replace(':subpath', fileRequest.subpath)
      .replace(':shortname', fileRequest.shortname)
      .replace(':schema', _schema)
      .replace(':ext', fileRequest.ext || '');

  }

  static async GetFile(fileRequest: any, scope: typeScope = 'managed'): Promise<any> {
    const res = await httpClient.get<any>(DmartFileService.GetFileUrl(fileRequest, scope));
    // map response
    return res;
  }

}

