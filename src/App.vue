<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>

  import MainTabBar from "./components/content/tabbar/MainTabBar";    //导入底部导航栏

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
