<script lang="ts">
  import type { IResourceNode } from '$src/services/tree.state';

  interface IProps {
    resource: IResourceNode;
    onToggle: () => void;
    onSelect: () => void;
  }

  const { resource, onToggle, onSelect }: IProps = $props();
</script>

{#if resource}
  <div class="card">
    <div class="content">
      <i class="liga cam rbreath" onclick={() => onToggle()}>{resource.expanded ? 'openfolder' : 'folder'}</i>
      <a class="cam" onclick={() => onSelect()}>{resource.displayname}</a>

      <div class="small">
        <span class="label label-grey-light">{resource.shortname}</span>
        <div class="light">
          {resource.description}
        </div>
      </div>
    </div>
  </div>
{/if}
