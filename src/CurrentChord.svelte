<script>
  import { currentKey, notes } from './stores';
import { getChordFromNotes } from './utils';
import { formatNotation } from './utils';

$: currentChord = $currentKey
    ? getChordFromNotes($notes, $currentKey)
    : null;
</script>

<style type="text/scss">
  .CurrentChord {
    color: white;
    font-size: 32px;
    height: 100px;
  }

  .chord {
    & + & {
      margin-left: 50px;
    }
  }
</style>

<div class="CurrentChord">
  {#if currentChord}
    {#each currentChord as chord}
      <span class="chord">{formatNotation(chord)}</span>
    {/each}
  {/if}
</div>
