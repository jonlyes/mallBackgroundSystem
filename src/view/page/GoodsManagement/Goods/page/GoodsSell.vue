<template>
  <!-- 出售中 -->
  <div>
    <Goods-Card :ajaxOptions="ajaxOptions" :btnOption="btnOption"></Goods-Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GoodsCard from '@/view/page/GoodsManagement/Goods/components/GoodsCard.vue'

let ajaxOptions = ref({
  tab: 'saling',
})

//功能按钮配置
const btnOption = ref([
  { name: '新增', type: 'primary', fn: () => { console.log(123); } },
  { name: '批量删除', type: 'danger', fn: () => { console.log(123); } },
  { name: '下架', type: 'default', fn: () => { console.log(123); } },
])

</script>

<style scoped>

</style>
