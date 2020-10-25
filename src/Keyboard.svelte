<script>
  import { notes, currentOctaveIdx, visibleOctaves } from './stores';
  import { getAllNotes, getOctaveLength } from './utils';
  import Key from './Key.svelte';

  let keyOffset = 3;

  const allNotes = getAllNotes();
</script>

<style type="text/scss">
  .Keyboard {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transform: rotateX(20deg);
    transform-style: preserve-3d;
  }

  .Keyboard:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    height: calc(var(--scale) * 0.4);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0));
    transform: translateZ(16px) translateY(3px);
  }
</style>

<div class="Keyboard">
  {#each allNotes as note, idx (idx)}
    {#if
      Math.floor(idx / getOctaveLength()) >= $currentOctaveIdx &&
      Math.floor(idx / getOctaveLength()) <= $visibleOctaves - 1 + $currentOctaveIdx
    }
        <Key note={note} idx={idx + keyOffset + 1} on={$notes.indexOf(idx + 24) > -1} />
    {/if}
  {/each}
</div>
