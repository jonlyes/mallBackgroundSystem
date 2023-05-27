<template>
    <el-dialog v-model="diaSkuShow" title="规格选择" width="76.6rem" class="my-50px">
        <div class="common-layout">
            <el-container>
                <el-aside width="220px">
                    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="selectFn">
                        <el-scrollbar height="400px" always>
                            <el-menu-item v-for="item, index in skuData.list" :index="String(index)"
                                class="flex justify-between">
                                {{ item.name }}
                            </el-menu-item>
                        </el-scrollbar>
                        <el-pagination small background layout="prev, next" :total="Number(skuData.total)"
                            class="my-5px flex justify-center" @current-change="skusPageFn" />
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-checkbox-group v-model="checkSkuValues">
                        <el-checkbox v-for="value, index in skuValues" :label="value" :key="index" :border="true" />
                    </el-checkbox-group>
                </el-main>
            </el-container>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="diaSkuShow = false">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// 弹窗的显示状态
const diaSkuShow = ref(false)

// 激活的菜单index
const activeIndex = ref('0')

// 规格数据
const skuData = reactive({
    list: [],
    total: 0,
})

// 当前规格菜单下的值
const skuValues = ref([])

// 选择的规格选项值
const checkSkuValues = ref([])

// 回调函数将数据传回父组件
const callBackFn = ref(null)

// 初始化弹窗页面
const initSkuList = (page) => {
    store.dispatch('getSkusList', page).then(res => {
        skuData.list = res.list
        skuData.total = res.totalCount
        skuValues.value = res.list[0].default.split(',')
    })
}

initSkuList(1)

// 规格列表页码改变触发的回调
const skusPageFn = (page) => {
    initSkuList(page)
}

// 点击菜单触发的回调
const selectFn = (index) => {
    skuValues.value = skuData.list[index].default.split(',')
}

// 确定提交功能
const handleConfirm = () => {
    if (typeof callBackFn.value === 'function') {
        diaSkuShow.value = false
        callBackFn.value({
            name: skuData.list[activeIndex.value].name,
            value: checkSkuValues.value,
        })
    }
}

// 打开弹窗
const open = (fn = null) => {
    callBackFn.value = fn
    diaSkuShow.value = true
}

defineExpose({
    open
})

</script>

<style scoped>
.common-layout {
    @apply rounded;
    border: 1px solid #e5e7eb;
    overflow: hidden;
}
</style>
