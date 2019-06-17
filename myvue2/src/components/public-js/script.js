    //刷线数据分装
    function newdata() {
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