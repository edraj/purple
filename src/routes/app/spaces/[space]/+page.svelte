<script lang="ts">
  import { routeLink } from "../../../../utils/route";

</script>
<div class="page">

  <div class="container">
    space name then list of resources in a tree
    <div class="row">
      <div class="c-3">
        tree here
        <a href={routeLink('/spaces/spacename/resourcename/subpath/shomething')}>Test deep link</a>
      </div>
      <div class="c-9">
        content here
      </div>
    </div>

  </div>
</div>
