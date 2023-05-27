<template>
    <div v-loading="loading">
        <el-tag v-for="tag, index in item.goodsSkusCardValue" :key="index" class="mx-1 w-128px" closable :disable-transitions="false" effect="plain"
            @close="handleClose(tag)">
            <el-input v-model="tag.text" size="small" placeholder="规格值" class="tag-edit-input" @change="handleChange($event,tag)"></el-input>
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
            + 添加值
        </el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { initSkuCardItem } from '@/hooks/useSku.js' //商品规格hooks函数

const props = defineProps({
    skuCardId: [Number, String]
})

const {
    item,
    inputValue,
    inputVisible,
    InputRef,
    loading,
    handleClose,
    showInput,
    handleInputConfirm,
    handleChange,
} = initSkuCardItem(props.skuCardId)



</script>

<style scoped>

</style>
