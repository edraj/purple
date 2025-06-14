import { ResourceService } from '$src/services/resource.service.js';
import { ResourceState } from '$src/services/resource.state.js';
import { EnumResourceType } from '$utils/dmart/query.model.js';

export const load = async ({ params }) => {
  // get resources of space and the path after decifering it
  // probably dont need this ever
  const pageResource = new ResourceState();
  const resource = await ResourceService.GetResource({
    space: params.space,
    withPayload: true,
    withAttachments: true,
    subpath: params.path,
    exactPath: true,
    resourceType: EnumResourceType.content
  });

  pageResource.SetState(resource);

  return {
    pageResource
  };

};
