import { Config } from '$src/config';
import { Res } from '$utils/resources';

export interface ITranslation {
  [key: string]: string;
}


export const languageInput = Config.Res.languages.reduce((acc: any, cur) => {
  acc[cur.name] = null;
  return acc;
}, {});

export class Translation {
  static MapLanguage(prop: any): string {
    return prop ? prop[Res.language] : '';
  }

}
