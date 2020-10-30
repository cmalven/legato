<script>
  import { currentChordProgression, currentKey } from './stores';
  import { getChordProgressions, getProgressionForKey } from './utils';
  import ControlSet from './ControlSet.svelte';
  import Select from './Select.svelte';
  import Chord from './Chord.svelte';

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

  {#if $currentKey && $currentChordProgression}
    <p class="chord-list">
      {#each chordList as chord}
        <Chord name={chord} />
      {/each}
    <p>
  {/if}
</ControlSet>
