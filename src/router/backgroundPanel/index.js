// 后台模板
const masterStation = [
  {//主控台
    path: "/",
    meta:{
      title:'后台首页'
    },
    component: () => import("@/view/page/BackgroundPanel/MasterStation.vue"),
  },
];
export default masterStation