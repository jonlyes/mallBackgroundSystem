// 数组排序功能

// 升序功能
export const upArray = (arr, index) => {
  return sortArrFn(arr, index, index - 1);
};

// 降序功能
export const downArray = (arr, index) => {
  return sortArrFn(arr, index, index + 1);
};

// 数组排序函数
function sortArrFn(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

// sku排序算法
export function cartesianProductOf() {
    return Array.prototype.reduce.call(arguments, function(a, b) {
        var ret = [];
        a.forEach(function(a) {
            b.forEach(function(b) {
                ret.push(a.concat([b]));
            });
        });
        return ret;
    }, [
        []
    ]);
}
