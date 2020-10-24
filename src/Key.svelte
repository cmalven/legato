<script>
  import { nameToSymbol, isNoteBlack } from './utils';

  export let note = null;
  export let on = false;
  export let idx = 0;

  const isBlack = isNoteBlack(note);
</script>

<style>
  .Key {
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: calc(var(--scale) * var(--white-key-ratio));
    height: calc(var(--scale));
    border-radius: calc(var(--scale) * 0.0125);
    margin: var(--key-margin);
  }

  .Key.isBlack {
    background-color: black;
    color: white;
    z-index: 1;
    border-color: black;
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
