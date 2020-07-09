<template>
  <swiper>
    <swiper-item v-for="banner in banners">   <!--遍历展示轮播图-->
      <a :href="banner.link">
        <img :src="banner.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'  //导入轮播图组件

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>
