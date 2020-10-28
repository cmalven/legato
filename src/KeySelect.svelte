<script>
  import { currentKey } from './stores';
  import { formatNotation, getKeys } from './utils';
</script>

<style type="text/scss">
  .KeySelect {
    color: white;
    margin-bottom: 50px;
  }

  .select {
    @include border-common;
    background-color: transparent;
    color: white;
  }
</style>

<div class="KeySelect">
  <select class="select" bind:value={$currentKey}>
    {#each getKeys() as key}
      <option value={key}>
        {formatNotation(key.tonic + ' ' + key.type)}
      </option>
    {/each}
  </select>
</div>
