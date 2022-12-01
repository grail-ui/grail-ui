<script lang="ts">
  import Demo from '$lib/demo/Demo.svelte';
  import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<ApiTable definition="AccordionSingleConfig" />
<ApiTable definition="AccordionMultipleConfig" />
<ApiTable definition="AccordionReturn" hideDefault />
<ApiTable definition="AccordionParams" hideDefault />
<ApiTable definition="AccordionItemParams" hideDefault />
