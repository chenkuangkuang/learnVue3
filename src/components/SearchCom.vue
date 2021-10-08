<template>
  <el-select
    v-model="curCountry"
    placeholder="选择国家"
    @change="changeCountry"
  >
    <el-option
      v-for="item in allContries"
      :key="item.name"
      :label="item.name"
      :value="item.name"
    >
    </el-option>
  </el-select>
</template>

<script>
import allCountriesGeojson from "./allCountriesGeojson.json";
import allContries from "../allContries";
export default {
  name: "SearchCom",
  props: ["focusMapCountry"],
  data() {
    return {
      allContries,
      curCountry: "",
    };
  },
  mounted() {},
  methods: {
    changeCountry(countryName) {
      console.log("=countryName=", countryName, allCountriesGeojson);
      const matchCountry = allCountriesGeojson.features.find(
        (i) => i.properties.cname == countryName
      );
      this.focusMapCountry(matchCountry);
    },
    focusSelectCountry(targetCountry) {
      console.log("=targetCountry=", targetCountry);
      this.curCountry = targetCountry.properties.cname;
    },
  },
};
</script>

<style scoped>
.el-select {
  position: absolute;
  left: 50%;
  bottom: 40px;
  z-index: 999;
  transform: translateX(-50%);
}
</style>

 <style lang = "scss" scoped>
$myRed: #000;

.top {
  color: $myRed;
}
</style>
