<script>
  import { currentChordProgression, currentKey } from './stores';
  import { getChordProgressions } from './utils';
  import ControlSet from './ControlSet.svelte';
  import Select from './Select.svelte';

  const options = getChordProgressions().map(progression => {
    return {
      label: progression.join(' / '),
      value: progression,
    };
  });
</script>

<ControlSet label="Chords">
  <Select
    options={options}
    placeholder="Select a progression…"
    bind:value={$currentChordProgression}
    disabled={!$currentKey}
  />
</ControlSet>
