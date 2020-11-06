<script>
  import { currentChordProgression, currentKey } from './stores';
  import Chord from './Chord.svelte';
  import { getChordsForKey, getProgressionForKey } from './utils';

  $: chordList = $currentChordProgression
    ? getProgressionForKey($currentChordProgression, $currentKey)
    : getChordsForKey($currentKey);
</script>

<style type="text/scss">
  .Chords {
    width: 100%;
  }

  .chord-list {
    margin: 0 50px;
    display: flex;
    justify-content: center;
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
