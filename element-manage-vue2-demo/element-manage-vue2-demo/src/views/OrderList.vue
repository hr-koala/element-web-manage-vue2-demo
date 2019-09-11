<template>
  <div class="orderList_page">
    <header-top></header-top>
    <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="20" :offset="2">
        <div class="table_container">
          <el-table
            :data="tableData"
            @expand-change = "expand"
            :expand-row-keys='expendRow'
            :row-key="row => row.index"
            style="width: 100%">
            <!--   @expand='expand'-->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="用户名" >
                    <span>{{ props.row.user_name }}</span>
                  </el-form-item>
                  <el-form-item label="用户名 ID" >
                    <span>{{ props.row.user_id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺名称">
                    <span>{{ props.row.restaurant_name }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.restaurant_id }}</span>
                  </el-form-item>
                  <el-form-item label="收货地址 ID">
                    <span>{{ props.row.address_id }}</span>
                  </el-form-item>
                  <el-form-item label="收货地址 ">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>

                  <el-form-item label="店铺地址">
                    <span>{{ props.row.restaurant_address }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="订单 ID"
              prop="id">
            </el-table-column>
            <el-table-column
              label="总价格"
              prop="total_amount">
            </el-table-column>
            <el-table-column
              label="订单状态"
              prop="status">
            </el-table-column>
            <el-table-column
              label="订单创建日期"
              prop="formatted_created_at">
            </el-table-column>
          </el-table>
          <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
              background
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
  // import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'
  import { baseUrl, baseImgPath } from "../config/env";
  import api from '../api/api'

  export default {
        name: "OrderList",
      data(){
          return{
            loading:false,
            baseUrl,
            baseImgPath,
            tableData: [],
            currentRow: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            restaurant_id: null,
            expendRow: [],

            restaurant:{},
            userInfo :{},
            addressInfo:{},
          }
      },
      created() {
        // this.restaurant_id = this.$route.query.restaurant_id;
        this.getData();
      },
      methods:{
          getData(){
            let restaurant_id = this.$route.query.restaurant_id;
            console.log(restaurant_id)
            this.restaurant_id = restaurant_id ? restaurant_id : 1
            // this.restaurant_id = this.$route.query.restaurant_id;
            const params = {
              restaurant_id: this.restaurant_id
            }
            api.getOrderCount(params).then(data=>{
              console.log(data)
              const countData = data.data;
              if (countData.status == 1) {
                this.count = countData.count;
              }else{
                throw new Error('获取数据失败');
              }
              this.getOrders();
            }).catch(err=>{
              console.log('获取数据失败',err)
            })
          },
        getOrders(){
            const params ={
              offset: this.offset,
              limit: this.limit,
              restaurant_id: this.restaurant_id,
            }
            api.getOrderList(params).then(data=>{
              console.log(data)
              const Orders = data.data;
              this.tableData = [];
              Orders.forEach((item, index) => {
                const tableData = {};
                tableData.id = item.id;
                tableData.formatted_created_at = item.formatted_created_at
                tableData.total_amount = item.total_amount;
                tableData.unique_id = item.unique_id;
                tableData.total_quantity = item.total_quantity;
                tableData.status = item.status_bar.title;
                tableData.sub_title = item.status_bar.sub_title;
                tableData.user_id = item.user_id;
                tableData.restaurant_id = item.restaurant_id;
                tableData.address_id = item.address_id;
                tableData.restaurant_image_url = item.restaurant_image_url;
                tableData.restaurant_name = item.restaurant_name;
                tableData.index = index;
                this.tableData.push(tableData);
              })
            }).catch(err=>{
              console.log(err)
            })

        },

        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.offset = (val - 1)*this.limit;
          this.getOrders()
        },

        expand(row, status){
          if (status) {
            api.getResturantDetail(row.restaurant_id).then(data=>{
              console.log(data)
              this.restaurant = data.data;
              this.getUserInfo(row);
            }).catch(err=>{
              console.log('err',err)
            })
          }else{
            const index = this.expendRow.indexOf(row.index);
            this.expendRow.splice(index, 1)
          }
        },
        getUserInfo(row){
          api.getUserInfo(row.user_id).then(data=>{
            console.log(data)
            this.userInfo = data.data;
            this.getAddressById(row);
          }).catch(err=>{
            console.log('err',err)
          })
        },
        getAddressById(row){
          api.getAddressById(row.address_id).then(data=>{
            console.log(data)
            this.addressInfo = data.data;
            this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: this.restaurant.name, restaurant_address: this.restaurant.address, address: this.addressInfo.address, user_name: this.userInfo.username}});
            console.log(this.tableData)
            this.$nextTick(() => {
              this.expendRow.push(row.index);
            })
          }).catch(err=>{
            console.log('err',err)
          })
        },
      },
      computed:{

      },
      components:{
          HeaderTop
      }
    }
</script>

<style scoped>
  /*@import '../style/mixin.less';*/
  .table_container{
    padding: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
