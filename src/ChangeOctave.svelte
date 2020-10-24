<script>
  import { currentOctaveIdx, visibleOctaves } from './stores';
  import { getNumOctaves } from './utils';

  function prevOctave() {
    currentOctaveIdx.update(idx => {
      return Math.max(idx - 1, 0);
    });
  }

  function nextOctave() {
    currentOctaveIdx.update(idx => {
      return Math.min(idx + 1, Math.floor(getNumOctaves() / $visibleOctaves + 1));
    });
  }
</script>

<style>
  .ChangeOctave {
    margin-top: 50px;
  }
</style>

<div class="ChangeOctave">
  <button on:click={prevOctave}>Previous</button>
  <button on:click={nextOctave}>Next</button>
</div>
