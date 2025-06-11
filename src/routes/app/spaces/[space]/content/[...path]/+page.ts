import { ResourceService } from '$src/services/resource.service.js';
import { EnumResourceType } from '$src/tsdmart/client/index.js';
import { ResourceState } from '../../../../../../services/resource.state.svelte.js';

export const load = async ({ params }) => {
  // get resources of space and the path after decifering it
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
