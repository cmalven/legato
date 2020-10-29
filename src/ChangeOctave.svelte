<script>
  import { currentOctaveIdx, visibleOctaves } from './stores';
  import { getNumOctaves, getOctaveJumps } from './utils';
  import ControlSet from './ControlSet.svelte';

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
  .ChangeOctave {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .indicators {
    display: flex;
    width: 70px;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
  }

  .indicator-dot {
    display: block;
    width: 7px;
    height: 7px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }

    &.is-active {
      opacity: 1;
    }
  }

  .btns {

  }

  .btn {
    border-radius: 0;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 0;
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

<ControlSet label="Octave">
  <div class="ChangeOctave">
    <div class="indicators">
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
</ControlSet>
