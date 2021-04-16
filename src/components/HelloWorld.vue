<template>
  <h1 :title='name'>{{ msg }}</h1>
  <h2 class="h2">{{name}} +++ </h2>
  <button @click="reverseMessage">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <p><input v-model="message" /></p>
  <p>{{message}}</p>
  <ul>
    <li v-for="item in arr">
      {{item}}
    </li>
  </ul>
  <NewCom />
</template>

<script>

import NewCom from './NewCom.vue'

export default {
  name: 'HelloWorld',
  components:{
    NewCom
  },
  props: {
    msg: String
  },
  data() {
    return {
      name: '123',
      count: 0,
      message: '输入值',
      arr: [1,2,3]
    }
  },
  methods:{
    reverseMessage(){
      console.log('123', 123);
      this.name = this.name.split('').reverse().join('');
    }
  },
}
</script>

<style scoped>

h1{
  color: red;
}

.h2{
  color: gray;
}

</style>
