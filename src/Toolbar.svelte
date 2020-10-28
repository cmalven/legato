<script>

</script>

<style type="text/scss">
  .Toolbar {
    @include border-common;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0;
  }
</style>

<div class="Toolbar">
  <slot></slot>
</div>
