<script>
  import { nameToSymbol, isNoteBlack } from './utils';

  export let note = null;
  export let on = false;
  export let idx = 0;

  const isBlack = isNoteBlack(note);
</script>

<style>
  .Key {
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
    transition: 0.2s;
    transition-property: transform, background-color, color;
    transform-origin: 50% -20px;
    will-change: transform;
  }

  .Key.isBlack {
    background-color: black;
    color: white;
    z-index: 1;
    margin-left: calc(var(--scale) * var(--black-key-ratio) * var(--black-key-height-ratio) * -0.5 - var(--key-margin) / 2);
    margin-right: calc(var(--scale) * var(--black-key-ratio) * var(--black-key-height-ratio) * -0.5 - var(--key-margin) / 2);
    width: calc(var(--scale) * var(--black-key-ratio) * var(--black-key-height-ratio));
    height: calc(var(--scale) * var(--black-key-height-ratio));
  }

  .Key.on {
    background-color: blue;
    border-color: blue;
  }

  p {
    font-size: 12px;
  }

  span {
    display: block;
  }

  .index {
    margin-top: 10px;
    color: lightslategray;
  }
</style>

<div
  class="Key"
  class:isBlack
  class:on
  style="transform: rotateX({on ? -3 : 0}deg) translateZ({isBlack ? 15 : 0}px);"
>
  <p>
    {#each note.names as name}
      <span>
        {nameToSymbol(name)}
      </span>
    {/each}

    <span class="index">{idx}</span>
  </p>
</div>
