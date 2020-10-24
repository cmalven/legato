<script>
  import { notes, currentOctaveIdx, visibleOctaves } from './stores';
  import { getAllOctaves, getOctaveLength } from './utils';
  import Key from './Key.svelte';

  let keyOffset = 3;

  const allOctaves = getAllOctaves();
</script>

<style>
  .Keyboard {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
</style>

<div class="Keyboard">
  {#each allOctaves as note, idx (idx)}
    {#if
      Math.floor(idx / getOctaveLength()) >= $currentOctaveIdx &&
      Math.floor(idx / getOctaveLength()) <= $visibleOctaves - 1 + $currentOctaveIdx
    }
        <Key note={note} idx={idx + keyOffset + 1} on={$notes.indexOf(idx + 24) > -1} />
    {/if}
  {/each}
</div>
