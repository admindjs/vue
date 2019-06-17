
export default {
    data() {
        return {
            value: true,
            loading: true,
            userDataList: [],
            //默认几页
            pagesize: 5,
            //默认在1页开始
            pagecurrent: 1,
            // currentPage: "",
            //总个数
            total: 0,
            //增加表单默认是不现实的
            addUserShow: false,
            //修改表单默认值
            editUserShow: false,
            //获取搜索的值
            searchData: "",
            //修改权限的表单显示
            roleUserShow: false,

            //新增表单额的所有的值
            addUserData: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            editUserData: {
                username: "",
                email: "",
                mobile: ""
            },
            //所用角色
            userList: [],
            //当前角色的权限id
            roleIdSelected: "",
            oneuser: ""
        };
    },
    methods: {
        //修改
        roleUserPut() {
            this.$http({
                url: `users/${this.oneuser.id}/role`,
                method: "put",
                data: { rid: this.roleIdSelected }
            }).then(back => {
                console.log(back);
                var { data, meta } = back.data;
                if (meta.status == 200) {
                    this.hint(meta.msg);
                    this.roleUserShow = false;
                }
            });
        },
        //点击修改执行存一行的数据外加 改变修改表单的值显示表单
        upduser(row) {

            this.editUserShow = true;
            console.log(row);
            this.editUserData= row;
            // this.oneuser = row;
        },
        //获取所有额角色
        quanxianuser(row) {
            this.oneuser = row;
            console.log(row);
            this.$http({
                url: "roles",
                method: "get"
            }).then(back => {
                var { data, meta } = back.data;
                this.userList = data;
            });
            this.$http({
                url: "users/" + row.id,
                method: "get"
            }).then(back => {
                var { data, meta } = back.data;

                this.roleIdSelected = data.rid;
            });

            this.roleUserShow = true;
        },
        //表单里点击确定删除执行的删除操作
        editUserPut() {
            this.$http({
                url: `users/${this.editUserData.id}`,
                method: "put",
                data: this.editUserData
            }).then(back => {
                var { data, meta } = back.data;
                if (meta.status == 200) {
                    this.hint(meta.msg);
                    this.newdata();
                    this.editUserShow = false;
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
                        url: "users/" + row.id,
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
        //添加用户数据
        addUserPost() {
            this.$http({
                url: "users",
                method: "post",
                data: this.addUserData
                //箭头函数改变this指向   相当UIfunction(back){}
            }).then(back => {
                console.log(back);
                var { data, meta } = back.data;
                this.addUserShow = false;
                this.hint(meta.msg);
                this.newdata();
                for(let k in this.addUserData){
                    this.addUserData[k]='';
                }
                
            });
        },
        //分页每页显示多少个
        sizeChange(size) {
            this.pagesize = size;
            this.newdata();
        },
        //分页在第几页开始
        currentChange(change) {
            this.pagecurrent = change;
            this.newdata();
        },
        //状态获取当前行的数据
        userChangeStat(row) {
            this.$http({
                url: `users/${row.id}/state/${row.mg_state}`,
                method: "put"
            }).then(back => {
                var { data, meta } = back.data;
                if (meta.status == 200) {
                    this.hint(meta.msg);
                } else {
                    this.hint(meta.msg, "err");
                    row.mg_state = !row.mg_state;
                }
            });
        },


        //s搜索提交数据
        searchuser() {
            this.newdata();
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
            this.$http({
                url: `users?pagenum=${this.pagecurrent}&pagesize=${
                    this.pagesize
                    }&query=${this.searchData}`,

                method: "get"
            }).then(backdata => {
                var { data, meta } = backdata.data;
                console.log(backdata);
                if (meta.status == 200) {
                    this.total = data.total;
                    this.userDataList = data.users;
                }
            });
        }
    },
    mounted() {
        this.newdata();
    }
};
