<template>
  <div class="login">
    <el-form
      ref="login"
      :model="login"
      :rules="rules"
      class="login-content">
      <el-form-item class="logo-content">
        <div class="logo-text">
          <label>管理平台模板</label>
        </div>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="login.name"
          type="text"
          size="medium"
          placeholder="账户名">
          <i
            slot="suffix"
            class="el-input__icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="login.password"
          type="password"
          size="medium"
          placeholder="账户密码">
          <i
            slot="suffix"
            class="el-input__icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifCode">
        <el-input
          v-model="login.verifCode"
          type="text"
          class="login-verification"
          size="medium"
          placeholder="验证码"
        />
        <div
          title="点击切换验证码"
          class="indetify-content"
          @click="refreshCode">
          <s-identify
            :identify-code="identifyCode"
            :content-width="contentWidth"
            :content-height="contentHeight"
            class="identify"
          />
        </div>
      </el-form-item>
      <el-form-item class="submit-btn xrd-btn">
        <el-button
          :loading="isLoggingin"
          size="large"
          type="primary"
          native-type="submit"
          @click.prevent="submitForm('login')"
        >登录</el-button>
      </el-form-item>
      <el-form-item class="forget-pwd submit-btn">
        <el-link
          class="forget-text"
          @click="forgetPwd">忘记密码</el-link>
      </el-form-item>
      <el-form-item
        v-show="login.isError"
        class="submit-btn">
        <label class="err-msg">{{ login.errMsg }}</label>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SIdentify from '@/components/identify.vue';
import { login } from '@/api/modules/login';
import md5 from 'js-md5';
import { mapGetters } from 'vuex';
import { adminMenuConfig } from '@/config/menuConfig.js';
export default {
  name: 'Login',
  components: {
    SIdentify
  },
  data () {
    return {
      contentHeight: 38,
      contentWidth: 124,
      login: {
        // 登录名
        name: 'admin',
        // 密码
        password: 'admin',
        // 验证码
        verifCode: '',
        // 错误信息
        errMsg: '',
        // 是否存在错误标志
        isError: false
      },
      // 正在登录标志
      isLoggingin: false,
      // 验证码
      identifyCode: '',
      // 验证码取值范围
      identifyCodes: '1234567890',
      rules: {
        name: [
          { required: true, message: '请输入账号名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账户密码', trigger: 'blur' }
        ],
        verifCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['$user'])
  },
  mounted () {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode () {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    // 验证登录名和密码
    async chenkLogin (account, password) {
      this.isLoggingin = true;
      let params = {
        loginName: account.trim(),
        password: md5(password.trim())
      };
      try {
        let res = await login(params);
        if (res.errCode === 0) {
          this.initSystem(res.data);
        } else {
          this.login.isError = true;
          this.login.errMsg = res.msg;
          this.refreshCode();
        }
        this.isLoggingin = false;
      } catch (err) {
        this.isLoggingin = false;
        this.notify.warn(err);
      }
    },
    // 初始化系统配置
    initSystem (data) {
      this.setState(data);
      this.initMenu(data);
      this.goSystem();
    },
    setState (data) {
      this.$store.commit('SET_TOKEN', data.token);
    },
    initMenu (data) {
      this.$store.commit('SET_MENU', adminMenuConfig);
    },
    goSystem () {
      this.$router.push({
        name: 'Home'
      });
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.login.verifCode === this.identifyCode) {
            // 验证码正确,消除错误提示信息
            if (this.login.isError) {
              this.login.isError = false;
              this.login.errMsg = '';
            }
            // 验证登陆名和密码
            this.chenkLogin(this.login.name, this.login.password);
          } else {
            // 验证码错误
            this.login.isError = true;
            this.login.errMsg = '验证码错误';
            // 刷新验证码
            this.refreshCode();
          }
        } else {
          return false;
        }
      });
    },
    // 忘记密码
    forgetPwd () { }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.login {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  background-color: rgb(39, 39, 39);

  @include flex-center();

  &-content {
    position: relative;
    width: 30%;
    max-width: 400px;
    padding: 30px 30px 0 30px;
    border-radius: 8px;

    /* background: rgba(255, 255, 255, 0.8); */
    box-shadow: 0 0 111px 20px rgba(0, 91, 234, 0.15);

    .submit-btn {
      margin-bottom: 10px !important;
    }

    .xrd-btn {
      text-align: center;

      button {
        width: 100%;
      }
    }

    .forget-pwd {
      position: relative;
      z-index: 1000;
      float: right;

      .forget-text {
        color: #108adf;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .logo-text {
      color: rgba(16, 76, 197, 0.8);
      font-weight: bold;
      font-size: 26px;
      letter-spacing: 8px;
      text-align: center;

      label {
        display: inline-block;
        height: 50px;
      }
    }

    .err-msg {
      margin-left: 10px;
      color: red;
    }

    .login-verification {
      float: left;
      width: 230px;
      overflow: hidden;
    }

    .indetify-content {
      float: right;
      height: 38px;
      overflow: hidden;
      cursor: pointer;

      .identify /deep/ canvas {
        border-radius: 5px;
      }
    }
  }
}
</style>
