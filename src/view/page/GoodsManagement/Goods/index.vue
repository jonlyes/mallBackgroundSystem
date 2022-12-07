<template>
    <!-- 商品管理模块 -->
    <div class="goods">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="全部" name="1">
                <Goods-All v-if="activeName==1"></Goods-All>
            </el-tab-pane>
            <el-tab-pane label="审核中" name="2">
                <Goods-Audit v-if="activeName==2"></Goods-Audit>
            </el-tab-pane>
            <el-tab-pane label="出售中" name="3">
                <Goods-Sell v-if="activeName==3"></Goods-Sell>
            </el-tab-pane>
            <el-tab-pane label="已下架" name="4">
                <Goods-Shelves v-if="activeName==4"></Goods-Shelves>
            </el-tab-pane>
            <el-tab-pane label="库存预警" name="5">
                <Goods-Inventory v-if="activeName==5"></Goods-Inventory>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="6">
                <Goods-Recycle v-if="activeName==6"></Goods-Recycle>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import GoodsAll from '@/view/page/GoodsManagement/Goods/page/GoodsAll.vue' //全部商品
import GoodsAudit from '@/view/page/GoodsManagement/Goods/page/GoodsAudit.vue' //审核中
import GoodsSell from '@/view/page/GoodsManagement/Goods/page/GoodsSell.vue' //出售中
import GoodsShelves from '@/view/page/GoodsManagement/Goods/page/GoodsShelves.vue' //已下架
import GoodsInventory from '@/view/page/GoodsManagement/Goods/page/GoodsInventory.vue' //已下架
import GoodsRecycle from '@/view/page/GoodsManagement/Goods/page/GoodsRecycle.vue' //全部商品

const activeName = ref('1')

const handleClick = (tab, event) => {
    // console.log(tab, event)
}


// 新增商品功能

</script>
  
<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.goods {
    @apply mt-60px;
}

:deep(.el-tabs__item.is-active) {
    color: #409eff !important;
}

:deep(.el-tabs__content){
    @apply bg-white rounded;
}

</style>
  