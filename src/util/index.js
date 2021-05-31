/**
 * @description 根据文件地址下载文件
 * @param {*} url 文件地址
 * @param {*} filename 文件名称 可选 不填会采用
 */
const downloadFileFromUrl = (url, filename) => {
  let link = document.createElement('a');
  link.href = url;
  // 加上会导致页面下载时闪烁
  // link.target = '_blank';
  if (filename) {
    link.download = filename;
  } else {
    let index = url.lastIndexOf('/') + 1;
    let selfFileName = url.substring(index);
    link.download = selfFileName;
  }
  if (getBrowserType() === 'ie') {
    link.target = '_blank';
  }
  link.click();
  link.remove();
};
/**
 * @deprecated 复制函数
 * @example Clipboard().copy(val); 调用复制函数
 */
const Clipboard = function () {
  let textArea,
    copy;

  // 判断是不是ios端
  function isOS () {
    return navigator.userAgent.match(/ipad|iphone/i);
  }
  // 创建文本元素
  function createTextArea (text) {
    textArea = document.createElement('textArea');
    textArea.innerHTML = text;
    textArea.value = text;
    document.body.appendChild(textArea);
  }
  // 选择内容
  function selectText () {
    let range,
      selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  // 复制到剪贴板
  function copyToClipboard () {
    let flag = false;
    try {
      if (document.execCommand('Copy')) {
        // alert('复制成功！');
        flag = true;
      }
    } catch (err) {
      // alert('复制错误！请手动复制！');
      flag = false;
    }
    document.body.removeChild(textArea);
    return flag;
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    let flag = copyToClipboard();
    return flag;
  };

  return {
    copy: copy
  };
};

const getBrowserType = () => {
  let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE || isIE11) {
    return 'ie';
  } else {
    return 'noie';// 不是ie浏览器
  }
};
// 获取IE版本
const IEVersion = () => {
  // 取得浏览器的userAgent字符串
  let userAgent = navigator.userAgent;
  // 判断是否为小于IE11的浏览器
  let isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  // 判断是否为IE的Edge浏览器
  let isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
  // 判断是否为IE11浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isLessIE11) {
    let IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
    // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
    IEReg.test(userAgent);
    // 取正则表达式中第一个小括号里匹配到的值
    let IEVersionNum = parseFloat(RegExp['$1']);
    if (IEVersionNum === 7) {
      // IE7
      return 7;
    } else if (IEVersionNum === 8) {
      // IE8
      return 8;
    } else if (IEVersionNum === 9) {
      // IE9
      return 9;
    } else if (IEVersionNum === 10) {
      // IE10
      return 10;
    } else {
      // IE版本<7
      return 6;
    }
  } else if (isEdge) {
    // edge
    return 12;
  } else if (isIE11) {
    // IE11
    return 11;
  } else {
    // 不是ie浏览器
    return -1;
  }
};

const randomPWD = (digit) => {
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const word = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let half = Math.floor(digit / 2);
  let surplus = digit - half;
  let numList = [];
  let surplusList = [];
  let newPwd = '';
  for (let i = 0; i < half; i++) {
    numList.push(num[Math.floor(Math.random() * 10)]);
  }
  for (let j = 0; j < surplus; j++) {
    surplusList.push(word[Math.floor(Math.random() * 26)]);
  }
  newPwd = numList.concat(surplusList).sort(function (a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  }).join('');
  return newPwd;
};

export {
  downloadFileFromUrl,
  Clipboard,
  getBrowserType,
  IEVersion,
  randomPWD
};
