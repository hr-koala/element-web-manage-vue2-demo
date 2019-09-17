<template>
    <div>
      <header-top></header-top>
      <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-col :span="20" :offset="2">
      <p class="explain_text">node-elm后台管理系统</p>
      <p class="explain_text">第一次登录的用户自动注册成为普通管理员</p>
      <p class="explain_text">普通管理员可以添加，修改信息</p>
      <p class="explain_text">超级管理员可以删除信息</p>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import HeaderTop from '@/components/HeaderTop'
    export default {
        name: "Explain",
      data(){
          return{
            loading:false,
          }
      },
      methods:{

      },
      components:{
          HeaderTop,
      }
    }
</script>

<style scoped>
  .explain_text{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
  }
</style>
