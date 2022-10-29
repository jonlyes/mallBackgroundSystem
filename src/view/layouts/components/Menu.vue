<template>
    <div class="AsideMenu">
        <el-menu default-active="2" :router="true" :unique-opened="true" class="border-0" @select="handelSelect">
            <template v-for="item1, index of $store.state.userInfo.menus" :key="index">
                <!-- 有子菜单就遍历子菜单，无子菜单就直接展示子菜单 -->
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
import { ref, reactive, computed, toRaw } from 'vue'
// import {useRouter} from 'vue-router'
import { useStore, } from 'vuex'
// import store from '@/store/index.js'
const store = useStore()
const userInfo = store.state.userInfo
console.log(userInfo);



const handelSelect = (a) => {
    console.log(a);
}
</script>

<style scoped>
.AsideMenu {
    width: 250px;
    position: fixed;
    top: 64px;
    bottom: 0px;
    left: 0px;
}
</style>
