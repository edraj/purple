import { ResourceService } from '$src/services/resource.service.js';
import { PageResourceListState } from '../../../../../../services/resource.state.js';

export const load = async ({ params }) => {
  // get resources of space and the path after decifering it
  const pageResources = new PageResourceListState();
  const resources = await ResourceService.GetResources({
    space: params.space,
    withPayload: true,
    subpath: params.path,
    size: 100,
    exactPath: true,
  });

  pageResources.SetList(resources);

  return {
    pageResources
  };

};
