<template>
    <!-- 添加规格 -->
    <div v-loading="bodyLoad">
        <div v-for="item, index in skuCardList" :key="item.id"
            v-loading="item.loading" class="my-8px">
        <el-card :body-style="{ padding: '8px' }" shadow="never" >
            <template #header class="!bg-[#f3f4f6]">
                <div class="card-header">
                    <!-- left —— 规格名称 -->
                    <div>
                        <el-input v-model="item.text" placeholder="规格名称" @change="updateSkuCard(item)">
                            <template #append>
                                <el-icon @click="diaSkuOpen(item)">
                                    <More />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <!-- right —— 功能按钮 -->
                    <div>
                        <el-button plain text size="small" icon="Top" color="#409eff" :disabled="index == 0"
                            @click="sortCard('up', index)">
                        </el-button>
                        <el-button plain text size="small" icon="Bottom" color="#409eff"
                            :disabled="index == skuCardList.length - 1" @click="sortCard('down', index)">
                        </el-button>
                        <el-popconfirm title="是否要删除该规格？" confirm-button-text="删除" cancel-button-text="取消" width="180px"
                            @confirm="removeSkuCard(item)">
                            <template #reference>
                                <el-button plain text size="small" icon="Delete" color="#409eff"></el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
            <div>
                <Sku-Card-Item :skuCardId="item.id"></Sku-Card-Item>
            </div>
        </el-card>
        </div>
        <el-button type="success" size="small" class="my-8px" :loading="btnLoad" @click="createSkuCard">添加规格</el-button>

        <!-- 规格选择弹窗 -->
        <Dialog-Sku ref="diaSkuRef"></Dialog-Sku>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SkuCardItem from '@/view/page/GoodsManagement/Goods/components/SkuCardItem.vue'
import DialogSku from '@/components/DialogSku.vue';
import { skuCardList, btnLoad, bodyLoad, createSkuCard, updateSkuCard, removeSkuCard, sortCard ,handleSetSkuCard} from '@/hooks/useSku.js' //商品规格hooks函数

const diaSkuRef = ref(null)

const diaSkuOpen = (item)=>{
    diaSkuRef.value.open((data)=>{
        handleSetSkuCard(item.id,data)
    })
}

</script>

<style scoped>
:deep(.el-card__header) {
    @apply bg-[#f3f4f6] px-8px py-12px;
}
</style>
