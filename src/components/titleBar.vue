<template>
  <div class="titleBar">
    <div class="go-left breadcrumb-content">
      <el-breadcrumb :separator-class="separator">
        <template v-for="(el, index) in menu">
          <el-breadcrumb-item
            v-if="el.routerName"
            :key="el.routerName"
            :to="initRouter(el)"
          >{{ el.label }}</el-breadcrumb-item>
          <el-breadcrumb-item
            v-else
            :key="index">{{ el.label }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="go-right">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleBar',
  props: {
    /**
     * @example: [{label:'首页', routerName: 'homePage'},{label:'列表'}]
     */
    menu: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    },
    // 分隔符
    separator: {
      type: String,
      default: 'el-icon-arrow-right'
    }
  },
  data () {
    return {};
  },
  methods: {
    initRouter (el) {
      let router = {};
      router.name = el.routerName;
      if (el.query) {
        router.query = el.query;
      }
      return router;
    }
  }
};
</script>
<style lang="scss" scoped>
.titleBar {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 9px 8px;
  overflow: hidden;
  font-size: 16px;

  .breadcrumb-content {
    padding-top: 10px;
  }
}

.titleBar /deep/ .el-breadcrumb__inner {
  color: #df0007;

  &:hover {
    color: #df0007;
  }
}

.titleBar /deep/ .is-link {
  color: #333;
}
</style>
