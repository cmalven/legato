<script>
  import ControlLabel from './ControlLabel.svelte';
  export let label = 'Missing Label';
</script>

<style type="text/scss">
  .ControlSet {
    padding: 0 15px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>

<div class="ControlSet">
  <ControlLabel>{label}</ControlLabel>

  <div class="content">
    <slot></slot>
  </div>
</div>
