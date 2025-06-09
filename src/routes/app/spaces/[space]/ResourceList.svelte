<script lang="ts">
  import { getContext } from 'svelte';
  import type { PathState } from '../../../../services/path.state.svelte';
  import type { ResourceListState } from '../../../../services/tree.state.svelte';
  import ResourceNodes from './ResourceNodes.svelte';

  interface IProps {
    space: string;
  }

  let { space }: IProps = $props();
  const pathState = getContext('PathState') as PathState;
  const treeState = getContext('TreeState') as ResourceListState;
</script>

<ResourceNodes {space}></ResourceNodes>
