<template>
  <div>
    <div class="options h-64px text-gray-200 leading-64px text-xl font-thin">
      <el-row class="text-center h-64px">
        <!-- title -->
        <div class="w-250px h-64px">
          <el-icon :size="20" class="options-icon mr-8px">
            <ElemeFilled />
          </el-icon>
          <span>商城系统</span>
        </div>
        <!-- 选项-left -->
        <div class="h-64px">
          <!-- 文字提示 -->
          <el-tooltip class="box-item" effect="dark" content="隐藏侧边栏" placement="bottom">
            <!-- 隐藏侧边栏 -->
            <el-icon :span="16" class="options-icon options-icon-hover">
              <Fold />
            </el-icon>
          </el-tooltip>
          <!-- 文字提示 -->
          <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
            <!-- 刷新 -->
            <el-icon :span="16" class="options-icon options-icon-hover">
              <Refresh @click="refresh($route.path)" />
            </el-icon>
          </el-tooltip>
        </div>
      </el-row>
      <!-- 选项-right -->
      <el-row class="h-64px">
        <div class="h-64px">
          <!-- 文字提示-GitHub -->
          <el-tooltip class="box-item" effect="dark" content="去到GitHub首页" placement="bottom">
            <!-- github -->
            <el-icon :span="16" class="options-icon options-icon-hover">
              <Position @click="getGithub" />
            </el-icon>
          </el-tooltip>
          <!-- 文字提示-全屏 -->
          <el-tooltip v-if="!isFullscreen" class="box-item" effect="dark" content="全屏" placement="bottom">
            <!-- 全屏 -->
            <el-icon :span="16" class="options-icon options-icon-hover">
              <FullScreen @click="toggle" />
            </el-icon>
          </el-tooltip>
          <!-- 文字提示-退出全屏 -->
          <el-tooltip v-else class="box-item" effect="dark" content="退出全屏" placement="bottom">
            <el-icon :span="16" class="options-icon options-icon-hover">
              <Aim @click="toggle" />
            </el-icon>
          </el-tooltip>
        </div>

        <!-- 下拉菜单 -->
        <el-dropdown placement="bottom-start">
          <div class="userOption h-64px mx-16px cursor-pointer text-sm font-normal text-gray-200">
            <el-avatar :size="25" :src="$store.state.userInfo.avatar" class="mx-4px" />
            <span class="mx-4px">{{ $store.state.userInfo.username }}</span>
            <el-icon :span="16" class="options-icon mt-6px">
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openEditorPassWord">
                <div class="accountOptionsHover">修改密码</div>
              </el-dropdown-item>
              <el-dropdown-item @click="logout">
                <div class="accountOptionsHover">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 右侧密码修改框 -->
        <form-drawer ref="drawerRef" title="修改密码" size="45%" destroyOnClose @submitFn="submitForm">
          <el-form :model="passWordForm" :rules="formRules">
            <el-form-item label="旧密码" label-width="80px" prop="oldpassword">
              <el-input v-model="passWordForm.oldpassword" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" label-width="80px" prop="password">
              <el-input v-model="passWordForm.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" label-width="80px" prop="repassword">
              <el-input v-model="passWordForm.repassword" autocomplete="off" />
            </el-form-item>
          </el-form>
        </form-drawer>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router' //路由
import FormDrawer from '@/components/FormDrawer.vue' //封装的DrawerForm组件
import { useFullscreen } from '@vueuse/core' //全屏组件
import store from '@/store/index.js' //状态管理
import { ElMessageBox } from 'element-plus' //消息弹出框
import Message from '@/utils/message.js' //消息提示框
import { removeToken } from '@/utils/cookies.js' //删除token
const router = useRouter() //创建router实例对象

const {
  //全屏状态
  isFullscreen,
  // 全屏切换方法
  toggle
} = useFullscreen()

//drawerRef
const drawerRef = ref(null)


//密码页表单的数据
let passWordForm = reactive({
  oldpassword: '',
  password: '',
  repassword: ''
})

//密码表单验证规则
let formRules = reactive({
  oldpassword: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' },
    { min: 3, max: 8, message: '旧密码的长度在3到8位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 3, max: 8, message: '新密码的长度在3到8位', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { min: 3, max: 8, message: '确认密码的长度在3到8位', trigger: 'blur' }
  ]
})

// 刷新事件
const refresh = () => location.reload()

// 跳到github首页
const getGithub = () => location.href = 'https://github.com/jonlyes'

// 退出登录
const logout = () => {
  ElMessageBox.confirm(
    '是否要退出登录',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 确定退出调用
      removeToken() //删除cookies的token值
      router.push('/login')
      Message('退出登录成功！')
    }).finally(() => {
      drawerRef.value.close()
    })
}

//弹出修改密码页面
const openEditorPassWord = () => drawerRef.value.open()

// 修改密码
const submitForm = () => {
  drawerRef.value.validate((valid)=>{
    // 判断表单验证是否通过，false就return
    if(!valid){
      return
    }
    store.dispatch('updatePassWord', passWordForm).then(() => {
    // 确定退出调用
    removeToken(); //删除cookies的token值
    router.push("/login"); //跳转到登录页
    Message("修改密码成功，请重新登录！");
  }).finally(() => {
    drawerRef.value.close()
  });
  })
}

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

/* 修改密码/退出登录-hover */
.accountOptionsHover {
  @apply bg-sky-200 bg-opacity-0 hover: bg-opacity-30 hover:text-sky-400;
}
</style>