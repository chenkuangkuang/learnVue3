<template>
  <!-- <h1 :title="name">{{ msg }}</h1> -->
  <!-- <NewCom /> -->
  <LeafletCom />
</template>

<script>
import NewCom from "./NewCom.vue";
import LeafletCom from "./LeafletCom.vue";

export default {
  name: "HelloWorld",
  components: {
    NewCom,
    LeafletCom,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      name: "123",
      count: 0,
      message: "输入值",
      arr: [1, 2, 3],
    };
  },
  methods: {
    reverseMessage() {
      console.log("123", 123);
      this.name = this.name.split("").reverse().join("");
    },
  },
};
</script>

<style scoped>
h1 {
  color: red;
}

.h2 {
  color: gray;
}

img {
  width: 50px;
}
</style>
