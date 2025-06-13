<script lang="ts">
  import type { IDialogData } from '$lib/dialog/service.svelte';
  import { ValidateForm } from '$lib/input/form';
  import OlInput from '$lib/input/OlInput.svelte';
  import { Toast } from '$lib/toast/toast.svelte';
  import { Config } from '$src/config';
  import type { IResource } from '$src/services/resource.model';
  import { translate } from '$utils/resources';
  import type { IViewMode } from '$utils/view.model';

  const { data, doClose }: IDialogData<{ mode: IViewMode; space?: IResource }> = $props();
  const { mode, space } = data;

  const languages = Config.Res.languages;
  // svelte-ignore non_reactive_update
  let formState = $state({
    shortname: null,
    displaynameInput: {},
    descriptionInput: {},
  });

  // if edit update
  if (space) {
    formState = {
      shortname: space.shortname,
      descriptionInput: space.descriptionInput,
      displaynameInput: space.displaynameInput,
    };
  }
  const saveForm = (e: Event) => {
    e.preventDefault();
    Toast.Hide();

    if (!ValidateForm(e.target as HTMLFormElement)) {
      return;
    }
    doClose({
      ...space,
      ...formState,
    });
  };

  const cancel = () => {
    doClose(null);
  };
</script>

<form onsubmit={saveForm} novalidate>
  {#if !mode.forNew}
    <div class="spaced">
      <div class="f6 light">{translate('Shortname', 'SHORTNAME')}</div>
      {space.shortname}
    </div>
  {:else}
    <OlInput
      placeholder={translate('Shortname', 'SHORTNAME')}
      forLabel="shortname"
      error={translate('Invalid shortname', 'INVALID_SHORTNAME')}>
      {#snippet input({ placeholder, css })}
        <input
          class="w100 {css}"
          type="text"
          bind:value={formState.shortname}
          {placeholder}
          id="shortname"
          required
          pattern="^[a-zA-Z0-9_]+$" />
      {/snippet}
      {#snippet help()}
        {translate('No spacecs allowed', 'NoSpacesAllowed')}
      {/snippet}
    </OlInput>
  {/if}

  <div class="spaced">
    <div class="bthin">Title</div>
    <ul class="row-spaced ucol uc-4">
      {#each languages as lang}
        <li>
          <OlInput placeholder={lang.display} forLabel="title-{lang.name}">
            {#snippet input({ placeholder, css })}
              <input
                class="w100 {css}"
                type="text"
                bind:value={formState.displaynameInput[lang.name]}
                {placeholder}
                id="title-{lang.name}" />
            {/snippet}
          </OlInput>
        </li>
      {/each}
    </ul>
  </div>

  <div class="spaced">
    <div class="bthin">Description</div>
    <ul class="row-spaced ucol uc-4">
      {#each languages as lang}
        <li>
          <OlInput placeholder={lang.display} forLabel="desc-{lang.name}">
            {#snippet input({ placeholder, css })}
              <input
                class="w100 {css}"
                type="text"
                bind:value={formState.descriptionInput[lang.name]}
                {placeholder}
                id="desc-{lang.name}" />
            {/snippet}
          </OlInput>
        </li>
      {/each}
    </ul>
  </div>

  <div class="txt-r">
    <button type="button" class="btn-fake" onclick={cancel}>Cancel</button>
    <button type="submit" class="btn-rev">Save</button>
  </div>
</form>
