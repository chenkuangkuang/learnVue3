<template>
  <div class="container">
    <ul
      class="news"
      :style="{ left: curLeft + 'px' }"
      @mouseover="stopMove"
      @mouseout="startMove"
    >
      <li v-for="news in allNews" :key="news.id">{{ news.newsName }}</li>
    </ul>
  </div>
  <input type="text" placeholder="搜索框" />
</template>

<script>
import allNews from "../data.js";

export default {
  name: "NewCom",
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  data() {
    console.log("=allNews=", allNews);
    return {
      curLeft: 0,
      allNews,
      timer: null,
    };
  },
  mounted() {
    this.startMove();
  },
  methods: {
    startMove() {
      // console.log("= this.curLeft=", this.curLeft);
      this.curLeft -= 3;
      this.timer = setTimeout(() => {
        this.startMove();
      }, 50);
    },
    stopMove() {
      console.log('stopMove', this.timer);
      clearTimeout(this.timer);
      // this.timer = null;
    },
    continueMove(){
      console.log('continueMove',);
      this.startMove();
    }
  },
};
</script>

<style scoped>
* {
  list-style: none;
}
.container {
  position: relative;
  width: 900px;
  height: 50px;
  overflow: hidden;
  margin: 0 auto;
}
.news {
  position: absolute;
  left: 0;
  white-space: nowrap;
}
.news li {
  display: inline-block;
  margin-right: 20px;
}
</style>
