<template>
    <!-- 商品数据展示 -->
    <div v-loading="isLoad">
        <el-table ref="tableRef" :data="data?.list" stripe style="width: 100%" @selection-change="selectionFn">
            <el-table-column type="selection" width="55" />
            <el-table-column label="商品" width="300">
                <template #default="scope">
                    <div class="flex h-99px pt-10px">
                        <div class="h-100%">
                            <el-image class="w-50px h-50px rounded" :src="scope.row.cover" />
                        </div>
                        <div class="flex-1 px-10px text-left">
                            <div>{{ scope.row.title }}</div>
                            <div>
                                <span class="text-red-500">￥{{ scope.row.min_price }}</span>
                                <span class="mx-6px font-thin text-neutral-200">|</span>
                                <span class="text-xs">￥{{ scope.row.min_oprice }}</span>
                            </div>
                            <div class="text-neutral-400 text-xs">分类：{{ scope.row.category?.name }}</div>
                            <div class="text-neutral-400 text-xs">创建时间：{{ scope.row.create_time }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sale_count" label="实际销量" width="70" />
            <el-table-column label="商品状态" width="60">
                <template #default="scope">
                    <div class="flex">
                        <el-tag type="success" v-if="scope.row.status == 1">上架</el-tag>
                        <el-tag type="danger" v-else>仓库</el-tag>...
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="120">
                <template #default="scope">
                    <div v-if="scope.row.ischeck == 0">
                        <div>
                            <el-button type="success" size="small" plain class="my-4px w-100px"
                                @click="isAuditFn(scope.row.id, 1)">审核通过</el-button>
                        </div>
                        <div>
                            <el-button type="danger" size="small" plain class="my-4px w-100px"
                                @click="isAuditFn(scope.row.id, 2)">审核拒绝</el-button>
                        </div>
                    </div>
                    <span class="text-center" v-if="scope.row.ischeck == 1">通过</span>
                    <span class="text-center" v-if="scope.row.ischeck == 2">拒绝</span>
                </template>
            </el-table-column>
            <el-table-column prop="stock" label="总库存" width="90" />
            <el-table-column label="操作" min-width="240px">
                <template #default="scope">
                    <slot name="operation">
                        <div class="operation">
                            <a @click="openModify(scope.row)">修改</a>
                            <a @click="openSpecifications(scope.row.id)">商品规格</a>
                            <a>设置轮播图</a>
                            <a>商品详情</a>
                            <a>删除</a>
                        </div>
                    </slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 修改功能 -->
    <div>
        <!-- 侧边抽屉 -->
        <Form-Drawer ref="drawerRef" title="修改" size="45%" destroyOnClose @submitFn="modifyFn">
            <template #default>
                <Shop-Form ref="shopFrom" :data="dataInfo" :cates="data?.cates"></Shop-Form>
            </template>
        </Form-Drawer>
    </div>
    <!-- 商品规格功能 -->
    <div v-loading="skuLoad">
        <!-- 侧边抽屉 -->
        <Form-Drawer ref="skuRef" title="设置商品规格" size="70%" destroyOnClose>
            <template #default>
                <Specifications-Form :skuRef="skuRef">
                </Specifications-Form>
            </template>
        </Form-Drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import FormDrawer from '@/components/FormDrawer.vue'
import ShopForm from '@/view/page/GoodsManagement/Goods/components/ShopForm.vue'
import SpecificationsForm from '@/view/page/GoodsManagement/Goods/components/SpecificationsForm.vue'

import { goodId, initSkuCardList } from '@/hooks/useSku.js' //商品规格hooks函数

import message from '@/utils/message.js' //消息提示

const store = useStore()

//接收父组件传递的值
const props = defineProps({
    data: Object,
    isLoad: Boolean,
})

// 获取drawer抽屉的实例
const drawerRef = ref(null)

// 获取skuRef抽屉的实例
const skuRef = ref(null)

//获取shopFrom组件的实例
const shopFrom = ref(null)

// 当前选中的商品数据
const checkedRowData = ref([])

// 拿到table的信息
const tableRef = ref(null)

// 商品规格弹窗的load状态
const skuLoad = ref(false)

// 商品多选的重置功能
const resetFn = () => {
    tableRef.value.clearSelection()
}

//选中表格checkbox触发的回调
const selectionFn = (selection) => {
    checkedRowData.value = selection
}

//审核是否通过
const isAuditFn = (id, isCheck) => {
    store.dispatch('auditShop', { id, isCheck }).then(res => {
        message('操作成功')
    }).catch(err => {
        console.log(err);
    })
}

// 商品信息
const dataInfo = ref(null)

//打开修改抽屉
const openModify = (data) => {
    dataInfo.value = data
    drawerRef.value.open()
}

// 抽屉的表单提交事件触发回调修改请求
const modifyFn = () => {
    store.dispatch('modifyShop', { id: dataInfo?.value?.id, data: dataInfo?.value }).then(res => {
        message('修改成功')
    }).catch(err => {
        console.log(err);
    })
}

// 打开商品规格抽屉
const openSpecifications = (id) => {
    goodId.value = id
    skuLoad.value = true
    store.dispatch('readShopInfo', goodId.value).then(res => {
        initSkuCardList(res)
        skuLoad.value = false
        skuRef.value.open()
    }).catch(err => {
        console.log(err);
    })
}

// 向父组件暴露方法属性
defineExpose({
    checkedRowData,
    resetFn,
})

</script>

<style scoped>
:deep(.el-tag) {
    @apply px-6px py-2px h-auto;
}
</style>
