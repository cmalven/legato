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
  }
</style>

<div class="ControlSet">
  <ControlLabel>{label}</ControlLabel>

  <div class="content">
    <slot></slot>
  </div>
</div>
