<template>
    <div class="tab-control">
      <div v-for="(title, index) in titles" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //将点击的分类传递到Home组件用于请求数据，子传父
        this.$emit('tabClick', index)
      }
    }

  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
