<script lang="ts">
  import type { IResourceNode } from '../../../../services/tree.state.svelte';

  interface IProps {
    resource: IResourceNode;
    onToggle?: () => void;
    onSelect?: () => void;
    onDelete?: () => void; // no, should keep away from this one
  }

  const { resource, onToggle, onSelect, onDelete }: IProps = $props();
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

    <!-- <div class="tail resource-full">
      {translate('Last updated', 'LastUpdated')}: {displayDate(resource.updated)} <br />
      <span class="smaller">{translate('Created', 'Created')} {displayDate(resource.created)}</span>
    </div> -->
  </div>
{/if}
