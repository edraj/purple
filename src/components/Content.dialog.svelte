<script lang="ts">
  import type { IDialogData } from '$lib/dialog/service.svelte';
  import type { IResource } from '$src/services/resource.model';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import type { IViewMode } from '$utils/view.model';
  import ResourceForm from './Resource.form.svelte';

  const { data, doClose }: IDialogData<{ mode: IViewMode; resource?: IResource }> = $props();
  const { mode, resource } = data;

  // TODO: create resource? maybe
</script>

<ResourceForm {mode} type={EnumResourceType.content} onsave={(r) => doClose(r)} oncancel={() => doClose(null)}
></ResourceForm>
