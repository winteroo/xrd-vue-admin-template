<template>
  <div class="titleSearch">
    <div class="title">
      <i
        v-if="icon"
        :class="icon"/>
      <span class="title-text">{{ title }} </span>
      <slot name="titleAdd"/>
    </div>
    <div class="search">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleSearch',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'el-icon-search'
    }
  },
  data () {
    return {

    };
  }
};
</script>
<style scoped lang="scss">
.titleSearch {
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  box-shadow: 0 0 14px 4px rgba(173, 173, 173, 0.09);
}

.title {
  padding-left: 10px;
  overflow: hidden;
  font-size: 14px;
  background: rgba(244, 244, 246, 1);
  border-radius: 5px;
}

.title-text {
  display: inline-block;
  height: 40px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  line-height: 40px;
}

.search {
  height: calc(100% - 20px);
  padding: 10px;
  overflow: hidden;
  background: #fff;
  border-radius: 0 0 5px 5px;
}

</style>
