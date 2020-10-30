<script>
  import { formatNotation } from './utils';
  import { selectedChord } from './stores';

  export let name;

  const onMouseEnter = evt => {
    selectedChord.update(chord => {
      return name;
    });
  };

  const onMouseLeave = evt => {
    selectedChord.update(chord => {
      return null;
    });
  };
</script>

<style type="text/scss">
  .Chord {
    @include border-common;
    padding: 8px;
    min-width: 37px;
    color: white;
    transition: border-color 0.2s;
    margin-left: 10px;

    &:hover {
      border-color: white;
    }
  }
</style>

<div class="Chord" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
  {formatNotation(name)}
</div>

