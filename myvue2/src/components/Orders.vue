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
   
    </el-row>
    <!-- 搜索结束 -->
    <div></div>
    <el-table :data="shopDataList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="380"></el-table-column>
      <el-table-column prop="order_price" label="订单价格(元)" width="120"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay === '0'" type="danger">未付款</el-tag>
          <el-tag v-else type="success">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间"></el-table-column>

      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="upduser(scope.row)"></el-button>
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
    <!-- 修改数据开始 -->
    <el-dialog title="添加用户" :visible.sync="roleUserShow">
      <el-form :model="addForm">
        <el-form-item label="省市区/县">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            
           
            style="width: 500px">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserShow = false">取 消</el-button>
        <el-button type="primary" @click="aa()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改结束 -->
  </div>
</template>

<script>
import cityData from './city_data2017_element';
export default {
  data() {
    return {
      addForm:{
        mobile:'',
      },
      value: [],
      options: cityData,
      //地址数据id
        selectedOptions: [],
      addForm: {
        username: "",
        email: "",
        goods_cat: ""
      },
      //修改权限的表单显示
      roleUserShow: false,
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
    aa(){
      // alert(23)
      this.roleUserShow=false;
       this.hint('修改成功');
    },
    //修改
    roleUserPut() {
      this.$http({
        url: `orders/${this.oneuser.id}/role`,
        method: "put",
        data: { rid: this.roleIdSelected }
      }).then(back => {
        var { data, meta } = back.data;
        if (meta.status == 200) {
          this.hint(meta.msg);
          this.roleUserShow = false;
        }
      });
    },
    //点击修改执行存一行的数据外加 改变修改表单的值显示表单
    upduser(row) {
      this.roleUserShow = true;
      console.log(row);
      this.$http({
        url:'categories?type=3',
        method:'get',
      }).then(back=>{
        console.log(back);
      })
      // this.oneuser = row;
    },
    //s搜索提交数据
    searchuser() {
      this.newdata();
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
        url: `orders?pagenum=${this.pagecurrent}&pagesize=${
          this.pagesize
        }&query=${this.searchData}`,

        method: "get"
      }).then(backdata => {
        console.log(123);
        console.log(backdata);
        var { data, meta } = backdata.data;
        if (meta.status == 200) {
          for (let i = 0; i < data.goods.length; i++) {
            let aa = data.goods[i].create_time;

            var timestamp4 = new Date(aa);
            var time =
              timestamp4.toLocaleDateString().replace(/\//g, "-") +
              " " +
              timestamp4.toTimeString().substr(0, 8);

            data.goods[i].create_time = time;
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
