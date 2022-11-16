//rem自适应插件
const resize = {
  mounted(el) {
    const el_resize = new window.ResizeObserver((entries) => {
      let size = entries[0].contentRect.width / 80.375 + "px";
      document.querySelector("html").style.fontSize = size
    });

    el_resize.observe(el);
  },
};
export default resize;