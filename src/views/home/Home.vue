<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <swiper>
      <swiper-item v-for="banner in banners">   <!--遍历展示轮播图-->
        <a :href="banner.link">
          <img :src="banner.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar"; //导入首页导航栏组件
  import {getHomeMultiData} from "../../network/home";    //导入首页数据请求方法
  import {Swiper, SwiperItem} from 'components/common/swiper'   //导入轮播图组件


  export default {
    name: "Home",
    components: {
      NavBar,
      Swiper,
      SwiperItem
    },
    data(){
      return {
        banners: [],
        recommends: []
      }
    },
    created() {   //在首页组件加载完成时请求首页的数据
      //1.请求首页多个数据
      getHomeMultiData().then(res => {  //函数执行过后产生的数据都会被销毁，所以要保存在data中
        console.log(res)
        //将数据放入
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
