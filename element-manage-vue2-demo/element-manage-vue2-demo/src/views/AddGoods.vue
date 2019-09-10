<template>
  <div class="addGoods_page">
    <header-top></header-top>
    <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="16" :offset="4">
        <header class="form_header">选择食品种类</header>
        <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="110px" class="categoryForm">
          <el-form-item label="食品种类" class="category_select">
            <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width: 100%;">
              <el-option v-for="(item,index) in categoryForm.categoryList" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
            <div class="add_category">
              <el-form-item label="食品种类" prop="name">
                <el-input class="" v-model="categoryForm.name" aria-placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="种类描述" prop="description">
                <el-input v-model="categoryForm.description" aria-placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitCategoryForm('categoryForm')">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="add_category_button" @click="addCategoryFun">
            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom edit_icon" v-else solt="icon"></i>
            <span>添加食品种类</span>
          </div>
        </el-form>

        <header class="form_header">添加食品</header>
        <el-form :model="foodForm" ref="foodForm" class="form food_form" :rules="foodrules" label-width="110px">
          <el-form-item label="食品名称" prop="name">
            <el-input v-model="foodForm.name" aria-placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="食品活动" prop="activity">
            <el-input v-model="foodForm.activity" aria-placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="食品详情" prop="description">
            <el-input v-model="foodForm.description" aria-placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="上传食品图片">
            <el-upload class="avatar-uploader" :action="upload()" :show-file-list="false" :on-success="uploadImgSuccess"
                       :before-upload="beforeImgUpload">
              <el-image :src="baseImgPath + foodForm.image_path" v-if="foodForm.image_path" class="avatar"></el-image>
              <!--<img v-if="foodForm.image_path" :src="baseImgPath + foodForm.image_path" class="avatar">-->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="食品特点" class="">
            <el-select v-model="foodForm.attributes" placeholder="请选择" multiple style="width: 100%;">
              <el-option v-for="(item,index) in attributes" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品规格">
            <el-radio class="radio" v-model="foodSpecs" label="one">单规格</el-radio>
            <el-radio class="radio" v-model="foodSpecs" label="more">多规格</el-radio>
          </el-form-item>
          <el-row v-if="foodSpecs == 'one'">
            <el-form-item label="包装费">
              <el-input-number v-model="foodForm.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="foodForm.specs[0].price" :min="0" :max="10000"></el-input-number>
            </el-form-item>
          </el-row>
          <el-row v-else class="" style="overflow: auto; text-align: center;">
            <el-button type="primary" @click="dialogFormVisible =true " style="margin-bottom: 10px">添加规格</el-button>
            <el-table class="" :data="foodForm.specs" :row-class-name="tableRowClassName" style="margin-bottom: 20px">
              <el-table-column prop="specs" label="规格"></el-table-column>
              <el-table-column prop="packing_fee" label="包装费"></el-table-column>
              <el-table-column prop="price" label="价格"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-form-item label="">
            <el-button type="primary" @click="addFoodForm('foodForm')">确认添加食品</el-button>
          </el-form-item>
        </el-form>
        <!--        v-model="dialogFormVisible"-->
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible"
                   :before-close="handleClose">
          <el-form :rules="specsFormrules" :model="specsForm" ref="specsForm" class="" label-width="110px">
            <el-form-item label="规格" prop="specs">
              <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="包装费" prop="packing_fee">
              <el-input-number v-model="specsForm.packing_fee" :min="0" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
            </el-form-item>
          </el-form>
          <el-row slot="footer" class="dialog-footer">
            <el-button type="" @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addspecs('specsForm')">确认</el-button>
          </el-row>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import HeaderTop from '@/components/HeaderTop'
  // import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
  import {baseUrl, baseImgPath} from '../config/env'
  import api from '../api/api'

  export default {
    data() {
      return {
        loading: false,
        baseUrl,
        baseImgPath,
        categoryForm: {
          categorySelect: '',
          categoryList: [],
          name: '',
          description: '',
        },
        showAddCategory: false,
        restaurant_id: 1,
        foodForm: {
          name: '',
          activity: '',
          description: '',
          image_path: '',
          attributes: [],
          specs: [
            {specs: '默认', packing_fee: 0, price: 20,}
          ],
        },
        foodSpecs: 'one',

        dialogFormVisible: false,

        rules: {
          name: [
            {required: true, message: '请输入食品种类名称', trigger: 'blur'},
          ],
        },
        foodrules: {
          name: [
            {required: true, message: '请输入食品名称', trigger: 'blur'},
          ],
        },
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

        attributes: [
          {
            value: '新',
            label: '新品'
          },
          {
            value: '招牌',
            label: '招牌'
          },
          {
            value: '招新',
            label: '招新'
          },
          {
            value: '赠',
            label: '赠'
          },
          {
            value: '折上折',
            label: '折上折'
          },
        ],

      }
    },
    components: {
      HeaderTop,
    },
    created() {
      this.getData()
    },
    computed: {
      selectValue: function () {
        return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
      }
    },
    methods: {
      getData() {
        console.log(this.$route.query.restaurant_id)
        if(this.$route.query.restaurant_id){
          this.restaurant_id = this.$route.query.restaurant_id;
        }else {
          this.restaurant_id = Math.ceil(Math.random() * 10);   //Math.ceil()向上取整；Math.floor()向下取整；Math.round()四舍五入；
          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                  this.$router.push('/shopList');
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 1000);
              } else {
                this.$message({
                  type: 'info',
                  message: '取消'
                });
                done();
              }
            }
          })
        }
        this.initData();
      },
      initData() {
        this.loading = true
        console.log(this.restaurant_id)
        api.getCategory(this.restaurant_id).then((data) => {
          console.log(data)
          let _data = data.data
          if (_data.status == 1) {
            _data.category_list.map((item, index) => {
              item.value = index;
              item.label = item.name;
            })
            this.categoryForm.categoryList = _data.category_list;
            this.loading = false
          } else {
            console.log(_data)
          }

        }).catch(err => {
          console.log(err)
        })
      },
      submitCategoryForm(categoryForm) {
        this.$refs[categoryForm].validate((valid) => {
          if (valid) {
            const params = {
              name: this.categoryForm.name,
              description: this.categoryForm.description,
              categorySelect: this.categoryForm.categorySelect,
              restaurant_id: this.restaurant_id,
            }
            api.addCategory(params).then((data) => {
              console.log(data)
              let _data = data.data
              if (_data.status == 1) {
                this.initData()
                this.categoryForm.name = ''
                this.categoryForm.description = ''
                this.categoryForm.categorySelect = ''
                this.showAddCategory = false
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            }).catch((res) => {
              console.log(res)
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '请检查输入是否正确',
              offset: 100
            });
            return false;
          }
        });
      },
      addCategoryFun() {   //添加食品种类
        this.showAddCategory = !this.showAddCategory;
      },
      upload() {
        return this.baseUrl + '/v1/addimg/food'
      },
      uploadImgSuccess(res, file) {
        console.log(res, file)
        if (res.status == 1) {
          this.foodForm.image_path = res.image_path
        } else {
          this.$message({
            type: 'error',
            message: '上传图片失败！！！',
          })
        }
      },
      beforeImgUpload(file) {
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

      handleDelete(index) {
        this.foodForm.specs.splice(index, 1);
      },
      addFoodForm(foodForm) {
        this.$refs[foodForm].validate((valid) => {
          if (valid) {
            const params = {
              ...this.foodForm,
              category_id: this.selectValue.id,
              restaurant_id: this.restaurant_id,
            }
            api.addFood(params).then((data) => {
              console.log(data)
              let _data = data.data
              if (_data.status == 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.foodForm = {
                  name: '',
                  description: '',
                  image_path: '',
                  activity: '',
                  attributes: [],
                  specs: [{
                    specs: '默认',
                    packing_fee: 0,
                    price: 20,
                  }],
                }
              } else {
                this.$message({
                  type: 'error',
                  message: _data.message
                });
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '请检查输入是否正确',
              offset: 100
            });
            return false;
          }
        });
      },
      addspecs(specsForm) {
        console.log(specsForm)
        this.foodForm.specs.push({...this.specsForm});
        this.specsForm.specs = '';
        this.specsForm.packing_fee = 0;
        this.specsForm.price = 20;
        this.dialogFormVisible = false;
      },

      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
    },
    mounted() {
      // this.getData();
    },

  }
</script>

<style lang="less" scoped>
  @import '../styles/mixin';

  .addGoods_page {

  }

  .categoryForm {
    min-width: 400px;
    margin-bottom: 30px;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
      border-radius: 6px;
      transition: all 400ms;
    }
  }

  .food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
  }

  .form_header {
    text-align: center;
    margin-bottom: 10px;
  }

  .category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }

  .showEdit {
    height: 185px;
  }

  .add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;

    &:hover {
      background: #f9fafc;

      span, .edit_icon {
        color: #20a0ff;
      }
    }

    span {
      .sc(14px, #999);
      transition: all 400ms;
    }

    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }
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

  .cell {
    text-align: center;
  }
</style>
