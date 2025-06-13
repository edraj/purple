<script lang="ts">
  import { getContext } from 'svelte';
  import type { PathState } from '../../../../services/path.state';

  const pathState = getContext('PathState') as PathState;
  const path = pathState.stateItem$;
</script>

{#if $path}
  <div class="small spaced">
    <strong>{$path.params?.space}</strong>
    {$path.params?.path}
  </div>
{/if}
