<template>
    <el-card class="box-card" shadow="never">
        <!-- header头部功能部分 -->
        <div>
            <!-- 头部——搜索模块 -->
            <div class="header-search">
                <!-- left-搜索功能 -->
                <div>
                    <el-row :span="24">
                        <el-form class="flex">
                            <!-- 商品搜索框 -->
                            <el-col :span="8" class="w-25.4581rem">
                                <el-form-item label="商品名称" size="small" class="ml-20px">
                                    <el-input v-model="searchText" :input-style="{ width: '19.2081rem' }"
                                        placeholder="商品名称" />
                                </el-form-item>
                            </el-col>
                            <!-- 分类选择框 -->
                            <el-col :span="8" class="w-25.4581rem">
                                <el-form-item label="商品分类" size="small" class="ml-40px" v-if="!isUnfold">
                                    <el-input v-model="searchText" :input-style="{ width: '11.85rem' }"
                                        placeholder="商品分类">
                                        <template #append>
                                            <el-select v-model="select" placeholder="Select">
                                                <el-option label="jonlyes" value="1" />
                                                <el-option label="jon" value="1" />
                                                <el-option label="ai" value="1" />
                                            </el-select>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <!-- 功能按钮 -->
                            <el-col :span="8" class="w-25.4581rem flex justify-end min-w-220px">
                                <el-button size="small" type="primary">搜索</el-button>
                                <el-button size="small">重置</el-button>
                                <el-button size="small" class="border-none text-blue-400" @click="isUnfold = !isUnfold">
                                    <span>{{ isUnfold == true ? '展开' : '收起' }}
                                        <el-icon>
                                            <component :is="isUnfold == true ? 'ArrowDown' : 'ArrowUp'"></component>
                                        </el-icon>
                                    </span>
                                </el-button>
                            </el-col>
                        </el-form>
                    </el-row>
                </div>
            </div>
        </div>
        <!-- tables数据展示区域 -->
        <div>
            <Goods-Table :data="tableData" :isLoad="isLoad" :btnOption="btnOption" @refresh="refresh" v-if="tableData?.list?.length">
                <template #operation>
                    <!-- <div>暂无操作</div> -->
                </template>
            </Goods-Table>
        </div>
        <!-- 分页功能 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="Number(tableData.totalCount)"
                @current-change="countPageFn" />
        </div>
    </el-card>
</template>

<script setup>
import { ref, watch } from 'vue' //vue
import { useStore } from 'vuex' //vuex状态管理
import GoodsTable from '@/view/page/GoodsManagement/components/GoodsTable.vue'
const store = useStore() //sore对象

const select = ref()



//接收父组件传递的值
const props = defineProps({
    ajaxOptions: Object,
    btnOption: Array
})

//搜索框的值
let searchText = ref(null)

//是否展开商品分类
let isUnfold = ref(true)

//加载状态
let isLoad = ref(false)

//商品数据
let tableData = ref([])

//当前页码值
let page = ref(1)

// 刷新数据——重新发起请求获取数据
const refresh = () => {
    isLoad.value = true //开启加载状态
    store.dispatch('getShopList', { page: page.value, query: props.ajaxOptions },).then(res => {
        tableData.value = res
    }).finally(() => {
        isLoad.value = false
    })
}

//重新计算page
const countPageFn = (newPage) => {
    page.value = newPage
}


// 监听page的改变,并且首屏加载初始化调用refresh获取数据渲染table
watch(page, refresh,
    { immediate: true })

</script>

<style>
.header-search {
    width: 77.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    @apply mt-20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.operation {
    text-decoration: underline;
    cursor: pointer;
    @apply mx-10px text-blue-400 text-xs;
}

.operation>a {
    @apply mx-8px;
}

:deep(.el-table__row) {
    height: 99px;
}

:deep(.el-table__row>td) {
    @apply p-0;
}

:deep(.el-table__header) {
    width: 100% !important;
}

:deep(.el-table__body) {
    width: 100% !important;
}

:deep(.cell) {
    text-align: center;
}

:deep(td>.cell) {
    @apply px-0;
}

:deep(td.el-table__cell) {
    height: 99px;
}

:deep(.el-table_1_column_2>.cell) {
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
}

:deep(.el-table_1_column_7>.cell) {
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
}

:deep(.el-table-column--selection>.cell) {
    @apply px-10px;
}
</style>
