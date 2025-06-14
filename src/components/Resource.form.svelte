<script lang="ts">
  import { ValidateForm } from '$lib/input/form';
  import OlInput from '$lib/input/OlInput.svelte';
  import { Config } from '$src/config';
  import { Toast } from '$src/lib/toast/toast.service';
  import type { IResource } from '$src/services/resource.model';
  import type { EnumResourceType } from '$utils/dmart/query.model';
  import { translate } from '$utils/resources';
  import { languageInput } from '$utils/translation.model';
  import type { IViewMode } from '$utils/view.model';

  interface IPageProps {
    mode?: IViewMode;
    type?: EnumResourceType;
    resource?: IResource;
    onsave?: (resource: IResource) => void;
    oncancel?: () => void;
  }

  let { mode = { forNew: true }, resource, onsave, oncancel }: IPageProps = $props();

  const languages = Config.Res.languages;
  // svelte-ignore non_reactive_update
  let formState = $state({
    shortname: null,
    displaynameInput: { ...languageInput },
    descriptionInput: { ...languageInput },
  });

  // if edit update
  if (resource && !mode.forNew) {
    formState = {
      shortname: resource.shortname,
      descriptionInput: resource.descriptionInput,
      displaynameInput: resource.displaynameInput,
    };
  }
  const saveForm = (e: Event) => {
    e.preventDefault();
    Toast.Hide();

    if (!ValidateForm(e.target as HTMLFormElement)) {
      return;
    }
    onsave({
      ...resource,
      ...formState,
    });
  };

  const cancel = () => {
    oncancel();
  };
</script>

<form onsubmit={saveForm} novalidate>
  {#if !mode.forNew}
    <div class="spaced">
      <div class="f6 light">{translate('Shortname', 'SHORTNAME')}</div>
      {resource.shortname}
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
    <div class="bthin">{translate('Title', 'TITLE')}</div>
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
    <div class="bthin">{translate('Description', 'DESCRIPTION')}</div>
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

  <div class="spaced">Tags here</div>

  <div class="spaced">payload editor</div>

  <div class="txt-r">
    <button type="button" class="btn-fake" onclick={cancel}>{translate('Cancel', 'CANCEL')}</button>
    <button type="submit" class="btn-rev">{translate('Save', 'SAVE')}</button>
  </div>
</form>
