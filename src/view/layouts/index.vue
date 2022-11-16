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
        <el-aside class="bg-white" :style="{ 'width': $store.state.asideWidth }">
          <Menu></Menu>
        </el-aside>
        <!-- 主题区域 -->
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Header from '@/view/layouts/components/Header.vue' //头部组件
import Menu from '@/view/layouts/components/Menu.vue' //侧边菜单栏组件
import Main from '@/view/layouts/components/Main.vue' //主体区域组件

</script>

<style scoped>
.el-main {
  height: calc(100vh - 64px);
  @apply p-0 pt-10px mx-2px;
}
</style>