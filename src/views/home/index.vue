<template>
  <div class="home">
    <h1 class="home-title">欢迎进入管理后台</h1>
    <title-bar :menu="menu"/>
    <title-search title="搜索"/>
    <title-table title="列表">
      <template v-slot:titleAdd>
        <el-button @click="call">拨打电话18716001130</el-button>
      </template>
    </title-table>
    <iframe
      name="myframe"
      src="../../../static/demo.html"
      width="340"
      height="500"/>
  </div>
</template>

<script>
import titleSearch from '@/components/titleSearch';
import titleTable from '@/components/titleTable';
import titleBar from '@/components/titleBar';
export default {
  name: 'Home',
  components: {
    titleSearch,
    titleTable,
    titleBar
  },
  data () {
    return {
      menu: [{ label: '首页', routerName: 'Home' }, { label: '列表' }]
    };
  },
  methods: {
    call () {
      console.log(window.myframe.test);
      window.myframe.test.callme();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 100px);

  .home-title {
    font-weight: bold;
    font-size: 30px;
    line-height: 100px;
    text-align: center;
  }
}
</style>
