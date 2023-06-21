<template>
  <bk-popover class="process-header" :content="tips" :max-width="200">
    <span>{{ name }}</span>
  </bk-popover>
</template>
<script>
export default {
  name: 'ProcessHeader',
  props: {
    name: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="postcss" scoped>
  /deep/ .bk-tooltip-ref {
    max-width: 100%;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .process-header {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    cursor: pointer;

    span {
      border-bottom: 1px dashed #c4c6cc;
      padding-bottom: 3px;
      min-width: 60px;
    }
  }
</style>
