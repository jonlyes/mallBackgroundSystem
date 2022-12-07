<template>
    <el-row>
        <!-- 左侧区域 -->
        <el-col :span="16" class="login bg-indigo-500 text-white font-sans">
            <span class="text-4xl font-bold m-2">商城后台管理系统</span>
            <span class="m-4 text-stone-50 font-light">欢迎来到jonlyes搭建的商城后台管理系统，请进行登录使用！</span>
        </el-col>
        <!-- 右侧区域 -->
        <el-col :span="8" class="login">
            <!-- 标题文本区域 -->
            <div class="w-250px text-center">
                <span class="text-4xl font-bold m-4 text-center">欢迎回来</span>
                <el-divider content-position="center">账号密码登录</el-divider>
            </div>
            <!-- 账号密码区域 -->
            <el-form class="w-250px" :rules="rules" :model="userInfo" ref="formRef">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="userInfo.username" class="login-info" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 密码框 -->
                <el-form-item prop="password" @keyup.enter="login">
                    <el-input v-model="userInfo.password" class="login-info" placeholder="请输入密码" type="password">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 登录按钮 -->

                <el-form-item>
                    <el-button type="primary" color="#626aef" class="w-250px text-white" round :loading="isLoad"
                        @click="login">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive, } from 'vue'
import { useRouter } from 'vue-router' //路由
import message from '@/utils/message.js' //消息弹出工具函数
import { useStore } from 'vuex'
//路由器(注意：useRouter创建实例对象必须在顶部创建，否则拿到的是undefined)
const router = useRouter()
const store = useStore()

// 用户账号信息
let userInfo = reactive({
    username: '',
    password: ''
})

const isLoad = ref(false) //button是否加载状态

// 表单节点
let formRef = ref(null)

// 表单验证规则
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 9, message: '用户名的长度在3到9位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 9, message: '密码长度在3到9位', trigger: 'blur' },
    ]
})


// 登录函数
const login = () => {
    formRef.value.validate((valid) => {
        // 判断表单验证是否通过，false就return
        if (!valid) {
            return undefined
        }
        isLoad.value = true //表单校验成功就开启load
        // 登录成功
        store.dispatch('login', userInfo).then(() => {
            // 消息提示
            message('登录成功')
            // 跳转首页
            router.push('/')
        }).finally(() => {
            isLoad.value = false //无论是否登录成功，最终都要把load设置为false
        })
    })
}
</script>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.el-divider__text.is-center {
    @apply font-normal text-sm text-gray-500/50;
}
</style>

