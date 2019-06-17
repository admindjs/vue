<template>
  <div>
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="info" center show-icon></el-alert>
    <!-- 下拉列表开始 -->
    <el-form label-width="120px">
      <div>
        <el-form-item label="请选择分类">
          <div class="block">
            <el-cascader
              @blur="handleChange"
              placeholder="请选择商品分类"
              :options="options"
              expand-trigger="hover"
              :props="{ label: 'cat_name', value: 'cat_id' }"
              @change="handleChange"
              v-model="addForm.goods_cat"
            ></el-cascader>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-button type="success" :disabled="panduan" @click="add">添加按钮</el-button>
      <el-tab-pane label="用户管理" name="1">
        <!-- 说234234234 -->
        <el-table :data="backdata" border style="width: 100%">
          <!-- 箭头开始 -->
          <el-table-column type="expand">
            <!-- 获取上成的值 -->
            <!-- <template slot-scope="scope"> -->
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- <el-button type="info" @click="add">添加按钮</el-button> -->

              <el-row
                :key="tag"
                v-for="tag in attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                <div class="grid-content bg-purple">
                  <!-- 调用三次del来执行删除 -->
                  <el-tag>{{tag}}</el-tag>

                  <!-- <el-tag closable @close="del(scope.row,v.id)">{{v.authName}}</el-tag> -->
                </div>
              </el-row>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="tagsInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form>
            <!-- </template> -->
          </el-table-column>
          <!-- 箭头结束 -->
          <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>

          <el-table-column prop label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="upduser(scope.row)"></el-button>

              <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 2343242 -->
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="2">
        <el-table :data="backdata" border style="width: 100%">
          <!-- 箭头开始 -->
          <el-table-column type="expand">
            <!-- 获取上成的值 -->
            <!-- <template slot-scope="scope"> -->
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row v-for="v in attr_vals" :key="v.id">
                <div class="grid-content bg-purple">
                  <!-- 调用三次del来执行删除 -->
                  <el-tag closable>{{v}}</el-tag>
                  <!-- <el-tag closable @close="del(scope.row,v.id)">{{v.authName}}</el-tag> -->
                </div>
              </el-row>
            </el-form>
            <!-- </template> -->
          </el-table-column>
          <!-- 箭头结束 -->
          <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>

          <el-table-column prop label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="upduser(scope.row)"></el-button>

              <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 下拉列表结束 -->
    <!-- 增加数据开始 -->
    <el-dialog title="添加用户" :visible.sync="editUserShows">
      <el-form :model="backdata[0]">
        <el-form-item label="版本">
          <!-- {{backdata[0].attr_name}} -->
          <el-input v-model="DynamicFormData.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserShow = false">取 消</el-button>
        <el-button type="primary" @click="editUserPut">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加结束 -->
    <!-- 修改数据开始 -->
    <el-dialog title="添加用户" :visible.sync="editUserShow">
      <el-form :model="backdata[0]">
        <el-form-item label="版本">
          <!-- {{backdata[0].attr_name}} -->
          <el-input v-model="DynamicFormData.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserShow = false">取 消</el-button>
        <el-button type="primary" @click="editUserPuts">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //修改数据
      editUserData: [],
      panduan: true,
      inputVisible: false,
      inputValue: "",
      value: [],
      options: [],
      listId: "",
      //添加表单里额的值
      addForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        pics: []
      },
      // 商品介绍
      goods_introduce: "",
      activeName: "1",
      backdata: [],
      attr_vals: [],
      editUserShow: false,
      editUserShows: false,
      demo: "",
      DynamicFormData: {
        attr_id: "",
        attr_name: "",
        attr_sel: "many"
      }
    };
  },
  methods: {
    //删除用户
    delUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: `/categories/${this.listId}/attributes/${
              this.DynamicFormData.attr_id
            }`,
            method: "delete"
          }).then(back => {
            // console.log(back);
            var { data, meta } = back.data;
         
            this.hint(meta.msg);
        
            this.listdatas();
            // }
          });
        })
        .catch(() => {
          this.hint("取消删除", "err");
        });
    },
    //分装提示
    hint(msg, type = "suc") {
      if (type == "err") {
        this.$message.error(msg);
      } else {
        this.$message({ message: msg, type: "success" });
      }
    },
    //添加表单的值
    add() {
      this.editUserShows = true;
    },
    //展示修改表单存数据
    upduser(row) {
      // console.log(row)
      this.DynamicFormData.attr_id = row.attr_id;
      this.DynamicFormData.attr_name = row.attr_name;
      // console.log(123);
      // console.log(this.DynamicFormData);
      this.editUserData = row;
      this.editUserShow = true;
    },
    showInput() {
      this.inputVisible = true;
      // console.log(this.inputVisible);
      this.$nextTick(_ => {
        // console.log(this.$refs.tagsInput.$refs);
        this.$refs.tagsInput.$refs.input.focus();
      });
    },
    //增加数据
    editUserPut() {
      // alert(1234)
      this.$http({
        url: `/categories/${this.listId}/attributes?sel=many`,
        method: "post",

        data: this.DynamicFormData
      }).then(back => {
        // console.log(24234);
        // console.log(back);
        var { data, meta } = back.data;
        // if(meta.status == 200){
        this.editUserShows = false;
        //  this.backdata = data
        //  console.log(meta.msg)
        this.hint(meta.msg);
        // }
        // this.backdata = data;
        this.editUserShow = false;
        this.$http({
          url: `/categories/${this.listId}/attributes?sel=many`,
          method: "get"
        }).then(back => {
          // console.log(back);

          var { data, meta } = back.data;
          this.backdata = data;
        });
      });
    },
    // 更新数据
    editUserPuts() {
      this.$http({
        url: `/categories/${this.listId}/attributes/${
          this.DynamicFormData.attr_id
        }`,
        method: "put",

        data: this.DynamicFormData
      }).then(back => {
        // console.log(back);
        var { data, meta } = back.data;
        // this.backdata = data;
        this.hint(meta.msg);
        this.editUserShow = false;
   this.listdatas()
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisibles = false;
      this.inputValue = "";
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
          this.backdata = data;

          this.DynamicFormData.attr_id = data[0].attr_id;
          this.DynamicFormData.attr_name = data[0].attr_name;
          // console.log(this.DynamicFormData);
          // this.editUserData = data;
          this.attr_vals = data[0].attr_vals.split(",");
          // console.log(data[0].attr_vals);
        });
      }
      this.panduan = false;
      //   data[2];
      //   console.log(data[2]);
    },
    ///更新数据
    listdata() {
      this.$http({
        url: "/categories?type=3/attributes/",
        method: "get"
      }).then(back => {
        var { data, meta } = back.data;
        this.options = data;
        // console.log(this.options);
      });
    },
    ///更新权限
    listdatas() {
      this.$http({
        url: `/categories/${this.listId}/attributes?sel=many`,
        method: "get"
      }).then(back => {
        // console.log(back);
        var { data, meta } = back.data;
        this.backdata = data;
      });
    },

    handleClick(tab, event) {
      if (tab.name == 2) {
   
        this.$http({
          url: `/categories/${this.listId}/attributes?sel=only`,
          method: "get"
        }).then(back => {
          // console.log(back);
          var { data, meta } = back.data;
          this.backdata = data;
          this.attr_vals = data[0].attr_vals.split(",");
         
        });
        
      }
   
    }
  },
  mounted() {
    this.listdata();
  }
};
</script>

<style>
.el-main {
  text-align: center;
  line-height: 30px;
}
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
.demo-table-expand > .el-row {
  float: left;
  margin: 10px;
}
.demo-table-expand > .el-button {
  margin-top: 10px;
}
.el-main {
  text-align: left;
  line-height: 30px;
}
.element.style {
  width: 150px;
}
.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 20px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/* .el-input>.el-input__inner{
  margin-top:150px; 
    margin-left:50px; 
} */
</style>
