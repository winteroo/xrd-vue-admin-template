/*
 * @Author: yangw
 * @Date: 2021-04-26 10:39:59
 * @Description: 注意使用以下两个混入方法时，保证每个组件都有name属性，否则会导致通知失败
 */

/**
 * @description:向下触发组件名为${componentName}的组件的${eventName}的事件，事件参数为${params}，适用于组件需要触发更低层组件的方法的情况
* @param {String} componentName:目标组件名称
* @param {String} eventName：目标组件触发的事件名称
* @param {array} rest：传递的参数
 * @return {undefined}
 */
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    let name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
    /**
     * @description: 向上触发组件名为${componentName}的组件的${eventName}的事件，事件参数为${params}，适用于子组件需要触发更高层组件的方法的情况
     * @param {String} componentName:目标组件名称
     * @param {String} eventName：目标组件触发的事件名称
     * @param {array} rest：传递的参数
     * @return {undefined}
     */
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
