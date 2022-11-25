// 商品管理模块的路由
const goodsManagement = [
  {
    //商品管理
    path: "/goods/list",
    meta:{
      title:'商品管理'
    },
    component: () => import("@/view/page/GoodsManagement/Goods/index.vue"),
  },
  {
    //分类管理
    path: "/category/list",
    meta:{
      title:'分类管理'
    },
    component: () => import("@/view/page/GoodsManagement/Category.vue"),
  },
  {
    //规格管理
    path: "/skus/list",
    meta:{
      title:'规格管理'
    },
    component: () => import("@/view/page/GoodsManagement/Skus.vue"),
  },
  {
    //优惠券管理
    path: "/coupon/list",
    meta:{
      title:'优惠券管理'
    },
    component: () => import("@/view/page/GoodsManagement/Coupon.vue"),
  },
];
export default goodsManagement