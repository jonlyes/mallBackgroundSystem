// 封装消息提示工具函数
import { ElNotification } from "element-plus";

const message = (
  message,
  type = "success",
  dangerouslyUseHTMLString = false
) => {
  ElNotification({
    type,
    message,
    duration: 3000,
    dangerouslyUseHTMLString: true,
  });
};

export default message;
