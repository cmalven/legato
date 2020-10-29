<style type="text/scss">
  .ControlLayout {
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .left,
  .right {
    width: 150px;
  }
</style>

<div class="ControlLayout">
  <div class="left">
    <slot name="left"></slot>
  </div>

  <div class="center">
    <slot class="center" name="center"></slot>
  </div>

  <div class="right">
    <slot name="right"></slot>
  </div>
</div>
