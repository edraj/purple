import { PathState } from '$src/services/path.state';
import { PageResourceListState } from '$src/services/resource.state';
import { TreeState } from '$src/services/tree.state';

export const load = async ({ params }) => {
  // parent has access to parent layout data

  // generic, set whenver folder/[...path]/+page is loaded
  const folderListState = new PageResourceListState();

  const pathState = new PathState();
  const treeState = new TreeState();

  return {
    pathState,
    treeState,
    folderListState
  };
};
