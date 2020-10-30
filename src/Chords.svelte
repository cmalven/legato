<script>
  import { currentChordProgression, currentKey } from './stores';
  import Chord from './Chord.svelte';
  import { getProgressionForKey } from './utils';

  $: chordList = getProgressionForKey($currentChordProgression, $currentKey);
</script>

<style type="text/scss">
  .chord-list {
    display: flex;
    margin-left: -10px;
  }
</style>

<div class="Chords">
  {#if $currentKey && $currentChordProgression}
    <p class="chord-list">
      {#each chordList as chord}
        <Chord name={chord} />
      {/each}
    <p>
  {/if}
</div>
