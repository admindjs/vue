<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="3">
      <div class="grid-content bg-purple-light">
        <el-button type="success" @click="addroleshow = true" class="tianjiajuese">添加角色</el-button>
      </div>
    </el-col>

    <el-table :data="topdatalist" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="v1 in scope.row.children" :key="v1.id">
            <el-col :span="6">
              <el-tag closable @close="delrole(scope.row,v1)">{{v1.authName}}</el-tag>>
            </el-col>
            <el-col :span="18">
              <el-row v-for="v2 in v1.children" :key="v2.id">
                <el-col :span="6">
                  <el-tag type="success" closable @close="delrole(scope.row,v2)">{{v2.authName}}</el-tag>>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    v-for="v3 in v2.children"
                    :key="v3.id"
                    closabletype="warning"
                    closable
                    @close="delrole(scope.row,v3)"
                  >{{v3.authName}}</el-tag>
                  <!-- {{scope.row}} -->
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editroleShow(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteuser(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="showeditright(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加角色" :visible.sync="addroleshow">
      <el-form :model="addroledata">
        <el-form-item label="角色名称">
          <el-input v-model="addroledata.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addroledata.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addroleshow = false">取 消</el-button>
        <el-button type="primary" @click="addrolepost">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="updateroleshow">
      <el-form :model="updateroledata">
        <el-form-item label="角色名称">
          <el-input v-model="updateroledata.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="updateroledata.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateroleshow = false">取 消</el-button>
        <el-button type="primary" @click="updaterolepost">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配权限" :visible.sync="editroleshow">
      <el-tree
        :data="rightlistdata"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkeds"
        default-expand-all
        :props="defaultProps"
        ref='trees'
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editroleshow = false">取 消</el-button>
        <el-button type="primary" @click="editrightpost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topdatalist: [],
      addroleshow: false,
      addroledata: {
        roleName: "",
        roleDesc: ""
      },
      updateroleshow: false,
      updateroledata: {
        roleName: "",
        roleDesc: ""
      },
      editroleshow: false,
      rightlistdata: [],
      defaultProps: {
        label: "authName"
        // children:''
      },
      checkeds:[],
      role_id:''
    };
  },
  methods: {
    


    editrightpost(){
      console.log(this.role_id)
      var arr1=this.$refs.trees.getCheckedKeys();
      var arr2=this.$refs.trees.getHalfCheckedKeys();
      var arr3=arr1.concat(arr2)
      var rightstr=arr3.join();

      this.$http({
        url:`roles/${this.role_id}/rights`,
        method:'post',
        data:{
          rids:rightstr
        }
      }).then(backdata=>{
        var { data, meta } = backdata.data;
        if(meta.status==200){
          this.editroleshow=false;
           this.$message({ message: meta.msg, type: "success" });
            this.getrolelist();
        }
      })
    },
    showeditright(row) {
      console.log(row)
      this.role_id=row.id
      this.$http({
        url: "rights/tree"
      }).then(backdata => {
        // console.log(backdata)
        var { data, meta } = backdata.data;
        this.rightlistdata = data;
        if(meta.status==200){
          // this.editroleshow=false;
          //  this.$message({ message: meta.msg, type: "success" });
            this.getrolelist();
        }
      });
    // console.log(row)
    this.checkeds = [];
    var r= row.children;
    r.forEach(item1=> {
      item1.children.forEach(item2=>{
          item2.children.forEach(item3=>{
            this.checkeds.push(item3.id)
            // console.log(item3.id)
          })
      })
    });


      this.editroleshow = true;
    },
    delrole(row, rights) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(backdata => {
        console.log(row.id);
        console.log(rights.id);

        this.$http({
          url: `roles/${row.id}/rights/${rights.id}`,
          method: "delete"
        }).then(backdata => {
          var { data, meta } = backdata.data;
          if (meta.status == 200) {
            this.$message({ message: meta.msg, type: "success" });
            this.getrolelist();
          } else {
            this.$message.error(msg);
          }
        });
      });
    },
    //删除
    deleteuser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `roles/${row.id}`,
          method: "delete"
        }).then(backdata => {
          console.log(backdata);
          var { data, meta } = backdata.data;
          if (meta.status == 200) {
            this.$message({ message: meta.msg, type: "success" });
            this.getrolelist();
          } else {
            this.$message.error(msg);
          }
        });
      });
    },
    //修改
    updaterolepost() {
      this.$http({
        url: `/roles/${this.updateroledata.id}`,
        method: "put",
        data: {
          roleName: this.updateroledata.roleName,
          roleDesc: this.updateroledata.roleDesc
        }
      }).then(backdata => {
        // console.log(backdata)
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.updateroleshow = false;
          this.$message({ message: meta.msg, type: "success" });
          this.getrolelist();
        } else {
          this.$message.error(msg);
        }
      });
    },
    //修改展示 赋值
    editroleShow(row) {
      // // {{scope.row}}
      // console.log(row)

      this.updateroleshow = true;
      this.updateroledata = row;
      // this.roleid = row.id;
    },
    //获取数据
    getrolelist() {
      this.$http({
        url: "roles",
        method: "get"
      }).then(backdata => {
        // console.log(backdata);
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          this.topdatalist = data;
          // console.log(data);
          // this.total = data.todal;
        }
      });
    },
    //添加
    addrolepost() {
      this.$http({
        url: "/roles",
        method: "post",
        data: this.addroledata
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      }).then(back => {
        // console.log(back);
        var { data, meta } = back.data;
        if (meta.status == 201) {
          this.addroleshow = false;
          this.$message({ message: meta.msg, type: "success" });
          this.getrolelist();
        } else {
          this.$message.error(msg);
        }
      });
    }
  },

  mounted() {
    this.getrolelist();
  }
};
</script>

<style>
.el-breadcrumb {
  padding: 0px 0px 10px 0px;
}
.has-gutter {
  line-height: 30px;
}
/* .el-col,.el-col-3{
  line-height: 30px;
} */
.bg-purple-light {
  line-height: 40px;
}
.el-row {
  line-height: 50px;
}
.el-col,
.el-col-6 {
  padding-right: 10px;
}
/* .el-col,
.el-col-18 {
  margin-left: -45px;
} */
.el-tag,
.el-tag--warning,
.el-tag--light {
  margin-left: 20px;
}
.tianjiajuese {
  margin-left: 45px;
}
</style>
