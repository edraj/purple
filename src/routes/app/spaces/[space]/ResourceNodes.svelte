<script lang="ts">
  import { tap, type Observable } from 'rxjs';
  import { getContext } from 'svelte';
  import type { PathState } from '../../../../services/path.state.svelte';
  import type { IResourceNode, ResourceListState } from '../../../../services/tree.state.svelte';
  import ResourceCard from './ResourceCard.svelte';
  import ResourceNodes from './ResourceNodes.svelte';

  interface IProps {
    resource?: IResourceNode;
    space: string;
  }
  let { resource, space }: IProps = $props();

  const treeState = getContext('TreeState') as ResourceListState;
  const pathState = getContext('PathState') as PathState;

  let nodes: Observable<IResourceNode[]> = treeState
    .GetResources(space, resource)
    .pipe(tap((_) => treeState.Sync(pathState.currentItem)));

  const toggle = (resource: IResourceNode) => {
    // first reset path state so that it doesnt trigger a sycn
    pathState.update({ source: 'toggle' });
    treeState.Toggle(resource);
    // now get children if expanded
  };

  const select = (resource: IResourceNode) => {
    // navigate?
    _attn(resource, 'select');
    _attn(pathState.currentItem, 'path');
  };
</script>

{#if $nodes?.length}
  <ul class="alist lbreath breath">
    {#each $nodes as item}
      <li>
        <div class="card">
          <div class="content">
            <ResourceCard resource={item} onToggle={() => toggle(item)} onSelect={() => select(item)}></ResourceCard>
          </div>
        </div>
        {#if item.expanded}
          <ResourceNodes {space} resource={item}></ResourceNodes>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
