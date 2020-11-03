<style type="text/scss">
  .ControlLayout {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .center {
    padding: 0 30px;
  }

  .left,
  .right {
    width: 350px;
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
