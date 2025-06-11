<script lang="ts">
  import { ValidateForm } from '$lib/input/form';
  import OlInput from '$lib/input/OlInput.svelte';
  import { Toast } from '$lib/toast/toast.svelte';
  import type { IViewMode } from '$utils/view.model';
  import type { IDialogData } from '../../../lib/dialog/service.svelte';
  import type { IResource } from '../../../services/resource.model';

  const props: IDialogData<{ mode: IViewMode; space?: IResource }> = $props();

  let formState = $state({
    displayname: null,
    description: null,
  });

  // if edit update
  if (props.data.space) {
    formState = {
      ...props.data.space, // structured clone
      displayname: props.data.space.displayname,
      description: props.data.space.description,
    };
  }
  const saveForm = (e: Event) => {
    e.preventDefault();
    Toast.Hide();

    if (!ValidateForm(e.target as HTMLFormElement)) {
      return;
    }
    props.doClose({
      ...props.data.space,
      ...formState,
    });
  };

  const cancel = () => {
    props.doClose(null);
  };
</script>

<form onsubmit={saveForm} novalidate>
  <div class="spaced">
    create a component of three languages

    <OlInput placeholder="Title" forLabel="title" error="required">
      {#snippet input({ placeholder, css })}
        <input class="w100 {css}" type="text" bind:value={formState.displayname} {placeholder} required id="title" />
      {/snippet}
    </OlInput>
  </div>

  <div class="spaced">
    <OlInput placeholder="Description" forLabel="desc" error="required">
      {#snippet input({ placeholder, css })}
        <textarea class="w100 {css}" id="desc" rows="3" required bind:value={formState.description} {placeholder}
        ></textarea>
      {/snippet}
    </OlInput>
  </div>

  <div class="txt-r">
    <button type="button" class="btn-fake" onclick={cancel}>Cancel</button>
    <button type="submit" class="btn-rev">Save</button>
  </div>
</form>
