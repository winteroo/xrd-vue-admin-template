<template>
  <div>
    <div
      v-loading="loading"
      v-if="!isIe"
      style="min-height: 100px;">
      <div
        v-for="i in numPages"
        :key="i">
        <pdf
          :src="pdfShowSrc"
          :page="i"
          :class="className"
          class="pdf"
          @page-loaded="pdfLoaded"
          @error="handleErr"
        />
        <div class="page">{{ i }} / {{ numPages }}</div>
      </div>
    </div>
    <div v-else>
      <iframe
        :src="src"
        :width="iframeWidth"
        :height="iframeHeight"/>
    </div>
  </div>
</template>

<script>
// pdf展示组件
// 必传pdf文件地址src，需要满足同源策略，否则会出错
import pdf from 'vue-pdf';
import { getBrowserType, IEVersion } from '@/util/index.js';
export default {
  name: 'XrdPdf',
  components: {
    pdf
  },
  props: {
    // pdf文件地址，需保证同源
    src: {
      type: String,
      required: true
    },
    // 添加到单页pdf图片上的类名
    className: {
      type: String,
      default: ''
    },
    // ie10下的iframe宽度
    iframeWidth: {
      type: String,
      default: '100%'
    },
    // ie10下iframe的高度
    iframeHeight: {
      type: String,
      default: '300'
    }
  },
  data () {
    return {
      numPages: 0,
      pdfShowSrc: '',
      isIe: false,
      loading: true
    };
  },
  watch: {
    src: function (nv) {
      if (nv) {
        this.pdfShowSrc = pdf.createLoadingTask(this.src);
        this.pdfShowSrc.promise.then(pdf => {
          this.numPages = pdf.numPages;
        });
      }
    }
  },
  mounted () {
    // ie10利用iframe加载pdf
    if (getBrowserType() === 'ie') {
      if (IEVersion() < 11) {
        this.isIe = true;
      } else {
        this.isIe = false;
      }
    } else {
      this.isIe = false;
    }
  },
  methods: {
    pdfLoaded () {
      this.loading = false;
    },
    handleErr (err) {
      console.log(err);
      this.$message({
        type: 'error',
        message: 'pdf加载出错'
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.pdf {
  width: 80%;
  margin: 30px auto;
  border: 1px solid #ccc;
}

.page {
  text-align: center;
}
</style>
