<template>
  <div class="header_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--<el-dropdown @command="handleCommand" menu-align='start'>
      <img :src="baseImgPath + adminInfo.avatar" class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>-->
  </div>
</template>

<script>


    export default {
        name: "HeaderTop",
      data(){
        return {
        }
      },
      created(){

      },
      computed: {

      },
      methods: {

      }
    }
</script>

<style scoped>
  .header_container{
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }
  /*.avator{*/
  /*.wh(36px, 36px);*/
  /*  border-radius: 50%;*/
  /*  margin-right: 37px;*/
  /*}*/
  /*.el-dropdown-menu__item{*/
  /*  text-align: center;*/
  /*}*/
</style>
