<script>
  import { currentKey } from './stores';
  import { formatNotation, getKeys } from './utils';
  import ControlSet from './ControlSet.svelte';
  import Select from './Select.svelte';

  const options = getKeys().map(key => {
    return {
      label: formatNotation(key.tonic + ' ' + key.type),
      value: key,
    };
  });
</script>

<ControlSet label="Key">
  <Select
    options={options}
    placeholder="Select a key…"
    bind:value={$currentKey}
  />
</ControlSet>
