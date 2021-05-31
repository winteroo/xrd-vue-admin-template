<template>
  <el-upload
    :drag="drag"
    :auto-upload="false"
    :file-list="fileListComponent"
    :on-change="handleFileChange"
    :on-remove="handleFileRemove"
    :accept="accept"
    :limit="1"
    :on-exceed="handleFileExceed"
    class="upload-demo"
    action="https://localhost:8080"
    multiple
  >
    <i
      v-if="drag"
      class="el-icon-upload"/>
    <div
      v-if="drag"
      class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
    <el-button
      v-else
      slot="trigger"
      :type="btnType"
      :class="btnClass"
      size="small">选择文件</el-button>
    <div
      v-if="tip"
      slot="tip"
      class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
/**
 * @description
 * 封装的element-ui的上传组件,手动上传
 * 提供两种方式可拖拽和不可拖拽，不可拖拽会自动显示上传文件按钮
 * 文件变化、移除、超出限制都会触发事件chang-file
 * 注意fileList变量在使用时是带sync修饰符的
 * 目前只支持单一文件上传
 * @example
 * <xrd-upload tip="请上传excel文件" :file-list.sync="reportForm.reportFile"  @change-file="changeFile(1)"></xrd-upload>
 */
export default {
  name: 'XrdUpload',
  props: {
    // 接受的文件类型
    accept: {
      type: String,
      default: ''
    },
    // 提示信息
    tip: {
      type: String,
      default: ''
    },
    // 文件列表
    fileList: {
      type: Array,
      required: true
    },
    // 会否可拖拽
    drag: {
      type: Boolean,
      default: true
    },
    // 选择文件按样式
    btnType: {
      type: String,
      default: 'primary'
    },
    btnClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    fileListComponent: {
      get () {
        return this.fileList;
      },
      set (val) {
        this.$emit('update:fileList', val);
      }
    }
  },
  methods: {
    handleFileChange (file, fileList) {
      this.fileListComponent = fileList;
      this.checkFileList({
        type: 'change'
      });
    },
    handleFileRemove (file, fileList) {
      this.fileListComponent = fileList;
      this.checkFileList({
        type: 'remove'
      });
    },
    handleFileExceed (file, fileList) {
      let fileItem = {
        name: file[0].name,
        raw: file[0],
        size: file[0].size
      };
      this.$set(this.fileListComponent, 0, fileItem);
      this.checkFileList({
        type: 'exceed'
      });
    },
    checkFileList (obj) {
      this.$nextTick(() => {
        this.$emit('change-file', {
          type: obj.type,
          file: this.fileListComponent
        });
      });
    }
  }
};
</script>
