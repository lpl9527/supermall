<template>
  <div id="home">

    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>    <!--导航栏-->
    <home-swiper :banners="banners"/>     <!--轮播图-->
    <home-recommend :recommends="recommends"/>  <!--热点展示-->
    <featrue/>    <!--热卖图-->

    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>  <!--监听子组件的点击事件-->
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar"; //导入首页导航栏组件
  import TabControl from "../../components/content/tabControl/TabControl";  //导入商品列表分类
  import GoodsList from "../../components/content/goods/GoodsList";   //导入商品列表

  import HomeSwiper from "./child/HomeSwiper";   //导入轮播组件
  import HomeRecommend from "./child/HomeRecommend";  //导入热点展示
  import Featrue from "./child/Featrue";  //导入热卖图

  import {getHomeMultiData, getHomeGoods} from "../../network/home";  //导入首页数据请求方法

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      NavBar,
      HomeRecommend,
      Featrue,
      TabControl,
      GoodsList
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {   //在首页组件加载完成时请求首页的数据
      //1.请求首页多个数据
      this.getHomeMultiData()

      //2.请求商品数据并赋值给计算属性
      this.getHomeGoods('pop')
      //刚开始未打开的最好不要添加数据
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
      /**
       * 网络请求相关的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {  //函数执行过后产生的数据都会被销毁，所以要保存在data中
          console.log(res)
          //将数据放入
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch(err => {
          console.log(err)
        })
      },
      getHomeGoods(type) {
        //动态获取当前分类页码值加1作为参数
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res)
          //将商品追加到上面几页的商品列表中
          this.goods[type].list.push(...res.data.list)
          //将当前页码加1
          this.goods[type].page += 1
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 事件监听相关方法
       */
      tabClick(index){
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType  ='sell';
            break;
        }
      }
    }
  }
</script>

<style scoped>

  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;   /*固定分类栏目*/
    top: 44px;

    z-index: 9;
  }
</style>
