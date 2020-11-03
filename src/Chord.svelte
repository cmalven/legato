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
    font-size: 12px;
    line-height: 15px;
    padding: 8px;
    color: white;
    transition: border-color 0.2s;

    &:hover {
      border-color: white;
    }
  }
</style>

<div class="Chord" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
  {formatNotation(name)}
</div>

