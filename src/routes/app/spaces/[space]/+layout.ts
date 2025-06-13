import { PathState } from '$src/services/path.state';
import { ResourceListState } from '$src/services/tree.state';

export const load = async ({ params }) => {
  // parent has access to parent layout data
  // await parent()

  const spacePathState = new PathState();
  const resourceListState = new ResourceListState();

  return {
    pathState: spacePathState,
    resourceListState
  };
};
