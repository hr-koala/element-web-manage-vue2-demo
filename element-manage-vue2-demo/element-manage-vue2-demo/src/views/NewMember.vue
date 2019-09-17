<template>
    <div class="newMember_page">
      <header-top></header-top>
      <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-col :span="20" :offset="2">
        </el-col>
      </el-row>
    </div>
</template>

<script>

  import HeaderTop from '@/components/HeaderTop'

    export default {
        name: "NewMember",
      data(){
          return{
            loading:false,

          }
      },
      created() {
      },
      methods:{

      },
      components:{
          HeaderTop,
      }
    }
</script>

<style scoped>
.newMember_page{

}
</style>
