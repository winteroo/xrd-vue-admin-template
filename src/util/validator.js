import {
  phoneReg,
  passwordReg
} from './reg.js';

export const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'));
  } else {
    if (!passwordReg.test(value)) {
      callback(new Error('密码必须包含字母和数字，不能超过16个字符且不能小于8个字符'));
    } else {
      callback();
    }
  }
};

export const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'));
  } else {
    if (!phoneReg.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  }
};
