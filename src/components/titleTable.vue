<template>
  <div class="titleTable">
    <div class="title">
      <span class="title-text">
        <i
          v-if="icon"
          :class="icon"/>
        {{ title }}
      </span>
      <slot name="titleAdd"/>
    </div>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'TitleTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'el-icon-s-grid'
    }
  }
};
</script>
<style scoped lang="scss">
.titleTable {
  padding: 0 8px 8px 8px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 14px 4px rgba(173, 173, 173, 0.09);
}

.titleTable > .title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.title-text {
  font-size: 14px;
}

.titleTable > .title > .info {
  font-size: 12px;
}
</style>
