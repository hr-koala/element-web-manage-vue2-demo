<template>
  <div class="manage_page mainContainer">
    <el-row >
      <el-col :span="24" style="height: 60px; ;line-height: 60px;">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <!--<el-dropdown @command="handleCommand" menu-align='start'>
          <img :src="baseImgPath + adminInfo.avatar" class="avator">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="signout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
      </el-col>
    </el-row>
    <div class="manage-main" style="min-height: 100%; ">
      <div class="manage-main-left">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo"
                 background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b" @open="handleOpen"
                 @close="handleClose" :collapse="isCollapse" theme="dark" router>
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i><span slot="title">数据管理</span></template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="userList">用户列表</el-menu-item>
              <el-menu-item index="shopList">商家列表</el-menu-item>
              <el-menu-item index="foodList">食品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">分组二</span>
              <el-menu-item index="orderList">订单列表</el-menu-item>
              <el-menu-item index="adminList">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i><span slot="title">添加数据</span></template>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i><span slot="title">图表</span></template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
            <el-menu-item index="newMember">用户数据</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i><span slot="title">编辑</span></template>
            <el-menu-item index="uploadImg">上传图片</el-menu-item>
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i><span slot="title">设置</span></template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
            <el-menu-item index="sendMessage">发送通知</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i><span slot="title">说明</span></template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="manage-main-right" >
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Manage",
    data() {
      return {
        isCollapse: false,
      }
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      }
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      }
    }
  }
</script>

<style scoped>
  .manage_page {

  }
  .manage-main{
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
  }
  .manage-main-right{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }
</style>
