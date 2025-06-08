import { PathState } from '../../../../services/path.state.svelte';
import { ResourceListState } from '../../../../services/tree.state.svelte';

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
