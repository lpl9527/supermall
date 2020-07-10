<template>
  <div class="wrapper" ref="wrapper">    <!--ref属性绑定组件，通过this.$refs.wrapper拿到组件对象。绑定元素，拿到的就是元素对象。-->
    <div class="content">
      <slot></slot> <!--放置要滚动的内容-->
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'   //引入滚动组件

  export default {
    name: "Scroll",
    data(){
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0    //不监听滚动位置
      },
      pullUpLoad: {
        type: Boolean,
        default: false  //默认不监听加载更多
      }
    },
    mounted() {   //在组件创建完毕后绑定滚动事件
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,  //是否监听滚动位置
        pullUpLoad: this.pullUpLoad //是否监听上拉加载更多
      })
      //2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
      //3.监听上拉加载更多事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300){   //ES6语法给形参滚动时间默认值300毫秒
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
