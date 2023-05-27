import { ref, nextTick, computed } from "vue";
import {
  addGoodSkuCard,
  editSkuCard,
  delSkuCard,
  sortSkuCard,
  addGoodSkuCardValue,
  editSkuCardValue,
  delSkuCardValue,
  setSkuCard,
} from "@/api/shopManagement/shopManagement.js";

import { upArray, downArray, cartesianProductOf } from "@/utils/sort.js";

// 当前商品的ID
export const goodId = ref(0);

//当前商品信息
export const goodInfo = ref([]);

//添加规格按钮load状态
export const btnLoad = ref(false);

//整个多规格页面的loading状态
export const bodyLoad = ref(false);

//商品规格的card列表
export const skuCardList = ref([]);

// 商品规格列表
export const goodSkusList = ref([]);

// 初始化规格选项列表
export const initSkuCardList = (data) => {
  goodInfo.value = data;
  skuCardList.value = data.goodsSkusCard.map((item) => {
    item.text = item.name;
    item.loading = false;
    item.goodsSkusCardValue.map((item2) => {
      item2.text = item2.value || "属性值";
      return item2;
    });
    return item;
  });
  goodSkusList.value = data.goodsSkus;
};

//初始化规格属性
export const initSkuCardItem = (id) => {
  const item = skuCardList.value.find((p) => p.id == id);
  const inputValue = ref("");
  const inputVisible = ref(false);
  const InputRef = ref(null);
  const loading = ref(false);

  // 删除
  const handleClose = (tag) => {
    loading.value = true;
    delSkuCardValue(tag.id)
      .then((res) => {
        item.goodsSkusCardValue.splice(item.goodsSkusCardValue.indexOf(tag), 1);
        getTable()
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // 显示input框
  const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
      InputRef.value.input.focus();
    });
  };

  // 创建
  const handleInputConfirm = () => {
    if (!inputValue.value) {
      inputVisible.value = false;
      inputValue.value = "";
      return;
    }
    loading.value = true;
    addGoodSkuCardValue({
      goods_skus_card_id: id, //规格ID
      name: item.name, //规格名称
      order: 50, //排序
      value: inputValue.value, //规格选项名称
    })
      .then((res) => {
        item.goodsSkusCardValue.push({
          ...res,
          text: inputValue.value,
        });
        getTable()
      })
      .finally(() => {
        loading.value = false;
        inputVisible.value = false;
        inputValue.value = "";
      });
  };

  // 修改
  const handleChange = (value, tag) => {
    loading.value = true;
    editSkuCardValue(tag.id, {
      goods_skus_card_id: tag.goods_skus_card_id, //规格ID
      name: tag.name, //规格名称
      order: 50, //排序
      value, //规格选项名称
    })
      .then((res) => {
        tag.value = tag.text;
        getTable()
      })
      .catch((err) => {
        tag.text = tag.value;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    item,
    inputValue,
    inputVisible,
    InputRef,
    loading,
    handleClose,
    showInput,
    handleInputConfirm,
    handleChange,
  };
};

// 添加商品规格
export const createSkuCard = () => {
  btnLoad.value = true;
  addGoodSkuCard({
    goods_id: goodId.value, //商品ID
    name: "规格名称", //规格名称
    order: 50, //排序
    type: 0, //规格类型 0文字
  })
    .then((res) => {
      skuCardList.value.push({
        ...res,
        text: res.name,
        loading: false,
        goodsSkusCardValue: [],
      });
    })
    .finally(() => {
      btnLoad.value = false;
    });
};

// 更新商品规格
export const updateSkuCard = (item) => {
  item.loading = true;
  editSkuCard(item.id, {
    goods_id: item.goods_id, //商品ID
    name: item.text, //规格名称
    order: item.order, //排序
    type: 0, //规格类型 0文字
  })
    .then((res) => {
      item.name = item.text;
    })
    .catch((err) => {
      item.text = item.name;
    })
    .finally(() => {
      item.loading = false;
    });
};

// 删除商品规格
export const removeSkuCard = (item) => {
  item.loading = true;
  delSkuCard(item.id)
    .then((res) => {
      const index = skuCardList.value.findIndex((i) => i.id == item.id);
      if (index !== -1) {
        skuCardList.value.splice(index, 1);
      }
      getTable()
    })
    .finally(() => {
      item.loading = false;
    });
};

// 排序规格选项
export const sortCard = (action, index) => {
  bodyLoad.value = true;
  const fn = action == "up" ? upArray : downArray;
  let orderList = JSON.parse(JSON.stringify(skuCardList.value));
  fn(orderList, index);
  sortSkuCard({
    sortdata: orderList.map((o, i) => {
      return {
        id: o.id,
        order: i + 1,
      };
    }),
  })
    .then((res) => {
      fn(skuCardList.value, index);
      getTable()
    })
    .finally(() => {
      bodyLoad.value = false;
    });
};

//选择设置规格选项和值
export const handleSetSkuCard = (id, data) => {
  let item = skuCardList.value.find((o) => o.id == id);
  item.loading = true;
  setSkuCard(id, data)
    .then((res) => {
      item.name = item.text = res.goods_skus_card.name;
      item.goodsSkusCardValue = res.goods_skus_card_value.map((v) => {
        v.text = v.value;
        return v;
      });
      getTable()
    })
    .finally(() => {
      item.loading = false;
    });
};

//初始化表格
export const initTable = () => {
  const skuLabels = computed(() =>
    skuCardList.value.filter((o) => o.goodsSkusCardValue.length > 0)
  );

  //获取表头
  const tableThs = computed(() => {
    let length = skuLabels.value.length;
    return [
      {
        name: "商品规格",
        colspan: length,
        width: "",
        rowspan: length > 0 ? 1 : 2,
      },
      {
        name: "销售价",
        width: "100",
        rowspan: 2,
      },
      {
        name: "市场价",
        width: "100",
        rowspan: 2,
      },
      {
        name: "成本价",
        width: "100",
        rowspan: 2,
      },
      {
        name: "库存",
        width: "100",
        rowspan: 2,
      },
      {
        name: "体积",
        width: "100",
        rowspan: 2,
      },
      {
        name: "重量",
        width: "100",
        rowspan: 2,
      },
      {
        name: "编码",
        width: "100",
        rowspan: 2,
      },
    ];
  });
  return {
    skuLabels,
    tableThs,
    goodSkusList,
  };
};

//获取规格表格数据
function getTable() {
  if (skuCardList.value.length === 0) return [];

  let list = [];
  skuCardList.value.forEach((v) => {
    if (v.goodsSkusCardValue && v.goodsSkusCardValue.length > 0) {
      list.push(v.goodsSkusCardValue);
    }
  });
  if (list.length == 0) return [];

  let arr = cartesianProductOf(...list)
  console.log(arr);
}
