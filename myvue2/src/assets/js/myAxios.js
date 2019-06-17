import axios from 'axios';
var chajian = {}
chajian.install = function(Vue){
//设置一个默认的请求的地址
    var axios_obj = axios.create({
        baseURL: 'http://localhost:8888/api/private/v1/',
    })

    // 使用axios拦截器 验证非 login 请求时添加请求头
    axios_obj.interceptors.request.use(function(config){
        // console.log(config);
        if(config.url != 'login'){
            config.headers.Authorization = localStorage.getItem("token") ;
        }
        return config;
    })
    
    Vue.prototype.$http = axios_obj;
}
export default chajian