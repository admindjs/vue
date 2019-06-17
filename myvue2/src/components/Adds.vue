<template>
  <el-upload
    class="upload-file"
    drag
    method:post
   
    action="http://localhost:8888/api/private/v1/src/assets/img"
    :before-upload="beforeUpload"
    ref="newupload"
    multiple
    :auto-upload="false"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      doUpload: "/api/up/file",
      pppss: {
        srid: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    aa() {
      this.$http({
        url: "upload",
        method: "post",
        data: ""
      });
    },
    beforeUpload(file) {
      let fd = new FormData();
      fd.append("file", file); //传文件
      fd.append("srid", this.aqForm.srid); //传其他参数
      axios.post("/api/up/file", fd).then(function(res) {
        alert("成功");
      });
    },
    newSubmitForm() {
      //确定上传
      this.$refs.newupload.submit();
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
