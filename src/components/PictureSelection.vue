<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="220px">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="selectFn"
          v-loading="isClassifyLoad">
          <el-scrollbar height="400px" always>
            <el-menu-item v-for="item1, index of symanList?.list" :index="String(index)" class="flex justify-between">
              <span>{{ item1.name }}</span>
              <div>
                <!-- 编辑分类名称 -->
                <el-icon size="16px">
                  <Edit color="#409EFF" />
                </el-icon>
                <!-- 删除分类 -->
                <el-icon size="16px" class="ml-12px">
                  <Close color="#409EFF" />
                </el-icon>
              </div>
            </el-menu-item>
          </el-scrollbar>
          <!-- 分页功能 -->
        </el-menu>
        <el-pagination small background layout="prev, next" :total="Number(symanList?.totalCount)"
          class="my-5px flex justify-center" @current-change="symanPageFn" />
      </el-aside>
      <el-main class="p-0" v-loading="isImageLoad">
        <!-- 图片展示区域 -->
        <el-scrollbar height="388px" always class="h-388px">
          <!-- 图片展示区域 -->
          <div class="p-0.75rem" v-if="imageList">
            <el-row>
              <el-col :span="6" :sm="12" :md="6" v-for="item2, index of imageList?.list" :key="index"
                class="mb-10px px-10px">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" :class="{ 'border-[#409EFF]': item2.checked }">
                  <div style="width:100%;height: 150px;">
                    <el-image :src="item2.url" fit="cover" style="width:100%; height:150px;" />
                    <div style="width:100%; height:28px;" class="image-title">{{ item2.name }}</div>
                  </div>
                  <div class="flex justify-center items-center h-48px pt-10px">
                    <!-- 选择框 -->
                    <el-checkbox size="default" v-model="item2.checked" @change="checkedImageFn(item2)"></el-checkbox>
                    <!-- 重命名图片名称 -->
                    <el-button size="small" text type="primary" @click="openReNamedDialog(item2.id, item2.name)">
                      重命名</el-button>
                    <!-- 删除图片提示框 -->
                    <div>
                      <el-popconfirm title="是否要删除该图片？" width="180px" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="delImageFn([item2.id])">
                        <template #reference>
                          <!-- 删除图片 -->
                          <el-button size="small" text type="primary">删除</el-button>
                        </template>
                      </el-popconfirm>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 图片列表为空显示 -->
          <el-empty description="图片加载中" v-else />
        </el-scrollbar>
        <!-- 分页功能 -->
        <div class="h-50px flex justify-center items-center">
          <el-pagination background layout="prev, pager, next" :total="Number(symanList?.totalCount)"
            @current-change="imagePageFn" />
        </div>
      </el-main>
    </el-container>
  </div>
  <!-- 重命名弹出框 -->
  <div>
    <el-dialog v-model="isReNamedShow" width="30%" align-center>
      <template #default>
        <div>
          <span>重命名</span>
          <el-input v-model="reNamedIpt" class="my-20px" />
        </div>
      </template>
      <template #footer>
        <div>
          <el-button type="default" @click="isReNamedShow = false">取消</el-button>
          <el-button type="primary" @click="reNamedSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import message from '@/utils/message.js' //消息提示
const store = useStore()

//激活的菜单index
const activeIndex = ref("0")

// 当前选中的image的数据
const checkInfo = ref(null)

//是否开启图库分类的load状态
const isClassifyLoad = ref(false)

//是否开启图片展示区域的load状态
const isImageLoad = ref(false)

//是否显示重命名弹出框
const isReNamedShow = ref(false)

// 图库列表
const symanList = ref(null)

// 图片列表
const imageList = ref(null)

// 重命名输入框的值
const reNamedIpt = ref(null)

//当前的image的id
const activeImageId = ref(null)

//获取图库列表
const getSymanListFn = (page) => {
  isClassifyLoad.value = true
  store.dispatch('getSymmanList', { page }).then(res => {
    symanList.value = res
    getImageList(res.list[0].id, 1)
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    isClassifyLoad.value = false
  })
}

// 初始化请求数据
getSymanListFn(1)

// 获取分类下的图片列表
const getImageList = (id, page) => {
  if (!id) return
  isImageLoad.value = true
  store.dispatch('getImageList', { id, page }).then(res => {
    res.list.map((item => {
      item.checked = false
      return item
    }))
    checkInfo.value = null
    imageList.value = res

  }).catch(err => {
    console.log(err);
  }).finally(() => {
    isImageLoad.value = false
  })
}

// 点击菜单触发的回调
const selectFn = (index) => {
  getImageList(symanList.value.list[index].id, 1)
}

//分类页码改变触发的回调
const symanPageFn = (page) => {
  getSymanListFn(page)
}

//图片展示区域页码改变触发的回调
const imagePageFn = (page) => {
  getImageList(symanList.value.list[Number(activeIndex.value)].id, page)
}

// 打开重命名dialog并存储当前的id值以及初始化重命名输入框的值
const openReNamedDialog = (id, name) => {
  isReNamedShow.value = true
  activeImageId.value = id
  reNamedIpt.value = name
}

//重命名image名称
const reNamedSubmit = () => {
  store.dispatch('editImageName', { id: activeImageId.value, name: reNamedIpt.value }).then(res => {
    message("修改成功！")
    isReNamedShow.value = false
    // 重新获取图片
    getImageList(symanList.value.list[Number(activeIndex.value)].id, 1)
  }).catch(err => {
    message(err, "error")
    isReNamedShow.value = false
  })
}

// 选中当前image图片（单选）
const checkedImageFn = (data) => {
  // 边界判断——只能选中一张image图片
  if (!checkInfo.value || checkInfo?.value?.checked == false) {
    checkInfo.value = data
  } else if (!(data.id == checkInfo.value.id)) {
    data.checked = false
    return message('最多只能选中1张', 'error')
  }
  if (data.checked == false) {
    checkInfo.value = null
  }
}

//删除图片
const delImageFn = (ids) => {
  store.dispatch('delImage', { ids }).then(res => {
    message('删除成功')
    // 重新获取图片
    getImageList(symanList.value.list[Number(activeIndex.value)].id, 1)
  }).catch(err => {
    message(err, 'error')
  })
}

// 暴露属性给父组件
defineExpose({
  checkInfo
})
</script>
<style scoped>
.common-layout {
  @apply rounded;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.image-title {
  position: relative;
  top: -32px;
  z-index: 99;
  background-color: rgba(31, 41, 55, .5);
  color: #f3f4f6;
  @apply px-8px py-4px text-sm;
}

:deep(.el-dialog__body) {
  @apply py-0px;
}
</style>

<style>

</style>


