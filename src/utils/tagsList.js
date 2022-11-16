// cookies插件封装tagsList工具函数
import { useCookies } from "@vueuse/integrations/useCookies";

const tagsKey = "tagsList";
const cookie = useCookies();

// 设置tagsList
export const setTagsList = (tagsList) => cookie.set(tagsKey, tagsList);

//获取tagsList
export const getTagsList = () => cookie.get(tagsKey);

// 删除tagsList
export const removeTagsList = () => cookie.remove(tagsKey);
