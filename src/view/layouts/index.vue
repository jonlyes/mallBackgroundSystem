<template>
  <div class="bg-neutral-100">
    <!-- layouts布局 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="bg-indigo-700 h-64px p-0 m-0">
        <Header></Header>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="250px" class="bg-stone-50">
          <Menu></Menu>
        </el-aside>
        <!-- 主题区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Header from '@/view/layouts/components/Header.vue' //头部组件
import Menu from '@/view/layouts/components/Menu.vue' //侧边菜单栏组件

</script>

<style scoped>
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 功能菜单图标 */
.options-icon {
  @apply align-middle text-gray-200 h-64px mb-6px cursor-pointer bg-light-100 bg-opacity-0;
}

.options-icon-hover {
  @apply w-42px hover: bg-opacity-10;
}

.userOption {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px 0 16px;
}

/* .el-aside {
  -ms-overflow-style: none;
  overflow: auto;
}

.el-aside::webkit-scrollbar {
  display: none;
} */
</style>