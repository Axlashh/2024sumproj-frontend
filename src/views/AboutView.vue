<template>
  <div class="mb-4">
    <el-button @click="ooo">Default</el-button>
    <el-button @click="kkk" type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>

  <div class="mb-4">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </div>

  <div class="mb-4">
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </div>

  <el-input v-model="input" style="width: 240px" placeholder="Please input" class="tt"/>

</template>

<script>
import {qwe} from "@/api/user";
import store from "@/store";

export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    ooo() {
      qwe().then(res => {
        console.log("222")
      })
    },
    kkk() {
      this.$store.dispatch('user/resetToken');
      console.log(store.getters.token)
    }
  }
}
</script>

<style lang="scss">
.el-input .el-input__wrapper {
  background: transparent;
}
</style>