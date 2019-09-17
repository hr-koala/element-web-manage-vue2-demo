<template>
    <div>
      <header-top></header-top>
      <section class="data_section">
        <header class="section_title">数据统计</header>
        <el-row :gutter="20" style="margin-bottom: 10px;">
          <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div></el-col>
        </el-row>
      </section>
      <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>

    import HeaderTop from '../components/HeaderTop'
    import tendency from '../components/tendency'
    import dtime from 'time-formater'
    // import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    import api from '../api/api'

    export default {
      name: "Home",
      data() {
        return {
          userCount: null,
          orderCount: null,
          adminCount: null,
          allUserCount: null,
          allOrderCount: null,
          allAdminCount: null,
          sevenDay: [],
          sevenDate: [[], [], []],
        }
      },
      components: {
        HeaderTop,
        tendency,
      },
      mounted() {
        this.getData();
        for (let i = 6; i > -1; i--) {
          const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD')
          this.sevenDay.push(date)
        }
        this.getSevenData();
      },
      computed: {},
      methods: {
        getData() {
          const today = dtime().format('YYYY-MM-DD')
          console.log(today)
          this.userCountFun(today)
          this.orderCountFun(today)
          this.adminDayCountFun(today)
          this.getUserCountFun()
          this.getOrderCountFun()
          this.adminCountFun()

        },


        userCountFun(today){
          console.log(today)
          api.userCount(today).then(data=>{
            console.log(data)
            const res = data.data
            this.userCount = res.count;
          }).catch(err=>{
            console.log(err)
          })
        },
        orderCountFun(today){
          api.orderCount(today).then(data=>{
            console.log(data)
            const res = data.data
            this.orderCount = res.count;
          }).catch(err=>{
            console.log(err)
          })
        },
        adminDayCountFun(today){
          api.adminDayCount(today).then(data=>{
            console.log(data)
            const res = data.data
            this.adminCount = res.count;
          }).catch(err=>{
            console.log(err)
          })
        },
        getUserCountFun(){
          api.getUserCount().then(data=>{
            console.log(data)
            const res = data.data
            this.allUserCount = res.count;
          }).catch(err=>{
            console.log(err)
          })
        },
        getOrderCountFun(){
          api.getOrderCount().then(data=>{
            console.log(data)
            const res = data.data
            this.allOrderCount = res.count;
          }).catch(err=>{
            console.log(err)
          })
        },
        adminCountFun(){
          api.adminCount().then(data=>{
            console.log(data)
            const res = data.data
            this.allAdminCount = res.count;
          }).catch(err=>{
            console.log(err)
          })
        },
        getSevenData() {
          const apiArr = [[], [], []];
          this.sevenDay.forEach(item => {
            apiArr[0].push(this.userCountFun(item))
            apiArr[1].push(this.orderCountFun(item))
            apiArr[2].push(this.adminDayCountFun(item))
          })
          const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
          Promise.all(promiseArr).then(res => {
            const resArr = [[], [], []];
            res.forEach((item, index) => {
              if (item.status == 1) {
                resArr[Math.floor(index / 7)].push(item.count)
              }
            })
            this.sevenDate = resArr;
          }).catch(err => {
            console.log(err)
          })
        },
      }
    }
</script>

<style lang="less" scoped>
  @import '../styles/mixin';
  .data_section{
    padding: 20px;
    margin-bottom: 40px;
  .section_title{
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list{
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #E5E9F2;
  .data_num{
    color: #333;
    font-size: 26px;

  }
  .head{
    border-radius: 6px;
    font-size: 22px;
    padding: 4px 0;
    color: #fff;
    display: inline-block;
  }
  }
  .today_head{
    background: #FF9800;
  }
  .all_head{
    background: #20A0FF;
  }
  }
  .wan{
  .sc(16px, #333)
  }
</style>
