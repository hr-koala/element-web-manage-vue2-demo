<template>
  <div class="visitor_page">
    <header-top></header-top>
    <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="20" :offset="2">
        <visitor-pie :pieData="pieData"></visitor-pie>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import HeaderTop from '@/components/HeaderTop'
  import {baseUrl, baseImgPath} from "../config/env";
  import VisitorPie from '@/components/VisitorPie'
  // import {getUserCity} from '@/api/getData'
  import api from '../api/api'

  export default {
    name: "Visitor",
    data() {
      return {
        loading: false,
        baseUrl,
        baseImgPath,
        pieData: {},

      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        api.getUserCity().then(data => {
          console.log(data)
          const res = data.data
          if (res.status == 1) {
            this.pieData = res.user_city;
          } else {
            throw new Error(res)
          }
        }).catch(err => {
          console.log('获取用户分布信息失败', err)
        })
      },
    },
    computed: {},
    components: {
      HeaderTop,
      VisitorPie,
    }
  }
</script>

<style scoped>
  .visitor_page {

  }
</style>
