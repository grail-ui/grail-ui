<script lang="ts">
  import type {
    AccordionItemParams,
    AccordionMultipleConfig,
    AccordionSingleConfig,
    AccordionType,
  } from '../accordion.types';
  import { createAccordion } from '../accordion';

  export let type: AccordionType;
  export let defaultValue: string | string[] | undefined = undefined;
  export let disabled = false;
  export let items: AccordionItemParams[];
  export let onValueChange: ((value: string | string[]) => void) | undefined = undefined;

  const options = { type, defaultValue, disabled, onValueChange };

  const { useAccordion, itemAttrs, triggerAttrs, contentAttrs } =
    type === 'single'
      ? createAccordion(options as AccordionSingleConfig)
      : createAccordion(options as AccordionMultipleConfig);
</script>

<ul use:useAccordion={{ disabled }}>
  {#each items as { value, disabled }, index}
    <li {...$itemAttrs({ value, disabled })}>
      <h3>
        <button {...$triggerAttrs({ value, disabled })} data-testid="trigger">Accordion trigger {index}</button>
      </h3>
      <div {...$contentAttrs({ value, disabled })} data-testid="content">
        <p>Accordion content {index}</p>
      </div>
    </li>
  {/each}
</ul>
