<template>
  <header class="eleHeads">
    <div class="eleHead shadow">
      <div class="logo">
        <!-- <img src="../../static/logo.png" alt="logo" class="logo-img" /> -->
      </div>
      <h2>欢迎使用本系统</h2>
      <div
        class="back"
        @click="logOut">
        <i class="el-icon-switch-button"/>
        <span>退出</span>
      </div>
      <div class="user">
        <i class="el-icon-user"/>
        公证处 -- {{ $user.name }}
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import {logout} from '@/api/modules/login';
import {notify} from '@/util/notify.js';
import { loginRouterName } from '@/config';
export default {
  name: 'EleHeads',
  data () {
    return {};
  },
  computed: {
    ...mapGetters(['$user'])
  },
  methods: {
    logOut () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.logoutReq();
        })
        .catch(() => { });
    },
    // 退出请求
    async logoutReq () {
      try {
        let res = await logout();
        this.$router.push({ name: loginRouterName });
        sessionStorage.clear();
        if (res.code !== 0) {
          notify.warn(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

};
</script>
<style scoped lang="scss">
.eleHead {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  box-sizing: border-box;
  width: 100%;
  min-width: 800px;
  height: 80px;
  padding-right: 15px;
  background: #fff;
}

.eleHeads::after {
  display: block;
  width: 100%;
  height: 80px;
  content: "";
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  width: 200px;
  height: 100%;
}

.logo i {
  line-height: 80px;
  text-align: center;
}

h2 {
  float: left;
  height: 100%;
  padding-left: 30px;
  font-size: 22px;
  line-height: 80px;
}

.back {
  float: right;
  height: 45px;
  line-height: 80px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #df0007;
  }
}

.user {
  float: right;
  padding-right: 30px;
  line-height: 80px;
}

.logo-img {
  width: 150px;
}
</style>
