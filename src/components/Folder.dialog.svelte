<script lang="ts">
  import type { IDialogData } from '$lib/dialog/service.svelte';
  import { Toast } from '$src/lib/toast/toast.service';
  import type { IPath } from '$src/services/path.state';
  import type { IResource } from '$src/services/resource.model';
  import { ResourceService } from '$src/services/resource.service';
  import { EnumResourceType } from '$utils/dmart/query.model';
  import type { IViewMode } from '$utils/view.model';
  import ResourceForm from './Resource.form.svelte';

  interface IPageProps {
    mode: IViewMode;
    resource?: IResource;
    path?: IPath;
  }
  const { data, doClose }: IDialogData<IPageProps> = $props();
  const { mode, resource, path } = data;

  const handleSave = async (resource: IResource) => {
    try {
      const _resource = await ResourceService.CreateResource({
        ...resource,
        subpath: path.params.path,
        space: path.params.space,
        type: EnumResourceType.folder,
      });
      doClose(_resource);
    } catch (e) {
      Toast.HandleUiError(e);
    }
  };
</script>

<ResourceForm {mode} type={EnumResourceType.folder} onsave={(r) => handleSave(r)} oncancel={() => doClose(null)}
></ResourceForm>
