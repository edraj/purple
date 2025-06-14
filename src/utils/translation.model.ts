import { Config } from '$src/config';
import { Res } from '$utils/resources';

export interface ITranslation {
  [key: string]: string;
}


export const languageInput = Config.Res.languages.reduce((acc: any, cur) => {
  acc[cur.name] = [];
  return acc;
}, {});

export class Translation {
  static MapLanguage(prop: any): string {
    return prop ? prop[Res.language] : '';
  }

  static PrepLanguage(prop: ITranslation): ITranslation {

    return Config.Res.languages.reduce((prev, curr) => {
      prev[curr.name] = prop[curr.name];
      return prev;
    }, {});

    // return {
    //   en: prop['en'],
    //   ar: prop['ar'],
    //   ku: prop['ku'],
    // };
  }
}
