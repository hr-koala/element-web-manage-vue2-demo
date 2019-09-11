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
                          @ready="onEditorReady($event)">
            </quill-editor>
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

    export default {
        name: "VueEdit",
      data(){
          return{
            loading:false,
            content: '<h3>文本编辑</h3>',
            editorOption: {

            }
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
        }
      },
      components:{
          HeaderTop,
        quillEditor,
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
