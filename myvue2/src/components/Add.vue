<template>
  <div>
    <el-container>
      <el-header height="120px">
        <el-alert title="添加地址" type="info" center show-icon></el-alert>
        <el-steps :active="active" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
        </el-steps>
      </el-header>
      <el-container>
        <el-aside width="100%">
          <!-- <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>-->

          <el-tabs tab-position="left" v-model="activeTabName" :stretch="stretch">
            <el-tab-pane label="基本信息">
              <template>
                <el-form :label-position="labelPosition" :model="addForm" label-width="80px">
                  <el-form-item label="商品名称">
                    <el-input v-model="addForm.goods_name"></el-input>
                  </el-form-item>
                  <el-form-item label="商品价格">
                    <el-input v-model="addForm.goods_price"></el-input>
                  </el-form-item>
                  <el-form-item label="商品数量">
                    <el-input v-model="addForm.goods_weight"></el-input>
                  </el-form-item>
                  <el-form-item label="商品重量">
                    <el-input v-model="addForm.goods_number"></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <div class="block">
                      <el-cascader
                        placeholder="请选择商品分类"
                        :options="options"
                        expand-trigger="hover"
                        :props="{ label: 'cat_name', value: 'cat_id' }"
                        @change="handleChange"
                        v-model="addForm.goods_cat"
                      ></el-cascader>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
              <!-- 234234234 -->
              <template>
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  closable
                  :type="tag.type"
                >{{tag.attr_name}}</el-tag>
              </template>
            </el-tab-pane>
            <el-tab-pane label="商品属性">
              <template>
                <el-form>
                  <el-form-item v-for="item in tagss" :key="item.attr_id" :label="item.attr_name">
                    <el-input v-model="item.attr_vals"></el-input>
                  </el-form-item>
                </el-form>

                <!-- <div v-for="(v,k) in tagss" :key="k">{{v.attr_name}}</div> -->
              </template>
            </el-tab-pane>
            <el-tab-pane label="商品图片">
              <el-upload
                class="upload-demo"
                action="http://localhost:8888/api/private/v1/src/assets/img"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容">商品内容</el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stretch: true,
      //       tags: [
      //   { name: '标签一', type: '' },
      //   { name: '标签二', type: 'success' },
      //   { name: '标签三', type: 'info' },
      //   { name: '标签四', type: 'warning' },
      //   { name: '标签五', type: 'danger' }
      // ],
      labelPosition: "",
      activeTabName: "1",
      active: 0,
      tabPosition: "left",
      //添加表单里额的值
      addForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        pics: [],
        // 商品介绍
        goods_introduce: ""
      },
      value: [],
      options: [],
      listId: "",
      tags: [],
      tagss: [],
      formLabelAlign: "123",
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
   handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    //这是表单变动自动提交数据
    handleChange(data) {
      // console.log(data);
      if (data.length > 2) {
        this.listId = data[2];
        this.$http({
          url: `/categories/${this.listId}/attributes?sel=many`,
          method: "get"
        }).then(back => {
          // console.log(back);
          var { data, meta } = back.data;
          console.log(back);
          this.tags = data;

          // this.DynamicFormData.attr_id = data[0].attr_id;
          // this.DynamicFormData.attr_name = data[0].attr_name;
          // console.log(this.DynamicFormData);
          // this.editUserData = data;
          // this.attr_vals = data[0].attr_vals.split(",");
          // console.log(data[0].attr_vals);
        });
      }
      // if (data.length > 2) {
      // this.listId = data[2];
      this.$http({
        url: `/categories/${this.listId}/attributes?sel=only`,
        method: "get"
      }).then(back => {
        // console.log(back);
        var { data, meta } = back.data;
        // console.log(back);
        console.log(data);
        this.tagss = data;

        // this.DynamicFormData.attr_id = data[0].attr_id;
        // this.DynamicFormData.attr_name = data[0].attr_name;
        // console.log(this.DynamicFormData);
        // this.editUserData = data;
        // this.attr_vals = data[0].attr_vals.split(",");
        // console.log(data[0].attr_vals);
      });
      // }
      this.panduan = false;
      //   data[2];
      //   console.log(data[2]);
    },

    change(back) {
      this.active = back.index++;
    },
    submitForm() {
      alert(123);
      console.log(this.addForm);
    },
    listdata() {
      this.$http({
        url: "/categories?type=3/attributes/",
        method: "get"
      }).then(back => {
        var { data, meta } = back.data;
        this.options = data;
        console.log(this.options);
      });
    }
  },
  mounted() {
    this.listdata();
  }
};
</script>

<style type="text/css">
.el-main {
  line-height: 27px;
}
.el-header,
.el-footer {
  line-height: 20px;
  background-color: #d3dce6;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-alert {
  margin-bottom: 10px;
}
.el-aside {
  line-height: 34px;
}
</style>
