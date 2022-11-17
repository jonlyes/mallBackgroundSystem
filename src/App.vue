<template>
  <router-view></router-view>
</template>

<script setup>
</script>
<style>
#nprogress .bar {
  background-color: #f5f5f5 !important;
  height: 3px !important;
}
.tag-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 81.2rem;
    height: 44px;
    z-index: 100;
    @apply px-10px bg-neutral-100 pt-6px;
    position: fixed;
}
</style>
