export default {
    data() {
      return {
        ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      register() {
        this.$http
          .post("http://localhost:8888/api/private/v1/login",this.ruleForm )
          .then((backdata)=> {
            console.log(backdata);
            var data = backdata.data.data;
            var meta = backdata.data.meta;
            if(meta.status == 200){
                localStorage.setItem('token',data.token);
                this.$message({
                    message:meta.msg,
                  type:"success"
                })
                this.$router.push({path:'/'});
            }else{
                this.$message.error(meta.msg);
            }
          })
          
      }
    }
  };