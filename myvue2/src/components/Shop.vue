<template>
  <div>
    <!-- 面包开始 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href>商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包结束 -->
    <!-- 搜索开始 添加用户开始 -->
    <el-row>
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="searchData"
            class="input-with-select"
            @change="searchuser"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchuser"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="9">
        <!-- <div class="grid-content bg-purple"> -->
      
               <el-button type="success" round @click="$router.push({path:'Add'})">添加用户</el-button>
            
     
        <!-- </div> -->
      </el-col>
    </el-row>
    <!-- 搜索结束 -->
    <div></div>
    <el-table :data="shopDataList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="380"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_number" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>

      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" icon="el-icon-edit" circle @click="updshop(scope.row)"></el-button> -->

          <el-button type="danger" icon="el-icon-delete" circle @click="delgoods(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页开始 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 分页结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //默认几页
      pagesize: 5,
      //默认在1页开始
      pagecurrent: 1,
      // currentPage: "",
      //总个数
      total: 0,
      // 绑定数据  双向绑定  点击事件触发 在url里面加上 query  知己安条件查询
      searchData: "",
      shopDataList: []
    };
  },
  methods: {
    //s搜索提交数据
    searchuser() {
      this.newdata();
    },
    //删除用户
    delgoods(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: `goods/${row.goods_id}`,
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
      //查询所有数
      this.$http({
        url: `goods?pagenum=${this.pagecurrent}&pagesize=${
          this.pagesize
        }&query=${this.searchData}`,

        method: "get"
      }).then(backdata => {
        console.log(backdata);
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          for (let i = 0; i < data.goods.length; i++) {
            let aa = data.goods[i].add_time;

            var timestamp4 = new Date(aa);
            var time =
              timestamp4.toLocaleDateString().replace(/\//g, "-") +
              " " +
              timestamp4.toTimeString().substr(0, 8);

            data.goods[i].add_time = time;
          }
          this.total = data.total;
          this.shopDataList = data.goods;
        }
      });
    }
  },
  //钩子函数默认直接刷新数据
  mounted() {
    this.newdata();
  }
};
</script>

<style>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: right;
  line-height: 30px;
}



</style>
