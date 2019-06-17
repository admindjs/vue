export default {
  data(){
    return {
      menusListData:[],
    }
  },
  mounted() {
    this.getM();
    if (!localStorage.getItem("token")) {
      this.$message.error("请登录后访问");
      this.$router.push({
        path: "/login"
      });
    }
    console.log("同学，祝贺你喜提彩蛋");
    console.log("或许你们还在犹豫是否加入，我会坦诚的告诉你我们超酷；");
    console.log("在这里大家都用无人车代步，AI音箱不仅播放还可以交互；");
    console.log("人工智能是发展的核心技术，做自己让未来不只领先几步");
    console.log("在这里做自己，欢迎来到百度");

  },
  methods: {
    // 获取左侧菜单栏
    getM() {
      this.$http({
        url: "menus"
      }).then(back => {
        // console.log(back);
        var { data, meta } = back.data;
        this.menusListData = data;
      });
    },
    logout() {
      this.$confirm("确定退出么?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          this.hint("取消删除", "err");
        });
    }
  }
};