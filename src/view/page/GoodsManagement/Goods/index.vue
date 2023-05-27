<template>
    <!-- 商品管理模块 -->
    <div class="goods">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane v-for="item of goodsTabOptions" :label="item.label" :name="item.name">
                <Goods-Card v-if="(activeName == item.name)" ref="goodsCardRef" :ajaxOptions="item.ajaxOptions"
                    :btnOption="item?.btnOption" />
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 新增功能 -->
    <div>
        <!-- 侧边抽屉 -->
        <Form-Drawer ref="drawerRef" title="新增" size="45%" destroyOnClose @submitFn="addShopFn">
            <template #default>
                <Shop-Form ref="shopFrom" :cates="goodsCardRef[0]?.tableData?.cates"></Shop-Form>
            </template>
        </Form-Drawer>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import GoodsCard from '@/view/page/GoodsManagement/Goods/components/GoodsCard.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import ShopForm from '@/view/page/GoodsManagement/Goods/components/ShopForm.vue'
import message from '@/utils/message.js' //消息提示

const store = useStore() //状态管理

//激活的tab页
const activeName = ref('1')

// 获取goodsCard的实例
const goodsCardRef = ref(null)

// 获取drawer抽屉的实例
const drawerRef = ref(null)

//获取shopFrom组件的实例
const shopFrom = ref(null)

// 传入数组对象过滤出id数组
const filterId = (arr) => {
    let idArr = []
    arr?.forEach(item => {
        idArr.push(item.id)
    });
    console.log(idArr);
    return idArr
}

//功能按钮配置
const btnOption = reactive({
    new: {
        name: '新增', type: 'primary', fn: () => {
            drawerRef.value.open()
        }
    },
    del: {
        name: '批量删除', type: 'danger', fn: (checkedArr) => {
            // 判断是否有选中表格的内容
            if (checkedArr?.length !== 0) {
                store.dispatch('delShop', filterId(checkedArr)).then(res => {
                    message('删除成功')
                }).catch(err => {
                    console.log(err);
                })

            } else {
                message('请先选中要删除的信息', 'error')
            }
        }
    },
    shelves: {
        name: '上架', type: 'default', fn: (checkedArr) => {
            // 判断是否有选中表格的内容
            if (checkedArr?.length !== 0) {
                store.dispatch('upDownShop', { ids: filterId(checkedArr), status: 1 }).then(res => {
                    message('操作成功')
                }).catch(err => {
                    console.log(err);
                })

            } else {
                message('请先选中要删除的信息', 'error')
            }
        }
    },
    undercarriage: {
        name: '下架', type: 'default', fn: (checkedArr) => {
            // 判断是否有选中表格的内容
            if (checkedArr?.length !== 0) {
                store.dispatch('upDownShop', { ids: filterId(checkedArr), status: 0 }).then(res => {
                    message('操作成功')
                }).catch(err => {
                    console.log(err);
                })

            } else {
                message('请先选中要删除的信息', 'error')
            }
        }
    },
    recoveryGoods: {
        name: '恢复商品', type: 'warning', fn: (checkedArr) => {
            // 判断是否有选中表格的内容
            if (checkedArr?.length !== 0) {
                store.dispatch('restoreShop', filterId(checkedArr)).then(res => {
                    message('操作成功')
                }).catch(err => {
                    console.log(err);
                })

            } else {
                message('请先选中要删除的信息', 'error')
            }
        }
    },
    wipeOut: {
        name: '彻底删除', type: 'danger', fn: (checkedArr) => {
            // 判断是否有选中表格的内容
            if (checkedArr?.length !== 0) {
                store.dispatch('wipeOutShop', filterId(checkedArr)).then(res => {
                    message('操作成功')
                }).catch(err => {
                    console.log(err);
                })
            } else {
                message('请先选中要删除的信息', 'error')
            }


        }
    },
})

// 定义功能按钮的配置过滤方法
const filterBtnFn = (btnArray) => {
    let obj = {}
    for (const item of btnArray) {
        obj[item] = btnOption[item]
    }
    return obj
}

// 商品Tab-pane配置
const goodsTabOptions = ref([
    { label: '全部', name: '1', ajaxOptions: { tab: 'all' }, btnOption: filterBtnFn(['new', 'del', 'shelves', 'undercarriage']) },
    { label: '审核中', name: '2', ajaxOptions: { tab: 'checking' }, btnOption: filterBtnFn(['new', 'del', 'shelves', 'undercarriage']) },
    { label: '出售中', name: '3', ajaxOptions: { tab: 'saling' }, btnOption: filterBtnFn(['new', 'del', 'undercarriage']) },
    { label: '已下架', name: '4', ajaxOptions: { tab: 'off' }, btnOption: filterBtnFn(['new', 'del', 'shelves']) },
    { label: '库存预警', name: '5', ajaxOptions: { tab: 'min_stock' }, btnOption: filterBtnFn(['new', 'del']) },
    { label: '回收站', name: '6', ajaxOptions: { tab: 'delete' }, btnOption: filterBtnFn(['new', 'recoveryGoods', 'wipeOut']) }
])

// 新增商品
const addShopFn = () => {
    store.dispatch('addShop', shopFrom.value.fromData).then(res => {
        goodsCardRef.value[0].refresh(1)
        drawerRef.value.close()
        message('新增成功')

    }).catch(err => {
        message(err, 'error')
    })
}

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

:deep(.el-tabs__content) {
    @apply bg-white rounded;
}
</style>
  