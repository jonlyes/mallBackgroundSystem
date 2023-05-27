<template>
        <el-scrollbar height="h-[100%]">
            <el-form-item label="规格类型">
                <el-radio-group v-model="radioSku">
                    <el-radio :label="0" :border="true">单规格</el-radio>
                    <el-radio :label="1" :border="true">多规格</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 单规格 -->
            <div v-if="radioSku == 0">
                <el-form v-model="singleSku">
                    <el-form-item label="市场价格" label-width="90px">
                        <el-input type="number" class="w-21.47rem" v-model="singleSku.oprice">
                            <template #append>
                                <span>元</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="销售价格" label-width="90px">
                        <el-input type="number" class="w-21.47rem" v-model="singleSku.pprice">
                            <template #append>
                                <span>元</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="成本价格" label-width="90px">
                        <el-input type="number" class="w-21.47rem" v-model="singleSku.cprice">
                            <template #append>
                                <span>元</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" label-width="90px">
                        <el-input type="number" class="w-21.47rem" v-model="singleSku.weight">
                            <template #append>
                                <span>公斤</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品体积" label-width="90px">
                        <el-input type="number" class="w-21.47rem" v-model="singleSku.volume">
                            <template #append>
                                <span>立方米</span>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 多规格 -->
            <div v-else>
                <el-form-item label="添加规格">
                    <Sku-Card class="w-[100%]"></Sku-Card>
                </el-form-item>
                <el-form-item label="规格设置">
                    <Sku-Table class="w-[100%]"></Sku-Table>
                </el-form-item>
            </div>
        </el-scrollbar>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SkuCard from '@/view/page/GoodsManagement/Goods/components/SkuCard.vue'
import SkuTable from '@/view/page/GoodsManagement/Goods/components/SkuTable.vue'
import { goodInfo } from '@/hooks/useSku.js'//商品规格hooks函数

const props = defineProps({
    skuRef: Object
})

// 单规格/多规格
const radioSku = ref(goodInfo.value.sku_type)

// 单规格表单数据
const singleSku = reactive(goodInfo.value.sku_value
    || {
    oprice: 0,
    pprice: 0,
    cprice: 0,
    weight: 0,
    volume: 0
})


</script>

<style scoped>
</style>
