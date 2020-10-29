<script>

</script>

<style type="text/scss">
  .Toolbar {
    @include border-common;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 40px 0;
  }
</style>

<div class="Toolbar">
  <slot></slot>
</div>
