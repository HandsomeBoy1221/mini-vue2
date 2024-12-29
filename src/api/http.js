import axios from 'axios'

var instance = axios.create({
    headers:{
        'Content-Type':'application/json',
    },
    // timeout:2500,
    baseURL:'http://localhost:8088/'
})

//请求拦截器
instance
    .interceptors
    .request
    .use(config => {
        //Authorization
        //如果本地登录成功，则获取token
        if(localStorage.getItem('token')){
            //token信息拼接到请求头 Authorization
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
            //命令行输出打印查看
            console.log('请求头：'+ config.headers.Authorization);
        }
        return config;
    }, error => {
        //返回给定原因而被拒绝的对象
        return Promise.reject(error);
    })

//响应拦截器
instance
    .interceptors
    .response
    .use(config => {
        if(40013 == config.data.code || 40014 == config.data.code){
            //没有登录成功，token清空
            localStorage.removeItem('token');
        }
        return config;
    }, error => {
        //返回给定原因而被拒绝的对象
        return Promise.reject(error);
    })

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default instance