<template class="flex">
  <div class="master" v-resize>
    <div class="master-item">
      <!-- 后台统计 -->
      <div class="card" v-for="item1, index of panels" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ item1.title }}</span>
              <el-button class="card-btn">{{ item1.unit }}</el-button>
            </div>
          </template>
          <span class="text-4xl font-black text-gray-500">{{ item1.value }}</span>
          <div>
            <el-divider />
          </div>
          <div class="body-item text-light font-medium body-item text-gray-400">
            <span>{{ item1.subTitle }}</span>
            <span>{{ item1.subValue }}</span>
          </div>
        </el-card>
      </div>
    </div>
    <!-- icon面板 -->
    <div class="master-item">
      <el-card class="icon-item" v-for="item2, index of iconOptions" :key="index" shadow="hover">
        <div class="icon-item" @click="jumpRoute(item2.path)">
          <el-icon :color="item2.color">
            <component :is="item2.icon"></component>
          </el-icon>
          <span>{{ item2.title }}</span>
        </div>
      </el-card>
    </div>

    <div class="master-item">
      <!-- 订单统计图表 -->
      <el-card class="order" shadow="never">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
            <div class="order-btn">
              <span v-for="item3 of orderBtn.list" :key="item3.index"
                :class="{ active: orderBtn.activeIndex == item3.index }"
                @click="initOrderChart(item3.type, item3.index)">{{ item3.label }}</span>
            </div>
          </div>
        </template>
        <!-- 订单统计图表容器 -->
        <div>
          <div class="order-charts">
            <div id="order-statistical" class="order-charts" v-loading="orderLoad"></div>
          </div>
        </div>
      </el-card>
      <!-- 店铺商品及交易提示 -->
      <div>
        <el-card class="store-tips" shadow="never">
          <template #header>
            <div class="card-header">
              <span>店铺及商品提示</span>
              <span class="tips-right">店铺及商品提示</span>
            </div>
          </template>
          <!-- 提示-item -->
          <div class="flex flex-row">
            <el-card shadow="hover" class="tips-item" v-for="item4, index of goodsOrderTips.goods" :key="index">
              <div class="mb-2 text-xl font-medium">{{ item4.value }}</div>
              <div class="font-light">{{ item4.label }}</div>
            </el-card>
          </div>
        </el-card>
        <el-card class="store-tips mt-10px" shadow="never">
          <template #header>
            <div class="card-header">
              <span>交易提示</span>
              <span class="tips-right">需要立即处理的交易订单</span>
            </div>
          </template>
          <!-- 提示-item -->
          <div class="flex flex-row">
            <el-card shadow="hover" class="tips-item" v-for="item5, index of goodsOrderTips.order" :key="index">
              <div class="mb-2 text-xl font-medium">{{ item5.value }}</div>
              <div class="font-light">{{ item5.label }}</div>
            </el-card>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts' //echarts图表库
const store = useStore() //状态管理
const router = useRouter() //路由器

// 订单统计图表
let orderCharts = null

//订单统计图表load效果
let orderLoad = ref(true)

//定义局部自定义指令 v-resize
const vResize = {
  mounted(el) {
    const el_resize = new window.ResizeObserver((entries) => {
      let size = entries[0].contentRect.width / 80.375 + "px";
      document.querySelector("html").style.fontSize = size
      // main每次改变宽度就重新获得订单统计图表的尺寸并让图表自适应
      const { offsetWidth: width, offsetHeight: height } = document.getElementsByClassName('order-charts')
      orderCharts?.resize(width, height)
    });
    el_resize.observe(el);
  },
}

//面板数据
const panels = ref([])

//icon面板配置
const iconOptions = ref([...store.getters.getIconOptions])

//订单统计面板btn
const orderBtn = ref({
  activeIndex: '1',
  list: [
    { label: '近1个月', type: 'month', index: '0', },
    { label: '近1周', type: 'week', index: '1', },
    { label: '近24小时', type: 'hour', index: '2', }
  ]
})

//订单统计数据
const orderData = ref({})

// 调用actions的getPanelsInfo方法获取数据
store.dispatch('getPanelsInfo').then((res) => {
  panels.value = res.panels
}).catch((err) => {
  console.log(err)
})

// icon面板路由跳转
const jumpRoute = (routePath) => {
  router.push(routePath)
}


//获取数据构建订单图表
const initOrderChart = (type = 'week', index = '1') => {
  orderLoad.value = true
  // 添加激活样式
  orderBtn.value.activeIndex = index
  // 调用actions的getPanelsInfo方法获取数据
  store.dispatch('getOrderData', type).then((res) => {
    // 存储订单图表的数据
    orderData.value = res
    // 拿到图表容器并初始化图表
    orderCharts = echarts.init(document.getElementById('order-statistical'));
    //订单图表配置
    orderCharts.setOption({
      xAxis: {
        type: 'category',
        data: [...orderData.value.x]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [...orderData.value.y],
          type: 'bar',
          showBackground: true,
        }
      ]
    })
  }).catch((err) => {
    console.log(err)
  }).finally(() => orderLoad.value = false)
}

//初始化订单统计图表
initOrderChart()

//店铺商品及交易提示
let goodsOrderTips = ref({})

// 获取店铺提示数据
store.dispatch('getShopTips').then(res => {
  goodsOrderTips.value = res
}).catch(err=>{
  console.log(err);
})
</script>

<style scoped>
.master {
  @apply flex flex-col;
}

.master-item {
  @apply mt-5 flex;
}

.card {
  @apply bg-white w-18.803rem mx-10px;
}

.card-btn {
  @apply text-lime-500 border-lime-500 text-xs font-semibold py-1 px-1.75 h-20px;
}

:deep(.order>.el-card__body) {
  @apply p-0;
}

.icon-item {
  display:flex;
  justify-content: center;
  align-items: center;
  @apply w-8.8238rem h-5.5rem mx-10px bg-white flex-col text-sm rounded;
}

.order {
  @apply w-38.9375rem mx-10px bg-white flex-col text-sm rounded;
}


.order-btn>span {
  @apply border-0 text-sm bg-neutral-100 text-neutral-400 font-bold m-0 mr-2 rounded py-0.5rem px-01rem;
}

.order-btn>span:hover {
  @apply bg-neutral-300;
}

.active {
  background-color: #d9ecff !important;
  color: #409eff !important;
}

.order-charts {
  @apply w-38.9375rem h-300px;
}

.store-tips {
  @apply w-38.9375rem h-200px;
}

.tips-right {
  border: #fab6b6 solid 1px;
  color: #f56c6c;
  @apply rounded text-xs px-2 py-1;
}

.tips-item {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply bg-neutral-100 w-7.7980rem text-center mx-10px h-6.3122rem;
}

:deep(.icon-item>.el-icon) {
  @apply mb-4px text-base;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.body-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-card) {
  border: 0;
}
</style>
