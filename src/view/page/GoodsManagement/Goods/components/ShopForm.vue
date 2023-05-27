<template>
    <el-scrollbar height="h-[100%]">
        <el-form v-model="fromData">
            <el-form-item label="商品名称" label-width="90px">
                <el-input v-model="fromData.title" placeholder="请输入商品名称，不能超过60个字符"></el-input>
            </el-form-item>
            <el-form-item label="封面" label-width="90px">
                <div class="rounded w-100px h-100px flex justify-center items-center border border-width-[1px] border-dashed cursor-pointer hover:bg-gray-100"
                    style="transition:all 1 0.3s ease 0s" @click="isShow = true">
                    <el-image v-if="fromData.cover" class="w-100px h-100px" fit="cover" :src="fromData.cover">
                    </el-image>
                    <el-icon v-else>
                        <Plus />
                    </el-icon>
                </div>
            </el-form-item>
            <el-form-item label="商品分类" label-width="90px">
                <el-select v-model="fromData.category_id" placeholder="请选择商品分类">
                    <el-option v-for="item of cates" :value-key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="商品描述" label-width="90px">
                <el-input type="textarea" v-model="fromData.desc"
                    placeholder="选填，商品卖点简述，例如：此款商品美观大方 性价比高 不容错过"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" label-width="90px">
                <el-input v-model="fromData.unit" class="w-17.725rem"></el-input>
            </el-form-item>
            <el-form-item label="总库存" label-width="90px">
                <el-input type="number" v-model="fromData.stock" class="w-14.18rem">
                    <template #append>
                        <span>件</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="库存预警" label-width="90px">
                <el-input type="number" v-model="fromData.min_stock" class="w-14.18rem">
                    <template #append>
                        <span>件</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="最低销售价" label-width="90px">
                <el-input type="number" v-model="fromData.min_price" class="w-14.18rem">
                    <template #append>
                        <span>元</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="最低原价" label-width="90px">
                <el-input type="number" v-model="fromData.min_oprice" class="w-14.18rem">
                    <template #append>
                        <span>元</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="库存显示" label-width="90px">
                <el-radio-group v-model="fromData.stock_display">
                    <el-radio :label="1" :border="true">是</el-radio>
                    <el-radio :label="0" :border="true">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上架" label-width="90px">
                <el-radio-group v-model="fromData.status">
                    <el-radio :label="0" :border="true">放入仓库</el-radio>
                    <el-radio :label="1" :border="true">立即上架</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </el-scrollbar>

    <!-- 封面图片 -->
    <el-dialog v-model="isShow" width="76.6rem" class="my-50px">
        <template #header>
            <slot slot="title"><span class="text-16px">图片选择</span></slot>
        </template>
        <template #default>
            <div>
                <Picture-Selection ref="picture"></Picture-Selection>
            </div>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="checkImage(picture)">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import PictureSelection from '@/components/PictureSelection.vue'
import message from '@/utils/message.js' //消息提示

//接受父组件传递的值
const props = defineProps({
    data: Object,
    cates: Array
})

// 获取PictureSelection组件的实例
const picture = ref(null)

// 是否显示dialog弹出框
const isShow = ref(false)

// 表单数据
const fromData = reactive(props.data || {
    title: '',
    category_id: null,
    cover: '',
    desc: '',
    unit: '件',
    stock: 200,
    min_stock: 10,
    status: 0,
    stock_display: 0,
    min_price: 1,
    min_oprice: 100
})

// 选中图片
const checkImage = (data) => {
    console.log(props.data);
    if (data?.checkInfo?.checked == true) {
        fromData.cover = data.checkInfo.url
        isShow.value = false
    } else {
        message('最少选择1张', 'error')
        isShow.value = true
    }
}

defineExpose({
    fromData
})
</script>

<style scoped>

</style>
