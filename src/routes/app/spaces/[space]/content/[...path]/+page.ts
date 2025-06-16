import { ResourceService } from '$src/services/resource.service.js';
import { EnumResourceType } from '$utils/dmart/query.model.js';

export const load = async ({ params, parent }) => {
  // get resources of space and the path after decifering it
  // probably dont need this ever
  const resource = await ResourceService.GetResource({
    space: params.space,
    withPayload: true,
    withAttachments: true,
    subpath: params.path,
    exactPath: true,
    resourceType: EnumResourceType.content
  });

  const { resourceState } = await parent();
  resourceState.SetState(resource);

  return {

  };

};
