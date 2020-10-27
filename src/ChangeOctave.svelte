<script>
  import { currentOctaveIdx, visibleOctaves } from './stores';
  import { getNumOctaves, getOctaveJumps } from './utils';

  $: octaveJumps = getOctaveJumps(getNumOctaves(), $visibleOctaves);

  function prevOctave() {
    currentOctaveIdx.update(idx => {
      return Math.max(idx - 1, 0);
    });
  }

  function nextOctave() {
    currentOctaveIdx.update(idx => {
      return Math.min(idx + 1, octaveJumps - 1);
    });
  }

  function setOctave(newIdx) {
    currentOctaveIdx.update(idx => {
      return newIdx;
    });
  }
</script>

<style type="text/scss">
  .ChangeOctave {}

  .indicator {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .indicator-dot {
    display: block;
    width: 7px;
    height: 7px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.2;
    cursor: pointer;

    &.is-active {
      opacity: 1;
    }
  }

  .btns {
    margin-top: 15px;
  }

  .btn {
    border-radius: 0;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px 0;
    border-bottom: 1px solid transparent;

    & + & {
      margin-left: 20px;
    }

    &:active {
      opacity: 0.8;
    }

    &:hover {
      border-bottom-color: white;
    }

    &:focus {
      outline: none;
    }

    &.btn--prev {
      content: 'Prev';
    }

    &.btn--next {
      content: 'Next';
    }
  }
</style>

<div class="ChangeOctave">
  <div class="indicator">
    {#each Array(octaveJumps) as _, idx}
      <span
        class="indicator-dot" class:is-active={idx === $currentOctaveIdx}
        on:click={setOctave.bind(null, idx)}
      ></span>
    {/each}
  </div>

  <div class="btns">
    <button on:click={prevOctave} class="btn btn--prev">Previous</button>
    <button on:click={nextOctave} class="btn btn--next">Next</button>
  </div>
</div>
