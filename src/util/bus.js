/*
 * @Date: 2020-12-09 18:05:14
 * @Description:
 * 1、尽量减少bus的使用，使用全局bus会容易导致重复监听的问题
 * 2、如果必须使用，需要在页面卸载时卸载对对应页面的事件监听
 */

import Vue from 'vue';

export default new Vue();
