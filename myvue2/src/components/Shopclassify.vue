<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="2">
      <div class="grid-content bg-purple-light addclassify">
        <el-button type="success" @click="addshopclass">添加分类</el-button>
      </div>
    </el-col>
    <el-col :span="11">
      <div class="grid-content bg-purple-light"></div>
    </el-col>

    <el-table
      :data="tableDatashop"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否有效">有效</el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editclass(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="delclass(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加分类" :visible.sync="addshopclassify">
      <el-form :model="addshopdata">
        <el-form-item label="用户名">
          <el-input v-model="addshopdata.catname" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">分类名称：</span>
          <el-cascader
            placeholder="默认添加一级分类"
            v-model="addshopdata.valueid"
            :options="options"
            clearable
            expand-trigger="hover"
            :props="{ label: 'cat_name', value: 'cat_id', }"
          ></el-cascader>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addshopclassify = false">取 消</el-button>
        <el-button type="primary" @click="addshop">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑分类" :visible.sync="editshopclassify">
      <el-form :model="editshopdata">
        <el-form-item label="分类名称">
          <el-input v-model="editshopdata.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editshopclassify = false">取 消</el-button>
        <el-button type="primary" @click="editclassShow">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="sizechange"
      @current-change="currentchange"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      pagesize: 5,
      pagenum: 1,

      tableDatashop: [],
      addshopclassify: false,
      editshopclassify: false,
      options: [],
      addshopdata: {
        catname: "",
        valueid: [],
        cat_level: 0,
        cat_pid: 0
      },
      editshopdata: {
        cat_name: ""
      }
    };
  },

  methods: {
    sizechange(size) {
      this.pagesize = size;
      this.shopclassifylist();
    },
    currentchange(current) {
      this.pagenum = current;
      this.shopclassifylist();
    },
    delclass(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `categories/${row.cat_id}`,
          method: "delete"
        }).then(backdata => {
          //   console.log(backdata)
          var { data, meta } = backdata.data;
          if (meta.status == 200) {
            this.$message({ message: meta.msg, type: "success" });
            this.shopclassifylist();
          } else {
            this.$message.error(msg);
          }
        });
      });
    },

    editclass(row) {
      this.editshopclassify = true;
      this.editshopdata = row;
    },

    editclassShow() {
      //   console.log(row)
      this.$http({
        url: `categories/${this.editshopdata.cat_id}`,
        method: "put",
        data: {
          cat_name: `${this.editshopdata.cat_name}`
        }
      }).then(backdata => {
        // console.log(backdata);
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.editshopclassify = false;
          this.$message({ message: meta.msg, type: "success" });
          this.shopclassifylist();
        }
      });
    },
    addshop() {
      //  console.log(this.addshopdata.valueid.length)
      length = this.addshopdata.valueid.length;
      this.addshopdata.valueid.cat_level = length;
      if (length == 0) {
        this.addshopdata.cat_pid = 0;
      } else {
        this.addshopdata.cat_pid = this.addshopdata[
          this.addshopdata.valueid.length - 1
        ];
      }
      console.log(this.addshopdata.cat_pid);
      console.log(this.addshopdata.cat_level);
      console.log(this.addshopdata.catname);
      this.$http({
        url: "/categories",
        method: "post",
        data: {
          cat_pid: this.addshopdata.cat_pid,
          cat_level: this.addshopdata.cat_level,
          cat_name: this.addshopdata.catname
        }
      }).then(backdata => {
        // console.log(backdata);
        var { data, meta } = backdata.data;
        if (meta.status == 201) {
          this.addshopclassify = false;
          this.$message({ message: meta.msg, type: "success" });
          this.shopclassifylist();
        } else {
          this.$message.error(msg);
        }
      });
    },
    addshopclass() {
      this.addshopclassify = true;
      this.$http({
        url: "/categories?type=2",
        method: "get"
      }).then(backdata => {
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          // console.log(data);
          this.options = data;  
        } else {
          this.$message.error(msg);
        }
      });
    },

    shopclassifylist() {
      this.$http({
        url: "/categories",
        params: {
          type: 3,
          pagesize: this.pagesize,
          pagenum: this.pagenum
        },
        method: "get"
      }).then(backdata => {
        console.log(backdata);
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.tableDatashop = data.result;
          this.total = data.total;
        } else {
          this.$message.error(msg);
        }
      });
    }
  },
  mounted() {
    this.shopclassifylist();
  }
};
</script>

<style>
.addclassify {
  line-height: 30px;
}
.el-breadcrumb {
  padding: 0px 0px 10px 0px;
}
.has-gutter {
  line-height: 30px;
}
</style>
