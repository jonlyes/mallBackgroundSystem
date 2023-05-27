<template>
  <table class="border">
    <thead>
      <tr>
        <th class="border" v-for="(th, thi) in tableThs" :key="thi" :width="th.width" :rowspan="th.rowspan"
          :colspan="th.colspan">{{ th.name }}</th>
      </tr>
      <tr>
        <th class="border" v-for="(th, thi) in skuLabels" :key="thi">{{ th.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border" v-for="(tr, tri) in goodSkusList" :key="tri">
        <td class="border text-center" v-for="(td, tdi) in tr.skus" :key="tdi">{{ td.value }}</td>
        <td class="border">
          <el-input v-model="tr.pprice" size="small" type="number"></el-input>
        </td>
        <td class="border">
          <el-input v-model="tr.oprice" size="small" type="number"></el-input>
        </td>
        <td class="border">
          <el-input v-model="tr.cprice" size="small" type="number"></el-input>
        </td>
        <td class="border">
          <el-input v-model="tr.stock" size="small" type="number"></el-input>
        </td>
        <td class="border">
          <el-input v-model="tr.volume" size="small" type="number"></el-input>
        </td>
        <td class="border">
          <el-input v-model="tr.weight" size="small" type="number"></el-input>
        </td>
        <td class="border">
          <el-input v-model="tr.code" size="small"></el-input>
        </td>

      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { initTable,skuCardList } from '@/hooks/useSku.js' //商品规格hooks函数

const {
  skuLabels,
  tableThs,
  goodSkusList
} = initTable()

// console.log(goodSkusList);
console.log(skuCardList.value);
</script>

<style scoped>

</style>
