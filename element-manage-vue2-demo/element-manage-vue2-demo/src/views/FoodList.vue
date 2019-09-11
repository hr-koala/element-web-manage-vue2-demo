<template>
  <div class="foodList_page">
    <header-top></header-top>
    <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="20" :offset="2">
        <div class="table_container">
          <el-table
            :data="foodTableData"
            :expand-row-keys='expendRow'
            :row-key="row => row.index"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="食品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="餐馆名称">
                    <span>{{ props.row.restaurant_name }}</span>
                  </el-form-item>
                  <el-form-item label="食品 ID">
                    <span>{{ props.row.item_id }}</span>
                  </el-form-item>
                  <el-form-item label="餐馆 ID">
                    <span>{{ props.row.restaurant_id }}</span>
                  </el-form-item>
                  <el-form-item label="食品介绍">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                  <el-form-item label="餐馆地址">
                    <span>{{ props.row.restaurant_address }}</span>
                  </el-form-item>
                  <el-form-item label="食品评分">
                    <span>{{ props.row.rating }}</span>
                  </el-form-item>
                  <el-form-item label="食品分类">
                    <span>{{ props.row.category_name }}</span>
                  </el-form-item>
                  <el-form-item label="月销量">
                    <span>{{ props.row.month_sales }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="食品名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="食品介绍"
              prop="description">
            </el-table-column>
            <el-table-column
              label="评分"
              prop="rating">
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.row)">编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Pagination">
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
          <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
            <el-form :model="selectTable">
              <el-form-item label="食品名称" label-width="100px">
                <el-input v-model="selectTable.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="食品介绍" label-width="100px">
                <el-input v-model="selectTable.description"></el-input>
              </el-form-item>
              <el-form-item label="食品分类" label-width="100px">
                <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">
                  <el-option
                    v-for="item in menuOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="食品图片" label-width="100px">
                <el-upload
                  class="avatar-uploader"
                  :action="baseUrl + '/v1/addimg/food'"
                  :show-file-list="false"
                  :on-success="handleServiceAvatarScucess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <el-row style="overflow: auto; text-align: center;">
              <el-table
                :data="specs"
                style="margin-bottom: 20px;"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="specs"
                  label="规格">
                </el-table-column>
                <el-table-column
                  prop="packing_fee"
                  label="包装费">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="danger"
                      @click="deleteSpecs(scope.$index)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
            </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateFood">确 定</el-button>
            </div>
          </el-dialog>


          <el-dialog title="添加规格" :visible.sync="specsFormVisible">
            <el-form :rules="specsFormrules" :model="specsForm">
              <el-form-item label="规格" label-width="100px" prop="specs">
                <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="包装费" label-width="100px">
                <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="价格" label-width="100px">
                <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="specsFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addspecs">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import HeaderTop from "../components/HeaderTop";
  import {baseUrl, baseImgPath} from '@/config/env'
  // import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
  import api from '../api/api'

  export default {
    name: "FoodList",
    data() {
      return {
        loading: false,
        baseUrl,
        baseImgPath,
        foodTableData: [],
        restaurant_id: null,
        city: {},
        offset: 0,
        limit: 20,
        count: 0,
        tableData: [],
        currentPage: 1,
        selectTable: {},
        dialogFormVisible: false,
        menuOptions: [],
        selectMenu: {},
        selectIndex: null,
        specsForm: {
          specs: '',
          packing_fee: 0,
          price: 20,
        },
        specsFormrules: {
          specs: [
            {required: true, message: '请输入规格', trigger: 'blur'},
          ],
        },
        specsFormVisible: false,
        expendRow: [],
        restaurant: {},
        category: {},
      }
    },
    created() {
      // this.restaurant_id = this.$route.query.restaurant_id;
      this.getData();
    },
    methods: {
      getData() {
        let restaurant_id = this.$route.query.restaurant_id;
        console.log(restaurant_id)
        this.restaurant_id = restaurant_id ? restaurant_id : 1
        const dataId = {
          restaurant_id: this.restaurant_id
        }
        api.getFoodsCount(dataId).then(data => {
          console.log(data)
          const countData = data.data
          if (countData.status == 1) {
            this.count = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getFoodsList();
        }).catch(err => {
          console.log('获取数据失败', err)
        })
      },
      getFoodsList() {
        const params = {
          offset: this.offset,
          limit: this.limit,
          restaurant_id: this.restaurant_id,
        }
        api.getFoods(params).then(data => {
          console.log(data)
          const foodDataList = data.data
          this.foodTableData = [];
          foodDataList.forEach((item, index) => {
            const tableData = {};
            tableData.name = item.name;
            tableData.item_id = item.item_id;
            tableData.description = item.description;
            tableData.rating = item.rating;
            tableData.month_sales = item.month_sales;
            tableData.restaurant_id = item.restaurant_id;
            tableData.category_id = item.category_id;
            tableData.image_path = item.image_path;
            tableData.specfoods = item.specfoods;
            tableData.index = index;
            this.foodTableData.push(tableData);
          })
          // this.foodTableData = foodDataList
        }).catch(err => {
          console.log('获取数据失败', err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
        this.getFoodsList()
      },
      handleEdit(row) {
        this.getSelectItemData(row, 'edit')
        console.log(this.selectTable)
        this.dialogFormVisible = true
      },

      getResturantDetail(row,type) {
        console.log(row.restaurant_id)
        api.getResturantDetail(row.restaurant_id).then(data => {
          console.log(data)
          this.restaurant = data.data;
          this.selectTable = {
            ...row, ...{
              restaurant_name: this.restaurant.name,
              restaurant_address: this.restaurant.address,
            }
          };
          this.getMenuById(row,type)
        }).catch(err => {
          console.log('获取餐馆详细信息失败', err)
        })
      },
      getMenuById(row,type) {
        console.log(row.category_id)
        api.getMenuById(row.category_id).then(data => {
          console.log(data)
          this.category = data.data
          // this.selectTable = {...row, ...{category_name: this.category.name}};
          this.selectTable = Object.assign(this.selectTable, {
          ...row, ...{
            restaurant_name: this.restaurant.name,
            restaurant_address: this.restaurant.address,
            category_name: this.category.name
          }
        });
        console.log(this.selectTable)
          this.selectMenu = {label: this.category.name, value: row.category_id}
          this.foodTableData.splice(row.index, 1, {...this.selectTable});
          this.$nextTick(() => {
            this.expendRow.push(row.index);
          })
          if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
            this.getMenu();
          }
        }).catch(err => {
          console.log('获取menu详情失败', err)
        })
      },
      getSelectItemData(row, type) {
        this.getResturantDetail(row,type)
        // this.getMenuById(row)
        // console.log(row, this.restaurant, this.category),
          /*this.selectTable = Object.assign(this.selectTable, {
          ...row, ...{
            restaurant_name: this.restaurant.name,
            restaurant_address: this.restaurant.address,
            category_name: this.category.name
          }
        });
        console.log(this.selectTable)*/
        /*this.selectMenu = {label: this.category.name, value: row.category_id}
        this.foodTableData.splice(row.index, 1, {...this.selectTable});
        this.$nextTick(() => {
          this.expendRow.push(row.index);
        })
        if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
          this.getMenu();
        }*/
      },

      getMenu() {
        this.menuOptions = [];
        const params = {
          restaurant_id: this.selectTable.restaurant_id,
          allMenu: true,
        }
        console.log(params)
        api.getMenu(params).then(data => {
          console.log(data)
          const menu = data.data;
          menu.forEach((item, index) => {
            this.menuOptions.push({
              label: item.name,
              value: item.id,
              index,
            })
          })
        }).catch(err => {
          console.log('获取食品种类失败', err)
        })
      },


      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      addspecs() {
        this.specs.push({...this.specsForm});
        this.specsForm.specs = '';
        this.specsForm.packing_fee = 0;
        this.specsForm.price = 20;
        this.specsFormVisible = false;
      },
      deleteSpecs(index) {
        this.specs.splice(index, 1);
      },

      expand(row, status) {
        if (status) {
          this.getSelectItemData(row)
        } else {
          const index = this.expendRow.indexOf(row.index);
          this.expendRow.splice(index, 1)
        }
      },


      handleSelect(index) {
        this.selectIndex = index;
        this.selectMenu = this.menuOptions[index];
      },
      handleDelete(index, row) {
        api.deleteFood(row.id).then(data=>{
          console.log(data)
          const res = data.data;
              if (res.status == 1) {
                this.$message({
                  type: 'success',
                  message: '删除食品成功'
                });
                this.foodTableData.splice(index, 1);
              } else {
                throw new Error(res.message)
              }
        }).catch(err=>{
            this.$message({
                    type: 'error',
                    message: err.message
                  });
          console.log('删除食品失败',err)
        })
      },

      handleServiceAvatarScucess(res, file) {
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

      updateFood(){
        this.dialogFormVisible = false;
        const subData = {new_category_id: this.selectMenu.value, specs: this.specs};
        const postData = {...this.selectTable, ...subData};
        api.updateFood(postData).then(data=>{
          console.log(data)
          const res = data.data
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: '更新食品信息成功'
            });
            this.getFoodsList();
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }).catch(err=>{
          console.log('更新餐馆信息失败',err)
        })
      },

    },
    computed: {
      specs: function () {
        let specs = [];
        if (this.selectTable.specfoods) {
          this.selectTable.specfoods.forEach(item => {
            specs.push({
              specs: item.specs_name,
              packing_fee: item.packing_fee,
              price: item.price,
            })
          })
        }
        return specs
      }
    },
    components: {HeaderTop}
  }
</script>

<style scoped>
  .foodList_page {

  }
</style>
