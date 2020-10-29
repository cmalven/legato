<script>
  import { currentChordProgression, currentKey } from './stores';
  import { getChordProgressions, getProgressionForKey, formatNotation } from './utils';
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
    color: white;
  }
</style>

<ControlSet label="Chords">
  <Select
    options={options}
    placeholder="Select a progression…"
    bind:value={$currentChordProgression}
    disabled={!$currentKey}
  />

  {#if $currentKey && $currentChordProgression}
    <p class="chord-list">{formatNotation(chordList.join(' / '))}<p>
  {/if}
</ControlSet>
