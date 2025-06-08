<script lang="ts">
  import { getContext } from 'svelte';
  import type { PathState } from '../../../../services/path.state.svelte';

  interface IProps {
    space: string;
  }
  let { space }: IProps = $props();
  const pathState = getContext('PathState') as PathState;
  const path = pathState.stateItem$;
</script>

{#if $path}
  <div class="small spaced">
    {$path.path}
  </div>
{/if}
