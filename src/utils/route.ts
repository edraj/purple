import { Res } from "$utils/resources";
import { Config } from "../config";

export const routeLink = (url: string, isPublic: boolean = false): string => {
  // prefix with language
  if (!isPublic) {
    return `/${Res.language}${Config.Basic.appRoot}${url}`;
  }
  return `/${Res.language}${url}`;
};
