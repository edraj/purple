import { ResourceService } from '$src/services/resource.service.js';

export const load = async ({ params, parent }) => {

  const resources = await ResourceService.GetResources({
    space: params.space,
    withPayload: true,
    subpath: params.path,
    size: 100,
    exactPath: true,
  });
  const { folderListState } = await parent();
  folderListState.SetList(resources);

  return {
  };

};
