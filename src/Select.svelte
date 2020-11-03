<script>
  export let options = [];
  export let placeholder = 'Select…';
  export let value = null;
  export let disabled = false;
</script>

<style type="text/scss">
  .Select {
    @include border-common;
    background-color: transparent;
    color: white;
    padding: 10px 8px;
    min-width: 200px;
  }
</style>

<select class="Select" bind:value={value} disabled={disabled}>
  <option value={null}>
    {placeholder}
  </option>

  {#each options as option}
    <option value={option.value}>
      {option.label}
    </option>
  {/each}
</select>
