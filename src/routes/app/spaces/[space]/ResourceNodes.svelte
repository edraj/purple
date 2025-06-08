<script lang="ts">
  import { type Observable } from 'rxjs';
  import { getContext } from 'svelte';
  import type { PathState } from '../../../../services/path.state.svelte';
  import type { IResourceNode, ResourceListState } from '../../../../services/tree.state.svelte';
  import ResourceCard from './ResourceCard.svelte';
  import ResourceNodes from './ResourceNodes.svelte';

  interface IProps {
    nodes: IResourceNode[];
    space: string;
  }
  let { nodes, space }: IProps = $props();

  const treeState = getContext('TreeState') as ResourceListState;
  const pathState = getContext('PathState') as PathState;
  let children;
  const toggle = (resource: IResourceNode) => {
    // first reset path state so that it doesnt trigger a sycn
    pathState.update({ source: 'toggle' });
    const _newResource = treeState.Toggle(resource);
    // now get children if expanded
    if (_newResource.expanded) {
      children = GetChildren(_newResource);
    }
  };
  const GetChildren = (resource: IResourceNode): Observable<IResourceNode[]> => {
    return treeState.GetResources(space, resource);
  };
</script>

{#if nodes?.length}
  <ul class="alist lbreath breath">
    {#each nodes as item}
      <li>
        <div class="card">
          <div class="content">
            <ResourceCard resource={item} onToggle={() => toggle(item)}></ResourceCard>
          </div>
        </div>
        {#if item.expanded}
          <ResourceNodes {space} nodes={$children}></ResourceNodes>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
