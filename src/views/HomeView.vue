<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button plain @click="qwe">getAuth</el-button>
    <el-button plain @click="ppp">resettoken</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getAuthMenu} from "@/api/user";
import {mapGetters} from "vuex";
import {getDictList} from "@/api/dict";

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ])
  },
  data() {
    return {
      dictionaryList: []
    }
  },
  methods: {
    qwe() {
      console.log(this.permission_routes)
      getDictList().then(res => {
        this.dictionaryList = res.data
      })

    },
    ppp() {
      this.$store.dispatch('user/resetToken');

    }
  }
}
</script>

