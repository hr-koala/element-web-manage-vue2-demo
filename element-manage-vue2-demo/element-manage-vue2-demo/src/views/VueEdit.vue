<template>
    <div class="vueEdit_page">
      <header-top></header-top>
      <el-row style="margin-top: 20px;" v-loading="loading" element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-col :span="20" :offset="2">
          <div class="edit_container">
            <quill-editor v-model="content"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption"
                          @ready="onEditorReady($event)"
                          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)"
            >
            </quill-editor>
            <!-- 从数据库读取展示 -->
            <div v-html="str" class="ql-editor">
              {{str}}
            </div>

          </div>
          <div class="submit_btn">
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>

  import HeaderTop from '@/components/HeaderTop'
  import { quillEditor } from 'vue-quill-editor'

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

    export default {
        name: "VueEdit",
      data(){
          return{
            loading:false,
            content: '<h3>文本编辑</h3>',
            editorOption: {

            },
            str: '',
          }
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
      },
      methods: {
        onEditorReady(editor) {
          console.log('editor ready!', editor)
        },
        submit(){
          console.log(this.content);
          this.$message.success('提交成功！');
        },
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        // 转码
        escapeStringHTML(str) {
          str = str.replace(/&lt;/g,'<');
          str = str.replace(/&gt;/g,'>');
          return str;
        },
      },
      components:{
          HeaderTop,
        quillEditor,
      },
      mounted() {
        let content = '';  // 请求后台返回的内容字符串
        this.str = this.escapeStringHTML(content);
      }

    }
</script>

<style lang="less" scoped>
  @import '../styles/mixin.less';
  .edit_container{
    padding: 40px;
    margin-bottom: 40px;
  }
  .editer{
    height: 350px;
  }
  .submit_btn{
    text-align: center;
  }
</style>
