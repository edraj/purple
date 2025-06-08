<script lang="ts">
  import { Observable, tap } from 'rxjs';
  import { getContext } from 'svelte';
  import type { PathState } from '../../../../services/path.state.svelte';
  import type { IResourceNode, ResourceListState } from '../../../../services/tree.state.svelte';
  import ResourceNodes from './ResourceNodes.svelte';

  interface IProps {
    space: string;
  }

  let { space }: IProps = $props();
  const pathState = getContext('PathState') as PathState;
  const treeState = getContext('TreeState') as ResourceListState;

  const nodes: Observable<IResourceNode[]> = treeState
    .GetResources(space, null)
    .pipe(tap((_) => treeState.Sync(pathState.currentItem)));
</script>

{#if $nodes}
  <!-- starts with root nodes -->
  <ResourceNodes {space} nodes={$nodes}></ResourceNodes>
{/if}
