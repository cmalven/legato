<script>
  import { currentChordProgression, currentKey } from './stores';
  import Chord from './Chord.svelte';
  import { getChordsForKey, getProgressionForKey } from './utils';

  $: chordList = $currentChordProgression
    ? getProgressionForKey($currentChordProgression, $currentKey)
    : getChordsForKey($currentKey);
</script>

<style type="text/scss">
  .chord-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    grid-gap: 10px;
  }
</style>

<div class="Chords">
  {#if chordList.length}
    <p class="chord-list">
      {#each chordList as chord}
        <Chord name={chord} />
      {/each}
    <p>
  {/if}
</div>
