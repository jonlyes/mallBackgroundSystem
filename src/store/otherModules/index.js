import {
  getSymmanList,
  getImageList,
  editImageName,
  delImage
} from "@/api/otherModules/galleryManagement.js";

const galleryManagement = {
  state: {
  },
  getters: {},
  mutations: {},
  actions: {
    // 获取图库列表
    getSymmanList(store, { page }) {
      return new Promise((resolve, reject) => {
        getSymmanList(page)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取分类下的图片列表
    getImageList(store, { id, page }) {
      return new Promise((resolve, reject) => {
        getImageList(id, page)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 修改图片名称
    editImageName(store, { id, name }) {
      return new Promise((resolve, reject) => {
        editImageName(id, name)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //删除image图片
    delImage(store,{ids}){
      return new Promise((resolve, reject) => {
        delImage(ids).then(res=>{
          resolve(res)
        }).catch((err=>{
          reject(err)
        }))
      })
    }
  },
};

export default galleryManagement;
