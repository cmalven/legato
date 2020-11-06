<script>
  import { formatNotation, isNoteBlack } from './utils';
  import { notes, isMousePressed } from './stores';
  import { playNote, stopNote } from './Midi.svelte';

  export let note = null;
  export let on = false;
  export let idx = 0;
  export let midi = 0;
  export let selected = false;
  export let highlighted = false;
  export let disabled = false;

  const isBlack = isNoteBlack(note);

  const addNote = () => {
    playNote(midi);
    notes.update(notes => {
      return [...notes, midi];
    });
  };

  const removeNote = () => {
    stopNote(midi);
    notes.update(notes => {
      return notes.filter(val => val !== midi);
    });
  };

  const onMouseDown = () => {
    addNote();
  };

  const onMouseUp = () => {
    removeNote();
  };

  const onMouseEnter = () => {
    if ($isMousePressed) {
      addNote();
    }
  };

  const onMouseLeave = () => {
    if ($isMousePressed) {
      removeNote();
    }
  };
</script>

<style type="text/scss">
  $key-color: blue;
  $highlight-color: red;

  .Key {
    --transition-duration: 0.2s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: calc(var(--scale) * var(--white-key-ratio));
    height: calc(var(--scale));
    border-radius: calc(var(--scale) * 0.0125);
    margin: var(--key-margin);
    transform-style: preserve-3d;
    background-color: white;
    flex: 0 0 auto;
    transition: var(--transition-duration);
    transition-property: transform, background-color, color;
    transform-origin: 50% -20px;
    will-change: transform;
    overflow: hidden;
    user-select: none;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 30%;
      opacity: 0;
    }

    &:before {
      left: 0;
      background-image: linear-gradient(to right, black, rgba(black, 0));
      transition-property: opacity var(--transition-duration);
    }

    &:after {
      right: 0;
      background-image: linear-gradient(to left, black, rgba(black, 0));
    }

    &.isBlack {
      background-color: black;
      color: white;
      z-index: 1;
      margin-left: calc(var(--scale) * var(--black-key-ratio) * var(--black-key-height-ratio) * -0.5 - var(--key-margin) / 2);
      margin-right: calc(var(--scale) * var(--black-key-ratio) * var(--black-key-height-ratio) * -0.5 - var(--key-margin) / 2);
      width: calc(var(--scale) * var(--black-key-ratio) * var(--black-key-height-ratio));
      height: calc(var(--scale) * var(--black-key-height-ratio));
      box-shadow: 0 0 10px rgba(black, 0.3);

      &:before,
      &:after {
        content: none;
      }
    }

    &.highlighted {
      background-color: lighten($key-color, 40%);
    }

    &.highlighted.isBlack {
      background-color: darken($key-color, 30%);
    }

    &.selected {
      background-color: lighten($highlight-color, 25%);
    }

    &.selected.isBlack {
      background-color: lighten($highlight-color, 20%);
    }

    &.disabled {
      .info {
        opacity: 0;
      }
    }

    &.selected {
      background-color: lighten($highlight-color, 25%);

      .info {
        opacity: 1;
      }
    }

    &.selected.isBlack {
      background-color: lighten($highlight-color, 20%);
    }

    &.on,
    &.highlighted.on {
      background-color: $key-color;

      &:before,
      &:after {
        opacity: 0.2;
      }
    }
  }

  p {
    font-size: 12px;
  }

  .info {
    transition-property: color var(--transition-duration);

    .isBlack & {
      color: white;
    }

    .on:not(.isBlack) & {
      color: white;
    }
  }

  .symbol {
    > span {
      display: block;
    }
  }

  .index {
    display: block;
    margin-top: 10px;
    opacity: 0.3;
  }
</style>

<div
  class="Key"
  class:isBlack
  class:on
  class:highlighted
  class:selected
  class:disabled
  style="transform: rotateX({on ? -3 : 0}deg) translateZ({isBlack ? 15 : 0}px);"
  on:mousedown={onMouseDown}
  on:mouseup={onMouseUp}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>

  <div class="info">
    <p class="symbol">
      {#each note.names as name}
      <span>
        {formatNotation(name)}
      </span>
      {/each}
    </p>

    <p class="index">{idx}</p>
  </div>
</div>
