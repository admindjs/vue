export default {
  data() {
    return {
      userDataList: [],
      //增加数据默认不显示
      addUserShow: false,
      //修改表单默认不显示
      editUserShow: false,
      //修改数据
      editUserData: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      //添加数据的信息
      addUserData: {
        roleName: '',
        roleDesc: ''
      },


    }
  },
  methods: {
    //权限删除row要的直角色id id是当前要删除的权限
    del(row,id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: `roles/${row.id}/rights/${id}`,
            method: 'delete'
          }).then(back => {
            var { data, meta } = back.data;
            if (meta.status == 200) {
              this.hint(meta.msg);
              this.newdata();
            }
          });
        })
        .catch(() => {
          this.hint("取消删除", "err");
        });
    },

 
    //增加用户
    addUserPost() {
      this.$http({
        url: 'roles',
        method: 'post',
        data: this.addUserData
      }).then(back => {
        var { data, meta } = back.data;
        if (meta.status == 200) {
          this.hint(meta.msg);
          this.newdata();
          this.addUserShow = false;
        }
      })
    },
    // 确定进行修改操作
    editUserPut() {
      this.$http({
        url: 'roles/' + this.editUserData.id,
        method: 'put',
        data: this.editUserData
      }).then(back => {
        var { data, meta } = back.data;
        if (meta.status == 200) {
          this.hint(meta.msg);
          this.newdata();
          this.editUserShow = false;
        }

      })
    },
    //展示修改表单存数据
    upduser(row) {
      // console.log(row)
      this.editUserData = row;
      this.editUserShow = true;
    },
    //分装提示
    hint(msg, type = "suc") {
      if (type == "err") {
        this.$message.error(msg);
      } else {
        this.$message({ message: msg, type: "success" });
      }
    },
    //刷线数据分装
    newdata() {
      //查询所有数据
      this.$http({
        url: `roles`,

        method: "get",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(backdata => {
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          console.log(backdata);
          this.total = data.total;
          this.userDataList = data;

        }
      });
    },
    //删除用户
    delUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: "roles/" + row.id,
            method: "delete"
          }).then(back => {
            var { data, meta } = back.data;
            if (meta.status == 200) {
              this.hint(meta.msg);
              this.newdata();
            }
          });
        })
        .catch(() => {
          this.hint("取消删除", "err");
        });
    },
  },
  //钩子函数默认直接刷新数据
  mounted() {
    this.newdata();

  }
};