<script>
  import { currentChordProgression, currentKey } from './stores';
  import { getChordProgressions, getProgressionForKey } from './utils';
  import ControlSet from './ControlSet.svelte';
  import Select from './Select.svelte';

  $: chordList = getProgressionForKey($currentChordProgression, $currentKey);

  const options = getChordProgressions().map(progression => {
    return {
      label: progression.join(' / '),
      value: progression,
    };
  });
</script>

<style type="text/scss">
  .chord-list {
    display: flex;
    margin-left: -10px;
  }
</style>

<ControlSet label="Chords">
  <Select
    options={options}
    placeholder="Select a progression…"
    bind:value={$currentChordProgression}
    disabled={!$currentKey}
  />
</ControlSet>
