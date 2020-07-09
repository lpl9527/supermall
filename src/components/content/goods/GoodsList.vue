<template>
    <div class="goods">
      <goods-list-item v-for="good in goods" :goods-item="good"/>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";  //导入商品项

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
