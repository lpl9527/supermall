<template>
  <div id="home">

    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>    <!--导航栏-->

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">  <!--想要滚动的内容-->
      <home-swiper :banners="banners"/>     <!--轮播图-->
      <home-recommend :recommends="recommends"/>  <!--热点展示-->
      <featrue/>    <!--热卖图-->

      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>  <!--监听子组件的点击事件-->
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick()" v-show="isShowBackTop"/>   <!--返回顶部按钮，注意：想要监听组件的点击要加.native-->

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar"; //导入首页导航栏组件
  import BackTop from "../../components/content/backtop/BackTop";   //导入返回顶部按钮
  import TabControl from "../../components/content/tabControl/TabControl";  //导入商品列表分类
  import GoodsList from "../../components/content/goods/GoodsList";   //导入商品列表

  import HomeSwiper from "./child/HomeSwiper";   //导入轮播组件
  import HomeRecommend from "./child/HomeRecommend";  //导入热点展示
  import Featrue from "./child/Featrue";  //导入热卖图

  import {getHomeMultiData, getHomeGoods} from "../../network/home";  //导入首页数据请求方法
  import Scroll from "../../components/common/scroll/Scroll";   //导入滚动组件

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      NavBar,
      HomeRecommend,
      Featrue,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isShowBackTop: false
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
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 200)
      //监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       * 网络请求相关的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {  //函数执行过后产生的数据都会被销毁，所以要保存在data中
          //console.log(res)
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

          //结束BScroll对象的上拉加载后才能进行下一次上拉加载
          this.$refs.scroll.finishPullUp()
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 事件监听相关方法
       */
      debounce(func, delay){    //防抖动，节流函数
        let timer = null
        return function (...args) {
          if (timer){
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      tabClick(index){    //点击商品分类时
        console.log(index)
        switch (index) {    //修改了分类数据时与其相关的计算属性也会改变，就会重新加载商品数据
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
      },
      backClick() {   //滚到顶部事件
        this.$refs.scroll.scrollTo(0, 0, 500)  //调用子组件对象BScroll回到顶部
      },
      contentScroll(position){    //监听滚动的位置
        this.isShowBackTop =  (-position.y) > 1000  //位置小于-1000时显示回到顶部按钮
      },
      loadMore() {  //上拉加载更多事件
        this.getHomeGoods(this.currentType)   //调用方法加载当前页的后一页数据

        //手动刷新滚动，重新计算可滚动高度
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>  /*这个scoped的作用是里面的样式只作用于当前组件中的属性*/

  #home{
    /*padding-top: 44px;*/
    height: 100vh;    /*为home设置固定高度*/
    position: relative;
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
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
  }*/
</style>
