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
                                    <el-input v-model="ajaxQuery.title" :input-style="{ width: '19.2081rem' }"
                                        placeholder="商品名称" />
                                </el-form-item>
                            </el-col>
                            <!-- 分类选择框 -->
                            <el-col :span="8" class="w-25.4581rem">
                                <el-form-item label="商品分类" size="small" class="ml-40px" v-if="!isUnfold">
                                    <el-select v-model="ajaxQuery.category_id" clearable placeholder="请选择商品分类">
                                        <el-option v-for="item in tableData.cates" :value-key="item.id"
                                            :label="item.name" :value="item.id" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- 功能按钮 -->
                            <el-col :span="8" class="w-25.4581rem flex justify-end min-w-220px">
                                <el-button size="small" type="primary" @click="searchFn">搜索</el-button>
                                <el-button size="small" @click="resetFn">重置</el-button>
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
            <Goods-Table ref="tableRef" :data="tableData" :isLoad="isLoad" :btnOption="btnOption" @refresh="refresh(page,ajaxQuery)"
                v-if="tableData?.list?.length">
                <template #operation>
                    <!-- <div>暂无操作</div> -->
                </template>
            </Goods-Table>
        </div>
        <!-- 分页功能 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="Number(tableData.totalCount)"
                @current-change="pageFn" />
        </div>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue' //vue
import { useStore } from 'vuex' //vuex状态管理
import GoodsTable from '@/view/page/GoodsManagement/components/GoodsTable.vue'

//接收父组件传递的值
const props = defineProps({
    ajaxOptions: Object,
    btnOption: Array
})

const store = useStore() //sore对象

const ajaxQuery = reactive({...props.ajaxOptions,title:'',category_id:null})

// 拿到子组件的信息
const tableRef =ref(null)

//是否展开商品分类
const isUnfold = ref(true)

//加载状态
const isLoad = ref(false)

//商品数据
const tableData = ref([])

//当前页码值
const page = ref(1)

// 刷新数据——重新发起请求获取数据
const refresh = (page, query) => {
    isLoad.value = true //开启加载状态
    store.dispatch('getShopList', { page, query },).then(res => {
        tableData.value = res
    }).finally(() => {
        isLoad.value = false
    })
}

//搜索功能
const searchFn = ()=>refresh(page.value,ajaxQuery)

//重置功能
const resetFn = ()=>{tableRef.value.resetFn()}

// 页码改变触发的回调
const pageFn = (newPage) => {
    refresh(newPage, ajaxQuery)
}

// 初始化商品列表
pageFn(1)

//暴露属性给父组件
defineExpose({
    tableData,
    refresh
})

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
