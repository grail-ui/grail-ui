<script lang="ts">
  import Demo from '$lib/demo/Demo.svelte';
  import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<ApiTable definition="ModalConfig" />
<ApiTable definition="ModalReturn" hideDefault />