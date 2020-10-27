<script>
  import { formatNotation, isNoteBlack } from './utils';

  export let note = null;
  export let on = false;
  export let idx = 0;
  export let disabled = false;

  const isBlack = isNoteBlack(note);
</script>

<style type="text/scss">
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

    &.on {
      background-color: blue;
      border-color: blue;

      &:before,
      &:after {
        opacity: 0.2;
      }
    }

    &.disabled {
      background-color: black;
      border: 1px solid slategray;
    }
  }

  p {
    font-size: 12px;
  }

  .symbol {
    display: block;
  }

  .index {
    display: block;
    margin-top: 10px;
    color: rgba(black, 0.3);
    transition-property: color var(--transition-duration);

    .isBlack & {
      color: rgba(white, 0.4);
    }

    .on & {
      color: rgba(white, 0.5);
    }
  }
</style>

<div
  class="Key"
  class:isBlack
  class:on
  class:disabled
  style="transform: rotateX({on ? -3 : 0}deg) translateZ({isBlack ? 15 : 0}px);"
>
  <p>
    {#each note.names as name}
      <span class="symbol">
        {formatNotation(name)}
      </span>
    {/each}

    <span class="index">{idx}</span>
  </p>
</div>
