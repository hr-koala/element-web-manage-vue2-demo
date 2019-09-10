<template>
    <div class="userList_page">
      <header-top></header-top>
      <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-col :span="18" :offset="2">
          <div class="table_container">
            <el-table
              :data="userTableData"
              stripe
              highlight-current-row
              style="width: 100%">
              <el-table-column
                type="index"
                width="100">
              </el-table-column>
              <el-table-column
                property="registe_time"
                label="注册日期"
                width="220">
              </el-table-column>
              <el-table-column
                property="username"
                label="用户姓名"
                width="220">
              </el-table-column>
              <el-table-column
                property="city"
                label="注册地址">
              </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="count">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>

  import HeaderTop from '@/components/HeaderTop'
  import { baseUrl, baseImgPath } from "../config/env";
  import { getUserList, getUserCount  } from "@/api/getData"
  import api from '../api/api'

  export default {
        name: "UserList",
      data(){
          return{
            loading:false,
            userTableData:[
              {registe_time: '2018-08-08', username: '小虎', city: '上海市金沙江路'},
              {registe_time: '2018-08-09', username: '小牛', city: '广州市金沙江路'},
            ],
            currentPage: 1,
            count: 0,
            currentRow: null,
            offset: 0,
            limit: 20,
          }
      },
      created(){
        // this.initData();
        // this.getDate()
      },
      methods:{
        getData(){
          api.getUserCount().then(data=>{
            console.log(data)
          }).catch(err=>{
            console.log('',err)
          })
        },
        async initData(){
          try{
            const countData = await getUserCount();
            if (countData.status == 1) {
              this.count = countData.count;
            }else{
              throw new Error('获取数据失败');
            }
            this.getUsers();
          }catch(err){
            console.log('获取数据失败', err);
          }
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.offset = (val - 1)*this.limit;
          this.getUsers()
        },
        async getUsers(){
          const Users = await getUserList({offset: this.offset, limit: this.limit});
          this.tableData = [];
          Users.forEach(item => {
            const tableData = {};
            tableData.username = item.username;
            tableData.registe_time = item.registe_time;
            tableData.city = item.city;
            this.tableData.push(tableData);
          })
        }
      },
      components:{
        HeaderTop
      }
    }
</script>

<style lang="less" scoped>
  @import '../styles/mixin';
  .table_container{
    padding: 20px;
  }
</style>
