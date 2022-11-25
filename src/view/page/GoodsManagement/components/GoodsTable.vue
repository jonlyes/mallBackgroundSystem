<template>
    <!-- 头部——增删上下架功能模块 -->
    <div class="header-shopRole">
        <!-- 功能按钮 -->
        <div>
            <el-button v-for="btnItem, index of btnOption" :key="index" size="small" :type="btnItem.type"
                @click="btnItem.fn">{{ btnItem.name }}</el-button>
        </div>
        <!-- 刷新数据 -->
        <div>
            <el-icon class="refreshIcon" @click="refreshFn">
                <Refresh />
            </el-icon>
        </div>
    </div>
    <!-- 商品数据展示 -->
    <div v-loading="$props.isLoad">
        <el-table :data="data.list" stripe style="width: 100%">
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
                            <div class="text-neutral-400 text-xs">分类：{{ scope.row.category.name }}</div>
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
                <div>
                    <div class="px-10px">
                        <el-button type="success" size="small" plain class="my-4px w-100px">审核通过</el-button>
                    </div>
                    <div class="px-10px">
                        <el-button type="danger" size="small" plain class="my-4px w-100px">审核拒绝</el-button>
                    </div>
                    <!-- <span>通过</span> -->
                </div>

            </el-table-column>
            <el-table-column prop="stock" label="总库存" width="90" />
            <el-table-column label="操作" min-width="240px">
                <template #default="scope">
                    <slot name="operation">
                        <div class="operation">
                            <a>修改</a>
                            <a>商品规格</a>
                            <a>设置轮播图</a>
                            <a>商品详情</a>
                            <a>删除</a>
                        </div>
                    </slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import {ref} from 'vue'

//接收父组件传递的值
const props =defineProps({
    data: Object,
    isLoad:Boolean,
    btnOption: Array,
})


const emit = defineEmits(['refresh'])

const refreshFn = ()=>emit('refresh')

</script>

<style scoped>
.header-shopRole {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @apply mt-10px px-10px;
}

.refreshIcon:hover {
    border-bottom: #3b82f6 1px solid;
    @apply text-blue-500;
}


:deep(.el-tag) {
    @apply px-6px py-2px h-auto;
}
</style>
