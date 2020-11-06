<script>
  import {
    notes,
    currentOctaveIdx,
    visibleOctaves,
    keyOffset,
    currentKey,
    selectedChord,
    isMousePressed,
  } from './stores';
  import { getAllNotes, getMidiForSelectedChord, getOctaveLength, noteIdxToMidi, noteInCurrentKey } from './utils';
  import Key from './Key.svelte';

  const allNotes = getAllNotes();

  $: keysInSelectedChord = getMidiForSelectedChord($selectedChord, $currentOctaveIdx);

  const onMouseDown = () => {
    isMousePressed.update(pressed => true);
  };

  const onMouseUp = () => {
    isMousePressed.update(pressed => false);
  };
</script>

<style type="text/scss">
  .Keyboard {
    margin: 30px 0 120px;
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
    transform: translateZ(16px) translateY(2px);
  }
</style>

<div
  class="Keyboard"
  on:mousedown={onMouseDown}
  on:mouseup={onMouseUp}
>
  {#each allNotes as note, idx (idx)}
    {#if
      Math.floor(idx / getOctaveLength()) >= $currentOctaveIdx &&
      Math.floor(idx / getOctaveLength()) <= $visibleOctaves - 1 + $currentOctaveIdx
    }
        <Key
          note={note}
          idx={idx + $keyOffset + 1}
          midi={noteIdxToMidi(idx, $keyOffset)}
          highlighted={$currentKey && noteInCurrentKey(note, $currentKey)}
          disabled={$currentKey && !noteInCurrentKey(note, $currentKey)}
          selected={keysInSelectedChord.indexOf(noteIdxToMidi(idx, $keyOffset)) > -1}
          on={$notes.indexOf(noteIdxToMidi(idx, $keyOffset)) > -1}
        />
    {/if}
  {/each}
</div>
