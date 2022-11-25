<template>
    <!-- tags标签导航 -->
    <div class="tag-list" :style="{ 'left': $store.state.asideWidth }">
        <el-tabs v-model="routerTab" type="card" class="demo-tabs" style="min-width: 100px" @tab-remove="delTag"
            @tab-click="handelTab">
            <el-tab-pane v-for="item, index of tagList" :closable="item.name !== '/'" :key="index" :label="item.title"
                :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <!-- 导航功能下拉菜单 -->
        <span class="dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="delOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item @click="removeTags">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <!-- 主体路由页 -->

    <el-scrollbar height="657.6px">
        <!-- 内容区域 -->
        <div>
            <!-- 主体区域 -->
            <div class="mx-10px mt-34px" v-resize>
                <router-view></router-view>
            </div>
            <!-- 站点信息 -->
            <div class="siteInfo">
                <span class="leading-50px text-neutral-400">本站点根据源项目由<span class="siteTitle"
                        @click="github">《Jonlyes》</span>搭建的练手vue3+element项目</span>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { setTagsList, getTagsList, removeTagsList } from '@/utils/tagsList.js'
const router = useRouter()
const route = useRoute()

//定义局部自定义指令 v-resize
const vResize = {
  mounted(el) {
    // main区域rem自适应
    const el_resize = new window.ResizeObserver(() => {
      let size = el.offsetWidth / 80.375 + 'px'
      document.querySelector("html").style.fontSize = size
    });
    el_resize.observe(el);
  },
}


const github = () => {
    location.href = 'https://github.com/jonlyes'
}

// 路由导航列表
const tagList = ref([])

// 激活的路由导航
let routerTab = ref(route.path)


// 路由导航初始化
const initRouteNav = () => {
    let tags = getTagsList()
    if (tags) {
        tagList.value = tags
    } else {
        tagList.value.push({
            title: '后台首页',
            name: '/',
        })
    }
    // 判断tagList是否存在当前路由

    if (route.path !== '/' && !tagList.value.some((item) => item.name === route.path)) {
        console.log(route.path);
        tagList.value = [
            {
                title: '后台首页',
                name: '/',
            }, {
                title: route.meta.title,
                name: route.path,
            }]
    }
}
initRouteNav()

//点击路由导航跳转
const handelTab = ({ props }) => {
    router.push(props.name)
}

// 添加tab
const addTag = (path, meta) => {
    tagList.value.push({ title: meta.title, name: path })
    // 将当前的tagsList存储到cookies
    setTagsList(tagList.value)
}

// 删除tab
const delTag = (path) => {
    // 根据index删除路由
    const index = tagList.value.findIndex((item) => item.name == path)
    tagList.value.splice(index, 1)
    setTagsList(tagList.value)
}
// 删除全部tag
const removeTags = () => {
    tagList.value.splice(1)
    setTagsList(tagList.value)
    router.push('/')
}

//删除其他
const delOther = () => {
    // 清空tagsList并存储在本地的tagsList
    removeTagsList()
    tagList.value = []
    // 重新初始化路由导航
    initRouteNav()
    // 将路由导航列表存储到cookie
    setTagsList(tagList.value)
}

// 路由守卫
onBeforeRouteUpdate(({ path, meta }) => {
    routerTab.value = path
    // 判断路由是否已经push过了，没有push过就push进去
    if (!tagList.value.some(item => item.name == path)) {
        addTag(path, meta)
    }
})
</script>

<style scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.dropdown {
    @apply h-32px leading-32px p-8px bg-white rounded mb-8px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

:deep(.el-tabs--card>.el-tabs__header) {
    @apply border-0 m-0;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
    padding-left: 10px !important;
    padding-right: 10px !important;
    @apply border-0 bg-white mx-1 rounded h-32px leading-32px;
}

:deep(.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2)) {
    @apply p-0;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: 0px;
}

:deep(.el-tabs__nav-prev) {
    @apply h-32px w-32px leading-32px text-16px;
}

:deep(.el-tabs__nav-next) {
    @apply h-32px w-32px leading-32px text-16px;
}

:deep(.el-tabs__item:hover) {
    color: #303133;
}

:deep(.is-icon-close) {
    width: 14px !important;

}

:deep(.el-tabs__item.is-active) {
    @apply text-indigo-700;
}

.siteInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    @apply my-35px;

}

.siteTitle {
    text-decoration: underline;
    @apply text-purple-400 ring-purple-400 inline-block mx-2px;
}
</style>
 