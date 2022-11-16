import { setTagsList, getTagsList } from "@/utils/tagsList.js"; //tagsList路由导航列表工具函数
const navList = {
  state() {
    return {
      tagsList: [], //路由导航列表
    };
  },
  mutations: {
    SET_TAG(state, { path, meta }) {
      state.tagsList.push(
        ...[
          {
            title: "后台首页",
            name: "/",
          },
          { title: meta.title, name: path },
        ]
      ); //
      setTagsList(state.tagsList); //存储路由导航
    },
  },
  actions: {
    setTag({ state: { tagsList }, commit }, { path, meta }) {
      if (!tagsList.some((item) => item.name == path)) {
        commit("SET_TAG", { path, meta });
      }
    },

    getTags() {
      return getTagsList();
    },
  },
};

export default navList;
