<template>
  <div class="layout">
    <transition name="fade-transform">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          :key="$route.fullPath"/>
      </keep-alive>
    </transition>
    <transition name="fade-transform">
      <router-view
        v-if="!$route.meta.keepAlive"
        :key="$route.fullPath"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
