<script>

</script>

<style type="text/scss">
  .Toolbar {
    @include border-common;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 0;
  }
</style>

<div class="Toolbar">
  <slot></slot>
</div>
