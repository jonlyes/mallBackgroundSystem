<template>
  <el-drawer v-model="isShowDrawer" :title="title" direction="rtl" :size="size" :destroy-on-close="destroyOnClose">
    <div class="DrawerForm">
      <!-- 表单 -->
      <div class="fromBody">
        <slot></slot>
      </div>

      <div class="actions">
        <!-- 提交/取消 -->
        <el-button type="primary" @click="confirmFn">{{confirmContext}}</el-button>
        <el-button @click="isShowDrawer = false">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
let isShowDrawer = ref(false) //是否显示抽屉

//打开抽屉
const open = () => { isShowDrawer.value = true }

//关闭抽屉
const close = () => { isShowDrawer.value = false }

// 接受父组件传的prop值
defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmContext: {
    type: String,
    default: '提交'
  }
})

// 接收父组件传的事件
const emit = defineEmits(['submitFn'])
// 触发父组件传的事件
const confirmFn = () => emit('submitFn')


// vue内置方法-暴露方法(vue默认是不暴露方法属性给父组件的，可以使用内置方法暴露指定要暴露的方法属性)
defineExpose({
  open,
  close,
})
</script>

<style scoped>
.DrawerForm {
  width: 100%;
  height: 100%;
  @apply flex flex-col;
}

.DrawerForm .fromBody {
  @apply flex-1 overflow-y-auto;
}

.DrawerForm .actions {
  @apply h-50px;
}
</style>