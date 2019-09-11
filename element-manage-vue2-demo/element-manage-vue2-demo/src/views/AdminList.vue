<template>
  <div class="adminList_page">
    <header-top></header-top>
    <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="20" :offset="2">
        <div class="table_container">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              label="头像"
              width="50">
              <template slot-scope="scope">
              <!--   {{scope.row.avatar}}-->
                <el-image :src="baseImgPath+ scope.row.avatar" ></el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="注册日期"
              width="220">
            </el-table-column>
            <el-table-column
              prop="city"
              label="地址"
              width="180">
            </el-table-column>
            <el-table-column
              prop="admin"
              label="权限">
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
  import {baseUrl, baseImgPath} from "../config/env";
  import {adminList, adminCount} from '@/api/getData'
  import api from '../api/api'

  export default {
    name: "AdminList",
    data() {
      return {
        loading: false,
        baseUrl,
        baseImgPath,
        tableData: [],
        currentPage: 1,
        count: 0,
        offset: 0,
        limit: 20,

        currentRow: null,

      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        api.adminCount().then(data => {
          console.log(data)
          const _data = data.data
          if (_data.status == 1) {
            this.count = _data.count

          } else {
            throw new Error('获取数据失败');
          }
          this.getAdminDataList()
        }).catch(err => {
          console.log('获取数据失败', err)
        })
      },
      getAdminDataList() {
        const params = {
          offset: this.offset,
          limit: this.limit
        }
        api.adminList(params).then(data => {
          console.log(data)
          const res = data.data
          if (res.status == 1) {
            this.tableData = [];
            res.data.forEach(item => {
              const tableItem = {
                create_time: item.create_time,
                user_name: item.user_name,
                admin: item.admin,
                city: item.city,
                avatar: item.avatar,
                id: item.id,
                status: item.status,
              }
              this.tableData.push(tableItem)
            })
          } else {
              throw new Error('获取数据失败', res.message);
            }
        }).catch(err => {
          console.log('获取数据失败', err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.getAdminDataList()
      },

      async getAdmin() {
        try {
          const res = await adminList({offset: this.offset, limit: this.limit});
          if (res.status == 1) {
            console.log(res)
            this.tableData = [];
            res.data.forEach(item => {
              const tableItem = {
                create_time: item.create_time,
                user_name: item.user_name,
                admin: item.admin,
                city: item.city,
              }
              this.tableData.push(tableItem)
            })
          } else {
            throw new Error(res.message)
          }
        } catch (err) {
          console.log('获取数据失败', err);
        }
      }
    },
    computed: {},
    components: {
      HeaderTop
    }
  }
</script>

<style scoped>
  .adminList_page {

  }

  /*@import '../style/mixin.less';*/
  .table_container {
    padding: 20px;
  }
</style>
