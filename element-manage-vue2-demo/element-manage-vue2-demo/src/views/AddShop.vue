<template>
  <div>
    <header-top></header-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" class="demo-formData">
          <el-form-item label="店铺名称" prop="shopName">
            <el-input placeholder="请输入店铺名称" v-model="formData.shopName"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-autocomplete v-model="formData.address" placeholder="请输入详细地址" :fetch-suggestions="querySearchAsync"
                             @select="addressSelect" style="width: 100%;">
            </el-autocomplete>
            <span>
              当前城市：{{city.name}}
            </span>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input placeholder="请输入联系电话" v-model.number="formData.phone" maxLength="11"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="shopDescription">
            <el-input v-model="formData.shopDescription" placeholder="请输入店铺简介"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="shop_slogan">
            <el-input v-model="formData.shop_slogan"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类" prop="selectedCategory">
            <el-cascader
              v-model="formData.selectedCategory"
              :options="categoryOptions"
              :props="{ expandTrigger: 'click' }"
              @change="handleCategoryChange"
              collapse-tags
              clearable
              style="width: 100%;"
            >
              <!-- change-on-select-->
            </el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点" style="white-space: nowrap;">
            <!--<el-checkbox-group v-model="sizeForm.type">
              <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
              <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
              <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
            </el-checkbox-group>-->
            <!-- <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" active-text="按月付费" inactive-text="按年付费"> </el-switch>-->
            <span>品牌保证</span>
            <el-switch v-model="formData.is_premium" on-text="" off-text=""></el-switch>
            <span>蜂鸟专送</span>
            <el-switch v-model="formData.delivery_mode" on-text="" off-text=""></el-switch>
            <span>新开店铺</span>
            <el-switch v-model="formData.new" on-text="" off-text=""></el-switch>
          </el-form-item>
          <el-form-item label="保" style="white-space: nowrap;">
            <span>外卖保</span>
            <el-switch v-model="formData.bao" on-text="" off-text=""></el-switch>
            <span>准时达</span>
            <el-switch v-model="formData.zhun" on-text="" off-text=""></el-switch>
            <span>开发票</span>
            <el-switch v-model="formData.piao" on-text="" off-text=""></el-switch>
          </el-form-item>
          <el-form-item label="配送费" prop="float_delivery_fee">
            <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="float_minimum_order_amount">
            <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间" style="white-space: normal;">
            <el-col :span="11">
              <el-time-select placeholder="起始时间" v-model="formData.startTime"
                              :picker-options="{start: '05:30', step: '00:15', end: '23:30' }"
                              style="width: 100%;"></el-time-select>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-select placeholder="结束时间" v-model="formData.endTime"
                              :picker-options="{start: '05:30', step: '00:15', end: '23:30',minTime: formData.startTime }"
                              style="width: 100%;"></el-time-select>
            </el-col>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload class="avatar-uploader"
                       :action="upload()"
                       :show-file-list="false"
                       :on-success="handleShopAvatarSuccess"
                       :before-upload="beforeShopAvatarUpload">
              <el-image v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!--
                    <el-form-item label="上传营业执照">
                      <el-upload
                        :action="baseUrl + '/v1/addimg/shop'"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-change="handleBusinessAvatarSuccess"
                      >
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                          <img
                            class="el-upload-list__item-thumbnail"
                            v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" alt=""
                          >
                          <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handleBusinessPictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleBusinessDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleBusinessRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
                        </div>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </el-form-item>
          -->
          <el-form-item label="上传营业执照">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleBusinessAvatarScucess"
              :before-upload="beforeShopAvatarUpload">
              <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传餐饮服务许可证">
            <el-upload class="avatar-uploader" :action="upload()" :show-file-list="false"
                       :on-success="handleServicepAvatarSuccess" :before-upload="beforeShopAvatarUpload">
              <img v-if="formData.catering_service_license_image"
                   :src="baseImgPath + formData.catering_service_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="activityValue" @visible-change="selectVisibleActivity" @change="selectActivity" :placeholder="activityValue">
              <el-option v-for="(item,index) in options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-table border :data="activities" style="min-width: 600px; margin-bottom: 20px;" align="center"
                    :row-class-name="tableRowClassName">
            <el-table-column prop="icon_name" label="活动标题" align="center" width="120"></el-table-column>
            <el-table-column prop="name" label="活动名称" align="center" width="120"></el-table-column>
            <el-table-column prop="description" label="活动详情" align="center"></el-table-column>
            <el-table-column prop="icon_date" label="活动时间" align="center" width="120"></el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="handleTableDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import HeaderTop from '../components/HeaderTop'
  import {baseUrl, baseImgPath} from '../config/env'
  // import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
  import api from '../api/api'

  export default {
    data() {
      return {
        city: {},
        formData: {
          shopName: '',    //店铺名称
          address: '',    //地址
          phone: '',     //联系电话
          shopDescription: '', //介绍店铺简介
          shop_slogan: '',     //店铺标语
          selectedCategory: ['快餐便当', '简餐'],  //店铺分类
          latitude: '',
          longitude: '',
          promotion_info: '',
          float_delivery_fee: 5, //运费
          float_minimum_order_amount: 20, //起价
          is_premium: true,
          delivery_mode: true,
          new: true,
          bao: true,
          zhun: true,
          piao: true,
          startTime: '',
          endTime: '',
          image_path: '',
          business_license_image: '',
          catering_service_license_image: '',

        },
        selectedCategory: ['快餐便当', '简餐'],
        categoryOptions: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        activities: [],
        activityValue: '满减优惠',
        options: [
          {value: '满减优惠', label: '满减优惠'},
          {value: '优惠大酬宾', label: '优惠大酬宾'},
          {value: '新用户立减', label: '新用户立减'},
          {value: '进店领券', label: '进店领券'}
        ],
        baseUrl,
        baseImgPath,
        rules: {
          shopName: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {type: 'number', message: '电话号码必须是数字'}
          ]
        },
      }
    },
    components: {
      HeaderTop
    },
    beforeMount() {
      this.getData()
    },
    methods: {
      getData() {
        this.cityGuess()
        this.foodCategory()
      },
      cityGuess() {
        api.cityGuess().then(data => {
          console.log(data)
          if (data.statusText) {
            this.city = data.data
          }
        })
      },
      foodCategory() {
        api.foodCategory().then((data) => {
          console.log(data)
          const categories = data.data
          categories.forEach(item => {   //获取级联选择器店铺分类
            console.log(item)
            if (item.sub_categories.length) {
              const addNew = {
                value: item.name,
                label: item.name,
                children: [],
              }
              item.sub_categories.forEach((subitem, index) => {
                if (index == 0) {
                  return
                }
                const addNewChildren = {
                  value: subitem.name,
                  label: subitem.name,
                }
                addNew.children.push(addNewChildren)
              })
              this.categoryOptions.push(addNew)
            }
          })
        })
      },
      querySearchAsync(queryString, cb) {
        if (queryString) {
          api.searchplace(this.city.id, queryString).then((data) => {
            console.log(data)
            const cityList = data.data;
            if (cityList instanceof Array) {
              var results = cityList.map(item => {
                item.value = item.address      //远程搜索, 从服务端搜索数据
                return item
              });

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(results);
              }, 3000 * Math.random());
            }
          })
        }
      },
      addressSelect(item) {
        console.log(item);
      },
      handleCategoryChange(value) {
        console.log(value);
      },
      upload() {
        // let upload = this.baseUrl + "/v1/addimg/shop"
        // console.log(upload)
        return this.baseUrl + "/v1/addimg/shop"
      },
      handleShopAvatarSuccess(res, file) {
        console.log(res, file)
        // this.imageUrl = URL.createObjectURL(file.raw);
        if (res.status == 1) {
          this.formData.image_path = res.image_path;
        } else {
          this.$message.error('上传图片失败！');
        }
      },
      beforeShopAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleBusinessAvatarScucess(res, file){
        console.log(res, file)
        if (res.status == 1) {
          this.formData.business_license_image = res.image_path;
        } else {
          this.$message.error('上传图片失败！');
        }
      },
      handleBusinessAvatarSuccess(res, file) {
        console.log(res, file)
        this.formData.business_license_image = res.name
      },
      handleBusinessRemove(file) {
        console.log(file);
      },
      handleBusinessPictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleBusinessDownload(file) {
        console.log(file);
      },
      handleServicepAvatarSuccess(res, file) {
        console.log(file);
        if (res.status == 1) {
          this.formData.catering_service_license_image = res.image_path;
        } else {
          this.$message.error('上传图片失败！');
        }
      },
      selectVisibleActivity(data){
        console.log(data)
        if(!data){
          this.selectActivity()
        }
      },
      selectActivity(){
        this.$prompt('请输入活动详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (value == null) {
            this.$message({
              type: 'info',
              message: '请输入活动详情'
            });
            return
          }
          let newObj = {};
          switch(this.activityValue){
            case '满减优惠':
              newObj= {
                icon_name: '减',
                name: '满减优惠',
                description: value,
                icon_date: new Date().toLocaleTimeString()
              }
              break;
            case '优惠大酬宾':
              newObj= {
                icon_name: '特',
                name: '优惠大酬宾',
                description: value,
                icon_date: new Date().toLocaleTimeString()
              }
              break;
            case '新用户立减':
              newObj= {
                icon_name: '新',
                name: '新用户立减',
                description: value,
                icon_date: new Date().toLocaleTimeString()
              }
              break;
            case '进店领券':
              newObj= {
                icon_name: '领',
                name: '进店领券',
                description: value,
                icon_date: new Date().toLocaleTimeString()
              }
              break;
          }
          this.activities.push(newObj);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      handleTableDelete(index) {
        this.activities.splice(index, 1)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            Object.assign(this.formData, {activities: this.activities}, {
              category: this.selectedCategory.join('/')
            })
            let data = this.formData
            api.addShop(data).then(data=>{
              console.log(data)
              const _data = data.data
              if (_data.status == 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.formData = {
                  name: '', //店铺名称
                  address: '', //地址
                  latitude: '',
                  longitude: '',
                  description: '', //介绍
                  phone: '',
                  promotion_info: '',
                  float_delivery_fee: 5, //运费
                  float_minimum_order_amount: 20, //起价
                  is_premium: true,
                  delivery_mode: true,
                  new: true,
                  bao: true,
                  zhun: true,
                  piao: true,
                  startTime: '',
                  endTime: '',
                  image_path: '',
                  business_license_image: '',
                  catering_service_license_image: '',
                  selectedCategory : ['快餐便当', '简餐']
                };
                this.selectedCategory = ['快餐便当', '简餐'];
                this.activities = [{
                  icon_name: '减',
                  name: '满减优惠',
                  description: '满30减5，满60减8',
                }];
              }else{
                this.$message({
                  type: 'error',
                  message: _data.message
                });
              }
            })
          } else {
            console.log('error submit!!');
            this.$notify.error({
              title: '错误',
              message: '请检查输入是否正确',
              offset: 100
            });
            return false;
          }
        });
      },
      loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
          {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
          {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
          {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
          {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
          {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"},
          {"value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号"},
          {"value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号"},
          {"value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"},
          {"value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层"},
          {"value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号"},
          {"value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路"},
          {"value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺"},
          {"value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819"},
          {"value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306"},
          {"value": "枪会山", "address": "上海市普陀区棕榈路"},
          {"value": "纵食", "address": "元丰天山花园(东门) 双流路267号"},
          {"value": "钱记", "address": "上海市长宁区天山西路"},
          {"value": "壹杯加", "address": "上海市长宁区通协路"},
          {"value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"},
          {"value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室"},
          {"value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"},
          {"value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6"},
          {"value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号"},
          {"value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号"},
          {"value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号"},
          {"value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号"},
          {"value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室"},
          {"value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1"},
          {"value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号"},
          {"value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室"},
          {"value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部"},
          {"value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B"},
          {"value": "浏阳蒸菜", "address": "天山西路430号"},
          {"value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路"},
          {"value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室"},
          {"value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号"},
          {"value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号"},
          {"value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位"},
          {"value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号"},
          {"value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼"},
          {"value": "阳阳麻辣烫", "address": "天山西路389号"},
          {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
        ];
      },
    },
    mounted() {
      // this.city = this.loadAll();
    }
  }
</script>

<style lang="less">
  @import '../styles/mixin.less';
  .demo-formData {

  }

  .button_submit {
    text-align: center;
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

  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
