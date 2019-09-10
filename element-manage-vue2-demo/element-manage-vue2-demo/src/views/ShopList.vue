<template>
  <div class="shopList_page">
    <header-top></header-top>
    <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="20" :offset="2">
        <el-table :data="shopTableData" stripe border style="width: 100%;"
                  @selection-change="handleSelectionTableChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="店铺名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="销售量">
                  <span>{{ props.row.recent_order_num }}</span>
                </el-form-item>
                <el-form-item label="分类">
                  <span>{{ props.row.category}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="店铺名称" prop="name"></el-table-column>
          <el-table-column label="店铺地址" prop="address"></el-table-column>
          <el-table-column label="店铺介绍" prop="description"></el-table-column>
          <el-table-column label="店铺 ID" prop="shopId"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="操作 " width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="success" @click="addFood(scope.$index, scope.row)">添加食品</el-button>
              <el-button size="mini" type="danger" @click="handleDeleteFood(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="Pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[10, 20, 30, 40]" :page-size="20" layout="total, sizes, prev, pager, next, jumper"
                         :total="count">
          </el-pagination>
        </div>

        <el-dialog title="修改店铺信息" :visible.sync="centerDialogFormVisible">
          <el-form :model="selectTable" ref="selectTable" :rules="selectTableRules" label-width="100px">
            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="selectTable.name" placeholder="" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-autocomplete v-model="selectTable.address" :fetch-suggestions="querySearchAsync" placeholder="请输入地址"
                               style="width: 100%;" @select="addressSelect"></el-autocomplete>
              <span>当前城市：{{city.name}}</span>
            </el-form-item>
            <el-form-item label="店铺介绍" prop="description">
              <el-input v-model="selectTable.description"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="selectTable.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类">
              <el-cascader
                :options="categoryOptions"
                v-model="selectedCategory"
                change-on-select

                :props="{ expandTrigger: 'click' }"
                @change="handleCategoryChange"
                collapse-tags
                clearable
                style="width: 100%;"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商铺图片" label-width="100px">
              <el-upload
                class="avatar-uploader"
                :action="baseUrl + '/v1/addimg/shop'"
                :show-file-list="false"
                :on-success="handleServiceAvatarScucess"
                :before-upload="beforeAvatarUpload">
                <el-image v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path"
                          class="avatar"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="">
            <el-button type="" @click="centerDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateShop">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import HeaderTop from '@/components/HeaderTop'
  import {baseUrl, baseImgPath} from "../config/env";
  import {
    cityGuess,
    getResturants,
    getResturantsCount,
    foodCategory,
    updateResturant,
    searchplace,
    deleteResturant
  } from '@/api/getData'
  import api from '../api/api'

  export default {
    name: "ShopList",
    data() {
      return {
        loading: false,
        baseUrl,
        baseImgPath,
        city: {},
        offset: 0,
        limit: 20,
        tableData: [],
        shopTableData: [],
        currentPage: 1,
        count: 0,

        centerDialogFormVisible: false,
        selectTable: {
          name: '',
          address: '',
          description: '',
          phone: '',
          image_path: '',
        },
        selectTableRules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
          ],
        },
        categoryOptions: [],
        selectedCategory: [],

        dialogFormVisible: false,
        address: {},
        multipleSelection: [],
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      // this.getData()
    },
    methods: {
      getData() {
        this.cityGuess()
        // this.getResturantsCount()
      },
      cityGuess() {
        this.loading = true
        api.cityGuess().then((data) => {
          console.log(data)
          this.city = data.data

          this.getResturantsCount()
          this.loading = false;
        }).catch(err => {
          console.log(err)
        })
      },
      getResturantsCount() {
        api.getResturantsCount().then((data) => {
          console.log(data)
          const countData = data.data;
          if (countData.status == 1) {
            this.count = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getResturants();
        }).catch(err => {
          console.log('获取数据失败', err)
        })
      },
      getResturants() {
        console.log(this.city)
        const {latitude, longitude} = this.city
        console.log(latitude, longitude)

        const dataRes = {
          latitude,
          longitude,
          offset: this.offset,
          limit: this.limit,
        }
        console.log(dataRes)
        api.getResturants(dataRes).then((data) => {
          console.log(data)
          const restaurants = data.data;
          this.shopTableData = [];
          restaurants.forEach(item => {
            const tableData = {};
            tableData.name = item.name;
            tableData.address = item.address;
            tableData.description = item.description;
            tableData.shopId = item.id;
            tableData.category = item.category
            tableData.distance = item.distance
            tableData.phone = item.phone;
            tableData.rating = item.rating;
            tableData.recent_order_num = item.recent_order_num;
            tableData.category = item.category;
            tableData.image_path = item.image_path;
            this.shopTableData.push(tableData);
          })
        }).catch(err => {
          console.log(err)
        })
      },
      handleSelectionTableChange(val) {
        this.multipleSelection = val;
      },

      handleEdit(index, row) {
        console.log(index, row)
        this.selectTable = row
        this.address = row.address
        this.centerDialogFormVisible = true
        this.selectedCategory = row.category.split('/');
        if (!this.categoryOptions.length) {
          this.getCategory();
        }
      },
      getCategory() {
        api.foodCategory().then(data => {
          console.log(data)
          const categories = data.data;
          categories.forEach(item => {
            if (item.sub_categories.length) {
              const addnew = {
                value: item.name,
                label: item.name,
                children: []
              }
              item.sub_categories.forEach((subitem, index) => {
                if (index == 0) {
                  return
                }
                addnew.children.push({
                  value: subitem.name,
                  label: subitem.name,
                })
              })
              this.categoryOptions.push(addnew)
            }
          })
        }).catch(err => {
          console.log('获取商铺种类失败', err)
        })
      },
      handleCategoryChange(value) {
        console.log(value);
      },
      addFood(index, row) {
        console.log(index, row)
        this.$router.push({path: 'addGoods', query: {restaurant_id: row.id}})
      },
      handleDeleteFood(index, row) {
        console.log(index, row)
        api.deleteResturant(row.shopId).then(data => {
          console.log(data)
          const res = data.data;
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: '删除店铺成功'
            });
            this.shopTableData.splice(index, 1);
          } else {
            throw new Error(res.message)
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          });
          console.log('删除店铺失败', err)
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
        this.getResturants()
      },

      querySearchAsync(queryString, cb) {
        if (queryString) {
          api.searchplace(this.city.id, queryString).then(data => {
            console.log(data)
            const cityList = data.data;
            if (cityList instanceof Array) {
              cityList.map(item => {
                item.value = item.address;
                return item;
              })
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(cityList);
              }, 3000 * Math.random());
            }
          })
        }
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      addressSelect(value) {
        console.log(value);
        const {address, latitude, longitude} = value
        this.address = {address, latitude, longitude};
      },
      handleServiceAvatarScucess(res, file) {
        console.log(res, file)
        if (res.status == 1) {
          this.selectTable.image_path = res.image_path;
        } else {
          this.$message.error('上传图片失败！');
        }
      },
      beforeAvatarUpload(file) {
        const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isRightType) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isRightType && isLt2M;
      },
      updateShop() {
        this.centerDialogFormVisible = false;
        // Object.assign(this.selectTable, this.address)
        this.selectTable.category = this.selectedCategory.join('/');
        api.updateResturant(this.selectTable).then(data => {
          console.log(data)
          const res = data.data
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: '更新店铺信息成功'
            });
            this.getResturants();
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }).catch(err => {
          console.log('更新餐馆信息失败', err)
        })

      },
    },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="less" scoped>
  @import "../styles/mixin.less";

  .shopList_page {

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

  .table_container {
    padding: 20px;
  }

  .Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
