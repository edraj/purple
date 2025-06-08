import { PageService } from '$src/services/page.service';


export async function load() {

  const pages = await PageService.GetPages();
  return {
    pages
  };
}
