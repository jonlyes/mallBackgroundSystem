<template>
    <!-- 404提示 -->
    <div class="error-info">
        <el-result
        icon="warning"
        title="404提示"
        sub-title="您的页面走丢了~"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    </div>
</template>

<script setup>
</script>
<style>
.error-info{
    @apply my-38;
}
</style>
