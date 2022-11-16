<template>
    <div class="AsideMenu shadow-lg" :style="{ 'width': $store.state.asideWidth }">
        <el-menu class="border-0" :default-active="$route.path" :unique-opened="true" :collapse="isCollapse"
            @select="handelSelect">
            <template v-for="item1, index of userInfo.menus" :key="index">
                <!-- 有子菜单就包裹一级菜单并遍历子菜单，无子菜单就直接展示子菜单 -->
                <el-sub-menu v-if="item1.child && item1.child.length > 0" :index="item1.name">
                    <template #title>
                        <el-icon>
                            <component :is="item1.icon"></component>
                        </el-icon>
                        <span>{{ item1.name }}</span>
                    </template>
                    <el-menu-item v-for="item2 of item1.child" :index="item2.frontpath">
                        <template #title>
                            <el-icon>
                                <component :is="item2.icon"></component>
                            </el-icon>
                            <span>{{ item2.name }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item1.frontpath">
                    <template #title>
                        <el-icon>
                            <component :is="item1.icon"></component>
                        </el-icon>
                        <span>{{ item1.name }}</span>
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex' //vuex状态管理
const router = useRouter() //路由器
const store = useStore() //创建store实例对象

const userInfo = store.state.userInfo //拿到用户信息

//计算属性——通过计算state的asideWidth属性来确认是否展开侧边栏
let isCollapse = computed(() => store.state.asideWidth !== '250px')

const handelSelect = (routePath) => {
    router.push(routePath) //跳转路由
}
</script>

<style scoped>
.AsideMenu {
    position: fixed;
    top: 64px;
    bottom: 0px;
    left: 0px;
}
</style>
