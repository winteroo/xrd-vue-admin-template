import { notify } from './notify';
/**
 * 函数防抖
 * @param {*} fn：执行函数
 * @param {*} delay ：等待时长
 */
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
};
/**
 * 函数节流
 * @param {*} fn：执行函数
 * @param {*} delay：等待时长
 */

const throttle = (fn, delay) => {
  let prev = Date.now();
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  };
};

/**
 * 获取当前窗口除了多余高度外的高度
 * @param {Number} extraH 多余的高度
 */
const getWinHeight = (extraH = 326) => {
  let H = window.innerHeight;
  if (H < 600) {
    H = 600;
  }
  return H - extraH;
};

/**
 * @description: 限制文件类型
 * @param {string} fileName：文件路径
 * @param {array} acceptType：接受的文件类型 ['pdf', 'png']
 * @return {boolean}
 */
const limitFileType = (fileName, acceptType) => {
  let index = fileName.lastIndexOf('.');
  let fileType = fileName.slice(index);
  if (acceptType.indexOf(fileType) > -1) {
    return true;
  } else {
    let acceptStr = acceptType.join(',');
    notify(`仅支持${acceptStr}类型的文件`, 'W');
    return false;
  }
};

/**
 * @description: 文件大小限制
 * @param {number} size：文件大小
 * @param {number} limitSize：文件限制大小（单位：m）
 * @return {boolean}
 */
const limitFileSize = (size, limitSize = 10) => {
  let fileSize = size / 1024 / 1024;
  if (fileSize >= limitSize) {
    notify(`上传文件不能大于${limitSize}M`, 'W');
    return false;
  } else {
    return true;
  }
};

/**
 * @description:检查当前元素的内容是否超出了
 * @param {dom} el：当前元素发
 * @return {boolean}
 */
const checkIsEllipsis = (el) => {
  if (el) {
    let box = el;
    console.log(box.scrollWidth, box.offsetWidth);
    if (box.scrollWidth > box.offsetWidth) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export {
  debounce,
  throttle,
  getWinHeight,
  limitFileType,
  limitFileSize,
  checkIsEllipsis
};
