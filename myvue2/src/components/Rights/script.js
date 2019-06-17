export default {
  data() {
    return {
      //所有数据
      userDataList: [],
    };
  },
  mounted() {
    this.$http({
      url: `rights/list`,
      method: "get",
    }).then(backdata => {
      console.log(backdata);
      var { data, meta } = backdata.data;
      if (meta.status == 200) {
        this.total = data.total;
        this.userDataList = data;
      }
    });
  }
};